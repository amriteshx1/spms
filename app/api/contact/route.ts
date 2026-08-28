import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_PATTERN = /^[+]?\d[\d\s-]{8,16}\d$/;

function readString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid enquiry." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Please submit a valid enquiry." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const name = readString(payload.name, 80);
  const email = readString(payload.email, 120);
  const mobile = readString(payload.mobile, 20);
  const description = readString(payload.description, 1000);

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!MOBILE_PATTERN.test(mobile)) {
    return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }
  if (description.length < 8) {
    return NextResponse.json(
      { error: "Please briefly describe your moving requirement." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "amriteshsunny456@gmail.com";
  const defaultFrom = `onboarding@${"resend"}.dev`;
  const from = process.env.RESEND_FROM_EMAIL ?? defaultFrom;

  if (!apiKey) {
    return NextResponse.json(
      { error: "The enquiry service is not configured. Please call or WhatsApp us." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `SPMS enquiry from ${name}`,
      text: [
        "New enquiry from the SPMS website.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Mobile: ${mobile}`,
        "",
        "Requirement:",
        description,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend send failed:", error.message);
      return NextResponse.json(
        { error: "We could not send your enquiry. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We could not send your enquiry. Please try again." },
      { status: 502 },
    );
  }
}
