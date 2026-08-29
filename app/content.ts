export const company = {
  name: "Sailanee Packers And Movers",
  shortName: "Sailanee",
  wordmark: "SAILANEE",
  descriptor: "PACKERS AND MOVERS",
  lineOfWork: "Professional packing • moving • transportation",
  tagline: "Always for your moving needs.",
  closingLine: "Always for your moving needs.",
  footerMotto: "Safe · Secure · Reliable",
  locationLine: "Ranchi, Jharkhand | Serving customers across India",
} as const;

export const stats = [
  { value: "30+", label: "years of experience" },
  { value: "Pan-India", label: "service" },
  { value: "5000+", label: "customers served" },
] as const;

export const overview = {
  paragraphs: [
    "Sailanee Packers And Movers is a professional packing, moving and transportation company based in Ranchi, Jharkhand. With more than 30 years of experience, the company focuses on safe handling, dependable transportation and customer-focused service. Our operations cover household shifting, office relocation, industrial goods transportation and vehicle transportation across India.",
    "We combine trained manpower, systematic packing and loading practices, suitable transportation solutions and door-to-door coordination to make every move smoother and more secure.",
  ],
  mission:
    "To provide safe, transparent, timely and dependable relocation and transportation services while treating every customer's goods with the care we would give our own.",
  vision:
    "To build a trusted Pan-India logistics and relocation brand known for reliability, professional service and long-term customer relationships.",
} as const;

export const services = [
  {
    code: "HS",
    name: "Household Shifting",
    description:
      "Complete packing, loading, transportation, unloading and delivery support for residential moves.",
  },
  {
    code: "OR",
    name: "Office Relocation",
    description:
      "Planned movement of office furniture, equipment, files and other assets with organized handling.",
  },
  {
    code: "IG",
    name: "Industrial Goods Transportation",
    description:
      "Transportation solutions for machinery, equipment, materials and other industrial consignments.",
  },
  {
    code: "VT",
    name: "Car & Bike Transportation",
    description:
      "Safe transportation of cars, motorcycles and other automobiles with suitable vehicle arrangements.",
  },
  {
    code: "PU",
    name: "Packing & Unpacking",
    description:
      "Professional packing using appropriate materials and protective methods for different categories of goods.",
  },
  {
    code: "LU",
    name: "Loading & Unloading",
    description:
      "Careful lifting, loading, unloading and placement of goods at origin and destination.",
  },
  {
    code: "DD",
    name: "Door-to-Door Delivery",
    description:
      "End-to-end movement coordination from pickup location to final delivery address.",
  },
  {
    code: "PI",
    name: "Pan-India Transportation",
    description:
      "Long-distance transportation solutions connecting Ranchi and other locations across India.",
  },
] as const;

export const reasons = [
  {
    title: "30+ years of experience",
    detail: "Established experience in packing, moving and transportation.",
  },
  {
    title: "Customer-first approach",
    detail: "We focus on communication, care and dependable service.",
  },
  {
    title: "Trained handling team",
    detail: "Systematic packing, loading and unloading practices.",
  },
  {
    title: "Multiple transport solutions",
    detail: "Options for household, commercial, industrial and automobile consignments.",
  },
  {
    title: "Pan-India reach",
    detail: "Transportation support for moves across major destinations in India.",
  },
  {
    title: "Door-to-door coordination",
    detail: "One point of coordination from pickup through delivery.",
  },
  {
    title: "Transparent service",
    detail: "Clear communication on scope, movement and delivery requirements.",
  },
] as const;

export const process = [
  {
    step: "01",
    name: "Requirement Discussion",
    detail:
      "Understand the customer's goods, pickup, destination and service requirements.",
  },
  {
    step: "02",
    name: "Survey & Estimation",
    detail:
      "Assess quantity, handling needs and transportation requirements to prepare an estimate.",
  },
  {
    step: "03",
    name: "Packing",
    detail: "Pack goods using appropriate materials and protective methods.",
  },
  {
    step: "04",
    name: "Loading",
    detail: "Organize and load consignments carefully for transportation.",
  },
  {
    step: "05",
    name: "Transportation",
    detail: "Move the consignment through the planned transportation route.",
  },
  {
    step: "06",
    name: "Unloading & Delivery",
    detail: "Unload and deliver goods at the destination with care.",
  },
] as const;

export const commitment =
  "Every move is different. Our commitment is to understand the requirement, plan the movement carefully and handle goods responsibly. We aim to deliver a professional experience built on trust, safety, communication and timely coordination.";

export const contact = {
  company: "Sailanee Packers And Movers",
  serviceArea: "Pan-India",
  form: {
    label: "Request a move",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfh85hDumVHJEL-qLtBc-p7KmUnR-PgYnd5pbHsY6jhOmqD_A/viewform",
  },
  whatsapp: {
    label: "WhatsApp",
    display: "9431437673",
    href: "https://wa.me/919431437673",
  },
  phone: {
    label: "Phone",
    display: "9155841841",
    href: "tel:+919155841841",
  },
  call: {
    href: "tel:+919431437673",
  },
  emails: [
    {
      label: "Email",
      display: "sailaneepackersmovers@gmail.com",
      href: "mailto:sailaneepackersmovers@gmail.com",
    },
    {
      label: "Email",
      display: "sailaneepms@gmail.com",
      href: "mailto:sailaneepms@gmail.com",
    },
  ],
} as const;

export const nav = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
] as const;
