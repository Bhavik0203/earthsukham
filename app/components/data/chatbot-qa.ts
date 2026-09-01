export interface QAPair {
  question: string;
  answer: string;
  keywords?: string[];
}

export const qaPairs: QAPair[] = [
  // General Information
  {
    question: "What is Earth Sukham?",
    answer:
      "Earth Sukham is your trusted real estate partner, offering services for buying, selling, and renting properties. We connect you with top experts and provide tools like home loan assistance.",
    keywords: ["what is earth sukham", "about us", "company info"],
  },
  {
    question: "Where is Earth Sukham located?",
    answer:
      "We primarily operate in Pune and surrounding areas, including Baner, Wakad, Hinjewadi, and more.",
    keywords: ["location", "where are you", "office", "pune"],
  },
  {
    question: "How can I contact Earth Sukham?",
    answer:
      "You can contact us via the 'Enquiry Now' button, call our experts directly, or visit our office. Our contact details are available on the website footer.",
    keywords: ["contact", "phone", "email", "reach us"],
  },

  // Buying & Selling
  {
    question: "How can I buy a property?",
    answer:
      "You can browse our 'Featured Properties' or 'Luxe Properties' sections. Once you find a property you like, click 'Enquire' or contact our experts directly.",
    keywords: ["buy property", "purchase", "buying process"],
  },
  {
    question: "Can I list my property for sale?",
    answer:
      "Yes! You can list your property with us. Please contact our support team or use the 'List Your Property' section if available.",
    keywords: ["sell property", "list property", "selling"],
  },
  {
    question: "Do you have luxury properties?",
    answer:
      "Absolutely. Check out our 'Luxe Properties' section for premium and high-end real estate options.",
    keywords: ["luxury", "premium", "high end", "luxe"],
  },
  {
    question: "What types of properties do you deal in?",
    answer:
      "We deal in residential apartments, villas, commercial spaces, and plots.",
    keywords: ["property types", "apartments", "villas", "commercial"],
  },

  // Services
  {
    question: "Do you offer home loans?",
    answer:
      "Yes, we partner with leading banks to offer competitive home loan rates. You can check our 'Home Loan Provider' section for more details.",
    keywords: ["home loan", "mortgage", "finance", "loan"],
  },
  {
    question: "Can I get expert advice?",
    answer:
      "Yes, our 'Earth Sukham Experts' are available to guide you. You can find their profiles and contact numbers in the 'Experts' section.",
    keywords: ["expert", "advice", "consultant", "guidance"],
  },
  {
    question: "What is the EMI Calculator?",
    answer:
      "Our EMI Calculator helps you estimate your monthly loan payments. You can enter the loan amount, interest rate, and tenure to get an instant calculation.",
    keywords: ["emi calculator", "loan calculator", "monthly payment"],
  },

  // Locations
  {
    question: "Do you have properties in Hinjewadi?",
    answer:
      "Yes, Hinjewadi is one of our key markets. We have multiple residential and commercial listings there.",
    keywords: ["hinjewadi", "it park", "properties in hinjewadi"],
  },
  {
    question: "Are there properties near Baner?",
    answer:
      "Baner is a prime location with many of our featured properties. Explore our listings to find one that suits you.",
    keywords: ["baner", "properties in baner"],
  },

  // Support
  {
    question: "How do I schedule a site visit?",
    answer:
      "To schedule a visit, simply contact the expert listed for the property or use the enquiry form on the property page.",
    keywords: ["site visit", "tour", "view property"],
  },
  {
    question: "Is my personal data safe?",
    answer:
      "Yes, we value your privacy. Your data is secure and used only to assist you with your property needs.",
    keywords: ["privacy", "data safety", "security"],
  }
];