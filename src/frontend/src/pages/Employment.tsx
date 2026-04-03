import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Star, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const partners = [
  { name: "Fabindia", sector: "Retail & Handicrafts", openings: 120 },
  { name: "Lijjat Papad", sector: "Food Industry", openings: 85 },
  { name: "BSNL", sector: "Telecom", openings: 45 },
  { name: "State Bank of India", sector: "Banking", openings: 30 },
  { name: "Apollo Clinics", sector: "Healthcare", openings: 60 },
  { name: "Reliance Trends", sector: "Retail", openings: 95 },
];

const stories = [
  {
    name: "Mona Singh",
    from: "Bareilly, UP",
    now: "Tailoring Business Owner",
    income: "₹25,000/month",
    quote:
      "DMVV Foundation's tailoring training completely transformed my life. I now run a boutique employing 5 other women from my village.",
  },
  {
    name: "Fatima Begum",
    from: "Kishanganj, Bihar",
    now: "Beauty Salon Owner",
    income: "₹18,000/month",
    quote:
      "I never thought I could own my own business. After the beauty training, I started my own salon and now I'm financially independent.",
  },
  {
    name: "Rekha Devi",
    from: "Alwar, Rajasthan",
    now: "Food Processing Entrepreneur",
    income: "₹15,000/month",
    quote:
      "With the food processing skills and MUDRA loan support, I started a pickle manufacturing unit. My products now sell in 3 districts.",
  },
];

export default function Employment() {
  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Employment</Badge>
          <h1 className="text-4xl font-extrabold text-white">
            Employment & Placement
          </h1>
          <p className="text-green-200 mt-2">
            Connecting trained women with job opportunities and entrepreneurship
            support
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                icon: Users,
                label: "Women Placed",
                value: "12,500+",
                color: "text-green-600",
              },
              {
                icon: Building2,
                label: "Partner Companies",
                value: "150+",
                color: "text-blue-600",
              },
              {
                icon: TrendingUp,
                label: "Average Salary",
                value: "₹12,500/mo",
                color: "text-orange-500",
              },
              {
                icon: Star,
                label: "Placement Rate",
                value: "78%",
                color: "text-purple-600",
              },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-5 flex flex-col items-center">
                  <s.icon size={28} className={s.color} />
                  <div className={`text-2xl font-extrabold mt-2 ${s.color}`}>
                    {s.value}
                  </div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Our Industry Partners
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((p) => (
            <Card
              key={p.name}
              className="hover:shadow-md transition-shadow text-center"
            >
              <CardContent className="p-4">
                <Building2 size={24} className="text-ngo-green mx-auto mb-2" />
                <div className="font-bold text-sm text-gray-800">{p.name}</div>
                <div className="text-xs text-gray-500">{p.sector}</div>
                <Badge className="mt-2 bg-green-100 text-green-700 text-xs">
                  {p.openings} openings
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-ngo-green py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-white mb-8 text-center">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((s, idx) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-white h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-ngo-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{s.name}</div>
                        <div className="text-xs text-gray-500">{s.from}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic mb-4">
                      "{s.quote}"
                    </p>
                    <div className="border-t pt-3 flex justify-between text-xs">
                      <span className="text-ngo-green font-medium">
                        {s.now}
                      </span>
                      <span className="text-ngo-orange font-bold">
                        {s.income}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
