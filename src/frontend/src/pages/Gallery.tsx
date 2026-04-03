import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { motion } from "motion/react";
import { useState } from "react";

export default function Gallery() {
  const { galleryItems } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");

  const hasVideos = galleryItems.some((g) => g.mediaType === "video");
  const baseCategories = [
    "All",
    ...Array.from(new Set(galleryItems.map((g) => g.category))),
  ];
  const categories = hasVideos
    ? [...baseCategories.filter((c) => c !== "Videos"), "Videos"]
    : baseCategories;

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : activeCategory === "Videos"
        ? galleryItems.filter((img) => img.mediaType === "video")
        : galleryItems.filter(
            (img) =>
              img.category === activeCategory && img.mediaType !== "video",
          );

  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">
            Visual Journey
          </Badge>
          <h1 className="text-4xl font-extrabold text-white">
            Photo &amp; Video Gallery
          </h1>
          <p className="text-green-200 mt-2">
            Moments from our programs, centers, and events
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              className={
                activeCategory === cat
                  ? "bg-ngo-green text-white"
                  : "border-ngo-green text-ngo-green hover:bg-green-50"
              }
              onClick={() => setActiveCategory(cat)}
              data-ocid="gallery.tab"
            >
              {cat}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div
            className="text-center py-20 text-gray-400"
            data-ocid="gallery.empty_state"
          >
            <p className="text-lg">No items in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="group relative overflow-hidden rounded-xl"
                data-ocid={`gallery.item.${idx + 1}`}
              >
                {item.mediaType === "video" ? (
                  // biome-ignore lint/a11y/useMediaCaption: user-uploaded gallery videos
                  <video
                    src={item.src}
                    className="w-full h-52 object-cover"
                    controls
                    preload="metadata"
                  />
                ) : (
                  <>
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end pointer-events-none">
                      <div className="p-3">
                        <Badge className="bg-ngo-orange text-white text-xs mb-1">
                          {item.category}
                        </Badge>
                        <p className="text-white text-sm font-medium">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
