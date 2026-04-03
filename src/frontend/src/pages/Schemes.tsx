import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const schemes = [
  {
    name: "Self Employment Revulation Scheme",
    ministry: "Mahila Sashaktikaran Yojana",
    description:
      "DMVV Bhartiy Mahila Shakti Foundation ki yeh flagship yojana mahilaon ko swavlambi banane ke liye design ki gayi hai. Yeh scheme rural aur semi-urban mahilaon ko vyavsayik prashikshan, aarthik sahayata, aur bazaar se seedha jodne ka avsar deti hai. Apna kaam shuru karen, apni pehchan banayein.",
    eligibility: [
      "18-55 aadhar registered mahila",
      "BPL ya lower middle class parivar",
      "Minimum 5th class pass",
      "SHG member ya individual apply kar sakti hain",
    ],
    benefits: [
      "Rup ₹50,000 tak seed capital sahayata",
      "Nishulk vyavsayik prashikshan (3-6 maah)",
      "Marketing aur bazaar linkage",
      "Mentorship aur follow-up support",
    ],
    howToApply:
      "Nazdiki DMVV Mahila Kendra mein sampark karen ya website par online aavedan karen. Aadhaar card, bank passbook, aur ek passport photo saath laye.",
    color: "border-ngo-orange",
    featured: true,
  },
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
        {schemes.map((scheme, idx) =>
          scheme.featured ? (
            // Featured: Self Employment Revulation Scheme - big, left-aligned, 3-line title
            <motion.div
              key={scheme.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="border-l-8 border-ngo-orange shadow-xl bg-gradient-to-br from-orange-50 via-white to-amber-50">
                <CardContent className="p-8">
                  {/* 3-line title block - left aligned */}
                  <div className="mb-6 text-left">
                    {/* Line 1: Large heading */}
                    <h2 className="text-3xl md:text-4xl font-black text-ngo-orange leading-tight tracking-tight">
                      Self Employment
                    </h2>
                    {/* Line 2: Small subtitle */}
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-1">
                      Revulation Scheme
                    </p>
                    {/* Line 3: Medium description tagline */}
                    <p className="text-lg md:text-xl font-semibold text-gray-700 mt-2">
                      Swayam Rozgar — Mahila Sashaktikaran ki Nayi Raah
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge className="bg-ngo-orange text-white">
                      Flagship Scheme
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {scheme.ministry}
                    </Badge>
                  </div>

                  <p className="text-gray-700 mb-6 text-base leading-relaxed">
                    {scheme.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                        Eligibility Criteria
                      </h3>
                      <ul className="space-y-2">
                        {scheme.eligibility.map((e) => (
                          <li
                            key={e}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle
                              size={14}
                              className="text-ngo-orange mt-0.5 flex-shrink-0"
                            />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        {scheme.benefits.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle
                              size={14}
                              className="text-green-500 mt-0.5 flex-shrink-0"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                        How to Apply
                      </h3>
                      <p className="text-sm text-gray-600">
                        {scheme.howToApply}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
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
                      <p className="text-sm text-gray-600">
                        {scheme.howToApply}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ),
        )}
      </section>
    </main>
  );
}
