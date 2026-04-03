import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { motion } from "motion/react";

export default function News() {
  const { news } = useApp();
  const published = news.filter((n) => n.isPublished);

  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">
            Latest Updates
          </Badge>
          <h1 className="text-4xl font-extrabold text-white">
            News & Announcements
          </h1>
          <p className="text-green-200 mt-2">
            Stay informed about our programs and achievements
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        {published.length === 0 ? (
          <div
            className="text-center py-20 text-gray-400"
            data-ocid="news.empty_state"
          >
            <p>No news published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {published.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  className="hover:shadow-lg transition-shadow h-full"
                  data-ocid={`news.item.${idx + 1}`}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {item.publishDate}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-4">
                      {item.content}
                    </p>
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
