import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const schemes = [
  {
    name: "Pradhan Mantri Ujjwala Yojana",
    ministry: "Ministry of Petroleum & Natural Gas",
    description:
      "Provides free LPG connections to women from Below Poverty Line households to eliminate dependence on traditional cooking fuels and reduce health hazards from smoke.",
    eligibility: [
      "Woman from BPL household",
      "Age above 18 years",
      "Should not already have LPG connection",
      "Must possess valid BPL card",
    ],
    benefits: [
      "Free LPG connection with 14.2 kg cylinder",
      "₹1,600 financial assistance",
      "Free first refill and hotplate",
      "Subsequent cylinders at subsidized rates",
    ],
    howToApply:
      "Visit nearest LPG distributor or apply online on the PMUY portal with Aadhaar, BPL ration card, and bank account details.",
    color: "border-orange-400",
  },
  {
    name: "Beti Bachao Beti Padhao",
    ministry: "Ministry of Women & Child Development",
    description:
      "National campaign to address the declining Child Sex Ratio (CSR) and related issues of the empowerment of women over a lifecycle continuum, promote education and welfare of the girl child.",
    eligibility: [
      "Girl children from birth to Class 10",
      "Parents or guardians of girl children",
      "Applicable in all 640 districts",
      "Special focus on 100 selected districts",
    ],
    benefits: [
      "Sukanya Samriddhi Yojana with 8% interest rate",
      "Scholarship for girl students",
      "Awareness programs against female foeticide",
      "Free admission in government schools",
    ],
    howToApply:
      "Register at Anganwadi centers or apply through BBBP portal. Open bank account under Sukanya Samriddhi Yojana at post office or designated banks.",
    color: "border-pink-400",
  },
  {
    name: "Mahila Shakti Kendra",
    ministry: "Ministry of Women & Child Development",
    description:
      "Scheme to empower rural women through community participation. Provides an interface for rural women to interact with the government and access their entitlements through awareness generation, capacity building, and training.",
    eligibility: [
      "Rural women in designated districts",
      "Women from SC/ST/OBC categories get priority",
      "Widows and single women preferred",
      "Self-Help Group members eligible",
    ],
    benefits: [
      "Community skill development",
      "Awareness about government schemes",
      "Facilitation of bank accounts and Aadhaar",
      "Linkage to MNREGA and other schemes",
    ],
    howToApply:
      "Contact nearest Anganwadi or District Women & Child Development Officer (DWCDO) to register and access services.",
    color: "border-green-400",
  },
  {
    name: "Stand-Up India Scheme",
    ministry: "Ministry of Finance",
    description:
      "Facilitates bank loans between ₹10 lakh to ₹1 crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
    eligibility: [
      "Women entrepreneurs above 18 years",
      "SC/ST/OBC women get additional benefits",
      "First-generation entrepreneurs preferred",
      "Valid business plan required",
    ],
    benefits: [
      "Loans from ₹10 lakh to ₹1 crore at concessional rates",
      "Repayment period up to 7 years",
      "Working capital facility up to ₹10 lakh",
      "Margin money subsidy",
    ],
    howToApply:
      "Apply online at standupmitra.in or visit any bank branch with business plan, identity proof, address proof, and project report.",
    color: "border-blue-400",
  },
  {
    name: "Skill India for Women",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    description:
      "Provides skill training to women across various sectors including textiles, food processing, beauty & wellness, healthcare, electronics, and IT to improve their employability and entrepreneurship potential.",
    eligibility: [
      "Women aged 18-45 years",
      "Minimum 5th standard pass",
      "Preference to rural and BPL women",
      "No prior formal skill training",
    ],
    benefits: [
      "Free skill training in 30+ vocational sectors",
      "NSQF-level certification recognized nationwide",
      "Placement assistance with industry partners",
      "Stipend during training period",
    ],
    howToApply:
      "Visit nearest PMKVY Training Centre or register online at skillindiadigital.gov.in. Aadhaar card required for enrollment.",
    color: "border-purple-400",
  },
];

export default function Schemes() {
  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">
            Government Schemes
          </Badge>
          <h1 className="text-4xl font-extrabold text-white">Scheme Details</h1>
          <p className="text-green-200 mt-2">
            Key government programs for women empowerment
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 space-y-10">
        {schemes.map((scheme, idx) => (
          <motion.div
            key={scheme.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card
              className={`border-l-4 ${scheme.color} hover:shadow-lg transition-shadow`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-extrabold text-gray-900">
                    {scheme.name}
                  </h2>
                  <Badge
                    variant="outline"
                    className="text-xs ml-4 whitespace-nowrap"
                  >
                    {scheme.ministry}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-5">{scheme.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">
                      Eligibility Criteria
                    </h3>
                    <ul className="space-y-1">
                      {scheme.eligibility.map((e) => (
                        <li
                          key={e}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle
                            size={14}
                            className="text-green-500 mt-0.5 flex-shrink-0"
                          />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">
                      Benefits
                    </h3>
                    <ul className="space-y-1">
                      {scheme.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle
                            size={14}
                            className="text-orange-500 mt-0.5 flex-shrink-0"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">
                      How to Apply
                    </h3>
                    <p className="text-sm text-gray-600">{scheme.howToApply}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
