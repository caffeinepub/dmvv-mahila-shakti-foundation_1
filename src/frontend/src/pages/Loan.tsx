import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { CheckCircle, Clock, IndianRupee, Percent } from "lucide-react";
import { motion } from "motion/react";

export default function Loan() {
  const { loanSchemes } = useApp();
  const active = loanSchemes
    .filter((l) => l.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">
            Financial Empowerment
          </Badge>
          <h1 className="text-4xl font-extrabold text-white">Loan Schemes</h1>
          <p className="text-green-200 mt-2">
            Microfinance and loan programs for women entrepreneurs
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: IndianRupee,
                label: "Total Loans Disbursed",
                value: "₹35 Crore+",
                color: "text-green-600",
              },
              {
                icon: Percent,
                label: "Repayment Rate",
                value: "94%",
                color: "text-blue-600",
              },
              {
                icon: Clock,
                label: "Processing Time",
                value: "7-14 Days",
                color: "text-orange-500",
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

      <section className="max-w-7xl mx-auto px-4 py-14 space-y-8">
        {active.length === 0 ? (
          <div
            className="text-center py-20 text-gray-400"
            data-ocid="loan.empty_state"
          >
            Koi loan scheme available nahi hai.
          </div>
        ) : (
          active.map((scheme, idx) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              data-ocid={`loan.item.${idx + 1}`}
            >
              <Card
                className={`border-l-4 ${scheme.color} hover:shadow-lg transition-shadow`}
              >
                <CardContent className="p-6">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-1">
                    {scheme.name}
                  </h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge variant="outline">
                      <IndianRupee size={12} className="mr-1" />
                      {scheme.amount}
                    </Badge>
                    <Badge variant="outline">
                      <Percent size={12} className="mr-1" />
                      {scheme.interest}
                    </Badge>
                    <Badge variant="outline">
                      <Clock size={12} className="mr-1" />
                      {scheme.tenure}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{scheme.description}</p>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 mb-2">
                      Eligibility:
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
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
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </section>
    </main>
  );
}
