export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string;
  tag: string;
  date: string;
  readTime: string;
}

export const dummyJobs: BlogPost[] = [
  {
    id: "job-1",
    title: "Real Estate Sales Associate",
    slug: "real-estate-sales-associate",
    image: "/images/achievement_real_estate.png",
    excerpt: "Join our dynamic sales team in Pune. We are looking for an ambitious agent who will guide clients through purchasing properties and closing transactions.",
    tag: "Sales & Marketing",
    date: "Jun 20, 2026",
    readTime: "Full-time",
    content: `
      <h2>Job Description</h2>
      <p>We are seeking a high-performing Real Estate Sales Associate to join our team. You will be responsible for handling lead generation, presenting properties to prospective buyers, and closing sales deals. This is a commission-driven role with a highly competitive base salary.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Assist clients in purchasing, selling, and renting properties.</li>
        <li>Conduct comparative market analyses to estimate property values.</li>
        <li>Organize and host open houses and site visits.</li>
        <li>Maintain a comprehensive database of listings and customer records.</li>
        <li>Negotiate sales transactions and manage contracts.</li>
      </ul>
      <h3>Requirements:</h3>
      <ul>
        <li>1-3 years of sales experience (real estate preferred).</li>
        <li>Excellent communication and interpersonal skills.</li>
        <li>Familiarity with Pune real estate market.</li>
        <li>Professional demeanor and strong closing skills.</li>
      </ul>
    `
  },
  {
    id: "job-2",
    title: "Senior Property Manager",
    slug: "senior-property-manager",
    image: "/images/achievement_commercial.png",
    excerpt: "Manage high-end residential and commercial properties in Delhi NCR. Ensure compliance, tenant satisfaction, and efficient maintenance operations.",
    tag: "Operations",
    date: "Jun 18, 2026",
    readTime: "Full-time",
    content: `
      <h2>Job Description</h2>
      <p>As a Senior Property Manager, you will oversee a premium portfolio of residential and commercial assets. Your duties will include tenant relations, budget administration, maintenance supervision, and contract compliance.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Serve as the primary liaison between landlords, tenants, and service providers.</li>
        <li>Supervise property maintenance, repairs, and upgrade projects.</li>
        <li>Ensure timely collection of rents, fees, and service charges.</li>
        <li>Review, renew, and enforce lease agreements.</li>
        <li>Prepare monthly operating budgets and financial performance reports.</li>
      </ul>
      <h3>Requirements:</h3>
      <ul>
        <li>5+ years of experience in property management.</li>
        <li>Strong understanding of real estate regulations and lease laws.</li>
        <li>Excellent organizational and crisis-management abilities.</li>
        <li>Degree in Business Administration or Real Estate Management.</li>
      </ul>
    `
  },
  {
    id: "job-3",
    title: "Digital Marketing Specialist",
    slug: "digital-marketing-specialist",
    image: "/images/partner (2).png",
    excerpt: "Drive lead generation and brand awareness. Design, execute, and monitor digital campaigns targeting potential buyers of luxury residences.",
    tag: "Sales & Marketing",
    date: "Jun 22, 2026",
    readTime: "Hybrid",
    content: `
      <h2>Job Description</h2>
      <p>We are seeking a talented Digital Marketing Specialist to design and execute high-converting digital marketing campaigns across social media, search engine marketing, and email marketing.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Manage and optimize paid ad campaigns (Google Ads, Meta Ads) for property lead generation.</li>
        <li>Create engaging content, copywriting, and visual assets highlighting new launches.</li>
        <li>Coordinate SEO strategy to rank listings and project landing pages.</li>
        <li>Analyze campaign analytics and adjust strategies to improve ROI.</li>
      </ul>
      <h3>Requirements:</h3>
      <ul>
        <li>2-4 years of experience in digital marketing (real estate experience is highly valued).</li>
        <li>Proficiency with Google Analytics, Ads Manager, and SEO tools.</li>
        <li>Strong creative writing and visual editing skills.</li>
      </ul>
    `
  },
  {
    id: "job-4",
    title: "Lead Architect & Design Consultant",
    slug: "lead-architect-design-consultant",
    image: "/images/location-bg.png",
    excerpt: "Lead the concept and interior design phase for our upcoming premium apartment projects. Design spaces that fuse luxury with comfort.",
    tag: "Architecture & Design",
    date: "Jun 15, 2026",
    readTime: "Full-time",
    content: `
      <h2>Job Description</h2>
      <p>We are looking for a visionary Lead Architect to guide the design directions of our new luxury townships and premium residential complexes.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Create conceptual layouts, floor plans, and 3D architectural renderings.</li>
        <li>Select premium materials, fixtures, and interior finishes.</li>
        <li>Collaborate with structural engineering and construction teams.</li>
        <li>Ensure design blueprints comply with local municipal zoning laws and safety codes.</li>
      </ul>
      <h3>Requirements:</h3>
      <ul>
        <li>Bachelor’s or Master’s degree in Architecture.</li>
        <li>5+ years of architecture/interior design experience, preferably in high-end residential.</li>
        <li>Expert proficiency in AutoCAD, Revit, SketchUp, and V-Ray.</li>
      </ul>
    `
  },
  {
    id: "job-5",
    title: "Site Engineer (Civil Construction)",
    slug: "site-engineer-civil",
    image: "/images/partner (1).png",
    excerpt: "Supervise daily construction activities, inspect work quality, ensure site safety protocols, and coordinate project deadlines in Pune.",
    tag: "Construction & Engineering",
    date: "Jun 21, 2026",
    readTime: "Full-time",
    content: `
      <h2>Job Description</h2>
      <p>We are looking for a diligent Civil Site Engineer to manage day-to-day operations and material quality controls at our active construction locations.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Supervise structural works, reinforcement layout, and concrete pouring.</li>
        <li>Interpret engineering drawings and execute layouts accurately on-site.</li>
        <li>Manage materials procurement, inventory tracking, and quality inspections.</li>
        <li>Monitor safety guidelines compliance among all site personnel.</li>
      </ul>
      <h3>Requirements:</h3>
      <ul>
        <li>B.E. / B.Tech in Civil Engineering.</li>
        <li>3-5 years of site experience in multi-story residential building construction.</li>
        <li>Good understanding of concrete technology, concrete test methods, and construction schedules.</li>
      </ul>
    `
  },
  {
    id: "job-6",
    title: "Leasing & Customer Relations Officer",
    slug: "leasing-customer-relations",
    image: "/images/achievement_education.png",
    excerpt: "Assist prospective tenants with property viewing tours, coordinate lease paperwork, and lead customer retention programs.",
    tag: "Operations",
    date: "Jun 19, 2026",
    readTime: "Full-time",
    content: `
      <h2>Job Description</h2>
      <p>We are looking for a customer-oriented Leasing and Customer Relations Officer to deliver an outstanding onboarding and leasing experience to our residents.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Guide prospective clients through model apartments and highlight community features.</li>
        <li>Process lease applications, run credit checks, and prepare lease contracts.</li>
        <li>Manage tenant move-in and move-out inspections and documentation.</li>
        <li>Address tenant queries, maintenance requests, and coordinate customer feedback surveys.</li>
      </ul>
      <h3>Requirements:</h3>
      <ul>
        <li>1-2 years of experience in leasing, hotel front-office, or customer relations.</li>
        <li>Excellent verbal communication and documentation skills.</li>
        <li>Strong service mindset and problem-solving capability.</li>
      </ul>
    `
  },
  {
    id: "job-7",
    title: "Finance & Real Estate Analyst",
    slug: "finance-real-estate-analyst",
    image: "/images/achievement_real_estate.png",
    excerpt: "Evaluate potential land acquisitions and development projects. Formulate cash flow projections and ROI assessments.",
    tag: "Finance",
    date: "Jun 14, 2026",
    readTime: "Full-time",
    content: `
      <h2>Job Description</h2>
      <p>We are seeking a Finance & Real Estate Analyst to perform feasibility analyses and support decision-making for land purchases and capital deployments.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Construct financial models to forecast IRR, NPV, and cash flow for proposed projects.</li>
        <li>Analyze real estate market trends, demographics, and competitive projects.</li>
        <li>Compile investment memo slides and presentations for the leadership board.</li>
        <li>Assist in structuring project financing with banking institutions.</li>
      </ul>
      <h3>Requirements:</h3>
      <ul>
        <li>2+ years of experience in real estate investment banking, private equity, or financial modeling.</li>
        <li>Exceptional Excel modeling and presentation development skills.</li>
        <li>Chartered Accountant (CA) or MBA in Finance.</li>
      </ul>
    `
  }
];
