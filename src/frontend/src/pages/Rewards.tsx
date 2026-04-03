import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Link, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";

const awards = [
  {
    category: "Entrepreneurship Excellence",
    icon: Trophy,
    description:
      "For women who have built successful businesses employing other women in their communities",
    prize: "₹25,000 + Certificate + Trophy",
    color: "border-yellow-400 bg-yellow-50",
  },
  {
    category: "Social Service Samman",
    icon: Award,
    description:
      "Recognizing outstanding contributions to women's rights, healthcare, and community welfare",
    prize: "₹20,000 + Certificate + Trophy",
    color: "border-green-400 bg-green-50",
  },
  {
    category: "Digital Shakti Award",
    icon: Star,
    description:
      "For women leveraging technology for livelihood, education, or social impact",
    prize: "₹15,000 + Certificate + Trophy",
    color: "border-blue-400 bg-blue-50",
  },
  {
    category: "Krishi Mahila Samman",
    icon: Award,
    description:
      "Honoring women farmers adopting modern techniques and sustainable agriculture",
    prize: "₹20,000 + Certificate + Trophy",
    color: "border-orange-400 bg-orange-50",
  },
];

const pastWinners = [
  {
    name: "Savita Rani",
    year: "2024",
    category: "Entrepreneurship Excellence",
    state: "Uttar Pradesh",
  },
  {
    name: "Dr. Nandini Patil",
    year: "2024",
    category: "Social Service Samman",
    state: "Maharashtra",
  },
  {
    name: "Geeta Kumari",
    year: "2023",
    category: "Digital Shakti Award",
    state: "Bihar",
  },
  {
    name: "Phoolwati Devi",
    year: "2023",
    category: "Krishi Mahila Samman",
    state: "Madhya Pradesh",
  },
  {
    name: "Meenu Chauhan",
    year: "2022",
    category: "Entrepreneurship Excellence",
    state: "Rajasthan",
  },
  {
    name: "Sunita Lakra",
    year: "2022",
    category: "Social Service Samman",
    state: "Jharkhand",
  },
];

export default function Rewards() {
  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Recognition</Badge>
          <h1 className="text-4xl font-extrabold text-white">
            Mahila Samman Puraskar
          </h1>
          <p className="text-green-200 mt-2">
            Annual awards recognizing extraordinary women across India
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Award Categories 2025
          </h2>
          <p className="text-gray-500 mt-2">
            Nominations open until August 31, 2025
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {awards.map((award, idx) => (
            <motion.div
              key={award.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                className={`border-l-4 ${award.color} hover:shadow-lg transition-shadow`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <award.icon
                      size={32}
                      className="text-ngo-green flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {award.category}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {award.description}
                      </p>
                      <Badge className="bg-ngo-orange text-white">
                        {award.prize}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Card className="max-w-lg mx-auto bg-ngo-green text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Submit a Nomination</h3>
              <p className="text-green-200 text-sm mb-4">
                Know an extraordinary woman? Nominate her for the Mahila Samman
                Puraskar 2025.
              </p>
              <Button
                className="bg-ngo-orange text-white hover:bg-ngo-orange-dark"
                data-ocid="rewards.submit_button"
              >
                <Link size={14} className="mr-2" /> Nominate Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            Past Award Winners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastWinners.map((w) => (
              <Card
                key={`${w.name}-${w.year}`}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-ngo-orange rounded-full flex items-center justify-center text-white font-bold">
                    {w.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{w.name}</div>
                    <div className="text-xs text-ngo-green">{w.category}</div>
                    <div className="text-xs text-gray-400">
                      {w.year} | {w.state}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
