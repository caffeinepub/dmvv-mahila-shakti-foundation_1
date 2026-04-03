import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Users } from "lucide-react";
import { motion } from "motion/react";

const programs = [
  {
    title: "Tailoring & Fashion Design",
    duration: "3-6 Months",
    eligibility: "Women aged 18-45, minimum 8th standard",
    certification: "NSQF Level 4 - Apparel Sector Skill Council",
    description:
      "Comprehensive training in stitching, garment making, embroidery, and fashion design. Includes machine operation, pattern making, and quality finishing techniques.",
    outcomes: [
      "Sewing machine operation",
      "Pattern making & cutting",
      "Garment construction",
      "Embroidery & decorative work",
      "Quality control & finishing",
    ],
    image: "/assets/generated/training-tailoring.dim_600x400.jpg",
    color: "border-pink-400",
  },
  {
    title: "Computer & Digital Literacy",
    duration: "1-3 Months",
    eligibility: "Women aged 18-50, minimum 5th standard",
    certification: "NIELIT O Level & CCC Certificate",
    description:
      "Basic to intermediate computer skills including MS Office, internet, email, digital payment, and online government services access.",
    outcomes: [
      "MS Office (Word, Excel, PowerPoint)",
      "Internet & email usage",
      "Digital payment methods (UPI, NEFT)",
      "Online government portal navigation",
      "E-commerce basics",
    ],
    image: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    color: "border-blue-400",
  },
  {
    title: "Beauty & Wellness",
    duration: "3 Months",
    eligibility: "Women aged 18-40, minimum 8th standard",
    certification: "Beauty & Wellness Sector Skill Council Level 3",
    description:
      "Professional training in beauty treatments, skincare, hair styling, and wellness services. Graduates can work in salons or start their own beauty business.",
    outcomes: [
      "Facial & skincare treatments",
      "Hair cutting & styling",
      "Mehendi application",
      "Makeup & bridal services",
      "Salon management basics",
    ],
    image: "/assets/generated/employment-success.dim_600x400.jpg",
    color: "border-purple-400",
  },
  {
    title: "Food Processing & Packaging",
    duration: "2 Months",
    eligibility: "Women aged 18-45, minimum 5th standard",
    certification:
      "FICSI (Food Industry Capacity & Skill Initiative) Certificate",
    description:
      "Training in food preservation, processing, and packaging techniques for pickles, papads, jams, and agro-products. Enables women to start home-based food businesses.",
    outcomes: [
      "Food safety & hygiene standards (FSSAI)",
      "Pickle & jam preparation",
      "Packaging & labeling requirements",
      "Food business registration",
      "Marketing & selling food products",
    ],
    image: "/assets/generated/community-center.dim_600x400.jpg",
    color: "border-orange-400",
  },
  {
    title: "Handicrafts & Embroidery",
    duration: "3 Months",
    eligibility: "Women aged 18-50, no minimum education",
    certification: "MSME & DC-Handicrafts Artisan Certificate",
    description:
      "Traditional and contemporary handicraft training including chikan embroidery, block printing, pottery, and tribal art. Connects women artisans to national and global markets.",
    outcomes: [
      "Chikan & Zardosi embroidery",
      "Block printing techniques",
      "Pottery & clay work",
      "Product finishing & pricing",
      "Online selling through e-commerce",
    ],
    image: "/assets/generated/training-tailoring.dim_600x400.jpg",
    color: "border-yellow-400",
  },
];

export default function Training() {
  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">
            Skill Development
          </Badge>
          <h1 className="text-4xl font-extrabold text-white">
            Training Programs
          </h1>
          <p className="text-green-200 mt-2">
            NSQF-certified vocational training for sustainable livelihoods
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 space-y-10">
        {programs.map((program, idx) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card
              className={`border-l-4 ${program.color} hover:shadow-lg transition-shadow overflow-hidden`}
            >
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-56 md:h-full object-cover"
                  />
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-xl font-extrabold text-gray-900">
                        {program.title}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        <Clock size={12} /> {program.duration}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        <Users size={12} /> {program.eligibility}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                        <Award size={12} /> {program.certification}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {program.description}
                    </p>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800 mb-2">
                        Learning Outcomes:
                      </h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {program.outcomes.map((o) => (
                          <li
                            key={o}
                            className="text-xs text-gray-600 flex items-center gap-1"
                          >
                            <span className="text-green-500">•</span> {o}
                          </li>
                        ))}
                      </ul>
                    </div>
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
