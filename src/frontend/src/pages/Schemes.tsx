import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Schemes() {
  const { schemes } = useApp();
  const activeSchemes = schemes
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const featured = activeSchemes.find((s) => s.featured);
  const rest = activeSchemes.filter((s) => !s.featured);

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
        {/* Featured scheme */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <Card className="border-l-8 border-ngo-orange shadow-xl bg-gradient-to-br from-orange-50 via-white to-amber-50">
              <CardContent className="p-8">
                {/* 3-line title block - left aligned */}
                <div className="mb-6 text-left">
                  <h2 className="text-3xl md:text-4xl font-black text-ngo-orange leading-tight tracking-tight">
                    Self Employment
                  </h2>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-1">
                    Revulation Scheme
                  </p>
                  <p className="text-lg md:text-xl font-semibold text-gray-700 mt-2">
                    Swayam Rozgar — Mahila Sashaktikaran ki Nayi Raah
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge className="bg-ngo-orange text-white">
                    Flagship Scheme
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {featured.ministry}
                  </Badge>
                </div>
                <p className="text-gray-700 mb-6 text-base leading-relaxed">
                  {featured.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                    <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                      Eligibility Criteria
                    </h3>
                    <ul className="space-y-2">
                      {featured.eligibility.map((e) => (
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
                      {featured.benefits.map((b) => (
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
                      {featured.howToApply}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Rest of schemes */}
        {rest.map((scheme, idx) => (
          <motion.div
            key={scheme.id}
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

        {activeSchemes.length === 0 && (
          <div
            className="text-center py-20 text-gray-400"
            data-ocid="schemes.empty_state"
          >
            No schemes available.
          </div>
        )}
      </section>
    </main>
  );
}
