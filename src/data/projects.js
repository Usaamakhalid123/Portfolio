// All live client projects. Edit freely — the Work section renders straight from this list.
export const projects = [
  {
    title: 'Khi Tam Health Hub',
    category: 'Healthcare',
    description:
      'Holistic health & wellness clinic in London offering five-body therapeutic healing.',
    url: 'https://khitamhealthhub.com/',
    year: '2025',
    location: 'London, UK',
  },
  {
    title: 'Pattern Labs',
    category: 'Software',
    description:
      'Full-stack software studio building production apps for startups across MENA & North America.',
    url: 'https://thepatternlabs.com/',
    year: '2025',
    location: 'Global',
  },
  {
    title: 'Base Health',
    category: 'Healthcare',
    description:
      'Colon hydrotherapy & wellness clinic in Winchester with online booking and patient resources.',
    url: 'https://basehealth.co.uk/',
    year: '2024',
    location: 'Winchester, UK',
  },
  {
    title: 'Shazoni Digital',
    category: 'Marketing',
    description:
      'Paid-media marketing agency site engineered to convert local service businesses into leads.',
    url: 'https://www.shazonidigital.co.uk/',
    year: '2024',
    location: 'Surrey, UK',
  },
  {
    title: 'Sama X',
    category: 'Tech',
    description:
      'Authorized Starlink reseller delivering enterprise satellite connectivity & managed SD-WAN.',
    url: 'https://www.samax.com/',
    year: '2025',
    location: 'Middle East',
  },
  {
    title: 'Creekside Vet Clinic',
    category: 'Veterinary',
    description:
      '24/7 critical-care veterinary hospital in Dubai with appointment booking and services.',
    url: 'https://creeksidevet.ae/',
    year: '2024',
    location: 'Dubai, UAE',
  },
  {
    title: "Kay's Law & Associates",
    category: 'Legal',
    description:
      'Multi-practice law firm site spanning immigration, family, employment and corporate law.',
    url: 'https://kayslaw.co.uk/',
    year: '2024',
    location: 'UK',
  },
  {
    title: 'SAVET Mobile Vet',
    category: 'Veterinary',
    description:
      'Mobile veterinary service in Dubai — full pet healthcare delivered to the doorstep, 24/7.',
    url: 'https://savet.ae/',
    year: '2025',
    location: 'Dubai, UAE',
  },
  {
    title: 'ADS Medical',
    category: 'Healthcare',
    description:
      'London regenerative-medicine clinic offering non-surgical PRP therapy for joint pain.',
    url: 'https://ads-medical.com/',
    year: '2024',
    location: 'London, UK',
  },
  {
    title: 'Adforce.ai',
    category: 'Marketing',
    description:
      'AI-powered marketing agency turning ad spend into predictable, measurable growth.',
    url: 'https://adforce.ai/',
    year: '2025',
    location: 'Global',
  },
  {
    title: 'XLine Mobile',
    category: 'E-commerce',
    description:
      'E-commerce store for mobile phones, accessories and tech gadgets with full cart & checkout.',
    url: 'https://xlinemobile.com/',
    year: '2024',
    location: 'UK',
  },
  {
    title: 'Beyond Ranking',
    category: 'Marketing',
    description:
      'Performance-driven SEO agency site focused on business KPIs over vanity keyword rankings.',
    url: 'https://beyondranking.com/',
    year: '2024',
    location: 'Global',
  },
  {
    title: 'Numzz Tech',
    category: 'Tech',
    description:
      'Game-development studio specialising in Unity, 2D/3D design and immersive experiences.',
    url: 'https://numzztech.com/',
    year: '2024',
    location: 'Global',
  },
  {
    title: 'Ideas Animation',
    category: 'Media',
    description:
      "Australia's leading educational video & animation studio — explainer and SaaS content.",
    url: 'https://ideasanimation.com.au/',
    year: '2024',
    location: 'Australia',
  },
  {
    title: 'Xpress Grocers',
    category: 'E-commerce',
    description:
      "Pakistan's boutique grocery + café — health-focused store with online ordering.",
    url: 'https://xpressgrocers.pk/',
    year: '2025',
    location: 'Lahore, PK',
  },
  {
    title: 'Integrated IT Training',
    category: 'Education',
    description:
      'E-learning platform with 2,600+ hours of IT certification training and prep questions.',
    url: 'https://integratedittraining.com/',
    year: '2024',
    location: 'Global',
  },
  {
    title: 'BluOrange Travels',
    category: 'Travel',
    description:
      'Travel agency platform for ticketing, visas, corporate tours and Umrah packages.',
    url: 'https://bluorangetravels.com/',
    year: '2024',
    location: 'Lahore, PK',
  },
]

export const categories = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
]
