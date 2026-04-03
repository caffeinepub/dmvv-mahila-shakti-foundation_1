import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Award, Clock, ImageIcon, Users } from "lucide-react";
import { motion } from "motion/react";

export default function Training() {
  const { trainingPrograms } = useApp();
  const activePrograms = trainingPrograms.filter((p) => p.isActive);

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
        {activePrograms.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">
              No training programs available at this time.
            </p>
          </div>
        ) : (
          activePrograms.map((program, idx) => (
            <motion.div
              key={program.id}
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
                    {program.image ? (
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-56 md:h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-56 md:h-full bg-gray-100 flex items-center justify-center">
                        <ImageIcon size={40} className="text-gray-300" />
                      </div>
                    )}
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
                        {program.eligibility && (
                          <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            <Users size={12} /> {program.eligibility}
                          </span>
                        )}
                        {program.certification && (
                          <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                            <Award size={12} /> {program.certification}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {program.description}
                      </p>
                      {program.outcomes.length > 0 && (
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
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </section>
    </main>
  );
}
