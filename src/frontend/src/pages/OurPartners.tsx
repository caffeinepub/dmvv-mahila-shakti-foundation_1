import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TYPE_COLORS: Record<string, string> = {
  Government: "bg-blue-100 text-blue-700",
  NGO: "bg-green-100 text-green-700",
  Corporate: "bg-purple-100 text-purple-700",
  International: "bg-orange-100 text-orange-700",
};

export default function OurPartners() {
  const { partners } = useApp();
  const [activeType, setActiveType] = useState("All");

  const activePartners = partners
    .filter((p) => p.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const types = [
    "All",
    ...Array.from(new Set(activePartners.map((p) => p.partnerType))),
  ];
  const filtered =
    activeType === "All"
      ? activePartners
      : activePartners.filter((p) => p.partnerType === activeType);

  return (
    <main className="min-h-screen">
      <section className="relative h-56 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Partnerships</Badge>
          <h1 className="text-4xl font-extrabold text-white">Our Partners</h1>
          <p className="text-green-200 mt-2">
            Organizations that support DMVV Foundation's mission
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex flex-wrap gap-2 mb-8">
          {types.map((type) => (
            <Button
              key={type}
              variant={activeType === type ? "default" : "outline"}
              size="sm"
              className={
                activeType === type
                  ? "bg-ngo-green text-white"
                  : "border-ngo-green text-ngo-green hover:bg-green-50"
              }
              onClick={() => setActiveType(type)}
              data-ocid="partners.tab"
            >
              {type}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div
            className="text-center py-20 text-gray-400"
            data-ocid="partners.empty_state"
          >
            <p className="text-lg">No partners in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                data-ocid={`partners.item.${idx + 1}`}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="h-14 object-contain mb-4"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-ngo-green/10 flex items-center justify-center mb-4">
                        <span className="text-xl font-bold text-ngo-green">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <Badge
                      className={`text-xs mb-3 ${TYPE_COLORS[partner.partnerType] || "bg-gray-100 text-gray-700"}`}
                    >
                      {partner.partnerType}
                    </Badge>
                    <h3 className="font-bold text-gray-900 text-base mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {partner.description}
                    </p>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-ngo-green text-sm font-medium hover:underline"
                      >
                        Visit Website <ExternalLink size={12} />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
