import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Award, Link as LinkIcon, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";

function getAwardIcon(category: string): React.ElementType {
  if (category.toLowerCase().includes("entrepre")) return Trophy;
  if (category.toLowerCase().includes("digital")) return Star;
  return Award;
}

export default function Rewards() {
  const { awardCategories, awardWinners } = useApp();
  const activeCategories = awardCategories
    .filter((a) => a.isActive)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const activeWinners = awardWinners
    .filter((w) => w.isActive)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

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
        {activeCategories.length === 0 ? (
          <div
            className="text-center py-10 text-gray-400"
            data-ocid="rewards.empty_state"
          >
            Koi award category available nahi hai.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCategories.map((award, idx) => {
              const Icon = getAwardIcon(award.category || "");
              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  data-ocid={`rewards.item.${idx + 1}`}
                >
                  <Card
                    className={`border-l-4 ${award.color} hover:shadow-lg transition-shadow`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Icon
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
              );
            })}
          </div>
        )}

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
                <LinkIcon size={14} className="mr-2" /> Nominate Now
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
          {activeWinners.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              Koi past winner available nahi hai.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeWinners.map((w, idx) => (
                <Card
                  key={w.id}
                  className="hover:shadow-md transition-shadow"
                  data-ocid={`rewards.item.${idx + 1}`}
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
          )}
        </div>
      </section>
    </main>
  );
}
