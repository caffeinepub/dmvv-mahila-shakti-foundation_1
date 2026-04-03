import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { CheckCircle, MapPin, Phone, XCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Centers() {
  const { centers } = useApp();

  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Our Network</Badge>
          <h1 className="text-4xl font-extrabold text-white">Our Centers</h1>
          <p className="text-green-200 mt-2">
            {centers.filter((c) => c.isActive).length} active centers across
            India
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((center, idx) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{center.name}</h3>
                    {center.isActive ? (
                      <Badge className="bg-green-100 text-green-700 flex items-center gap-1 whitespace-nowrap ml-2">
                        <CheckCircle size={12} /> Active
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-500 flex items-center gap-1 whitespace-nowrap ml-2">
                        <XCircle size={12} /> Inactive
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin
                        size={14}
                        className="text-ngo-green mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <div>{center.address}</div>
                        <div className="font-medium">
                          {center.district}, {center.state}
                        </div>
                        <div className="text-xs text-gray-400">
                          Block: {center.block}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-ngo-orange" />
                      <span>{center.contactPhone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
