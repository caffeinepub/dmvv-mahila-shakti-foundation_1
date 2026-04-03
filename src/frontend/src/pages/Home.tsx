import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import {
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  Briefcase,
  ChevronRight,
  Clock,
  Globe,
  GraduationCap,
  Heart,
  HeartHandshake,
  HomeIcon,
  Leaf,
  MapPin,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap,
  BookOpen,
  Banknote,
  Heart,
  Users,
  MapPin,
  Award,
  Clock,
  Leaf,
  Shield,
  Star,
  Zap,
  HomeIcon,
  Briefcase,
  Globe,
  Home: HomeIcon,
  HeartHandshake,
  ArrowRight,
};

function getIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Star;
}

export default function Home() {
  const {
    news,
    homeHero,
    homeStats,
    homeInitiatives,
    homeImpactStories,
    homeCTA,
    communityCenters,
    youtubeVideos,
  } = useApp();

  const latestNews = news.filter((n) => n.isPublished).slice(0, 3);
  const activeStats = homeStats
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeInitiatives = homeInitiatives
    .filter((i) => i.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeImpactStories = homeImpactStories
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeYouTubeVideos = youtubeVideos
    .filter((v) => v.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const featuredCenterImage =
    communityCenters.find((c) => c.isActive)?.imageUrl ||
    "/assets/generated/community-center.dim_600x400.jpg";

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[88vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/assets/generated/hero-women-empowerment.dim_1400x700.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full py-16 flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-white"
          >
            <Badge className="bg-ngo-orange text-white mb-4 text-sm px-3 py-1">
              महिला सशक्तिकरण
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 whitespace-pre-line">
              {homeHero.heading.split("\n").map((line) =>
                line.includes("Transform") || line.includes("India") ? (
                  <span key={line} className="text-ngo-orange">
                    {line}
                  </span>
                ) : (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ),
              )}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
              {homeHero.subheading}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button
                  size="lg"
                  className="bg-ngo-orange text-white hover:bg-ngo-orange-dark font-semibold"
                  data-ocid="hero.primary_button"
                >
                  {homeHero.primaryBtnText}{" "}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                  data-ocid="hero.secondary_button"
                >
                  {homeHero.secondaryBtnText}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full lg:w-80 xl:w-96"
          >
            <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-ngo-green text-white px-5 py-3">
                  <h3 className="font-bold text-sm">Our Core Initiatives</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                  {activeInitiatives.map((item) => {
                    const Icon = getIcon(item.iconName);
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl"
                        data-ocid={`initiatives.item.${item.sortOrder}`}
                      >
                        <Icon size={28} className={item.color} />
                        <span className="text-xs font-medium text-gray-700 mt-2">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t px-5 py-3">
                  <div className="font-semibold text-sm text-gray-800 mb-3">
                    Impact Stories
                  </div>
                  <div className="space-y-2">
                    {activeImpactStories.map((story) => (
                      <div
                        key={story.id}
                        className={`flex items-center gap-3 p-2 ${story.bgColor} rounded-lg`}
                        data-ocid={`impact_stories.item.${story.sortOrder}`}
                      >
                        <img
                          src={story.imageUrl}
                          className="w-10 h-10 object-cover rounded-lg"
                          alt={story.title}
                        />
                        <div>
                          <div className="text-xs font-semibold text-gray-800">
                            {story.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {story.subtitle}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative -mt-10 z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {activeStats.map((stat) => {
                    const Icon = getIcon(stat.iconName);
                    return (
                      <div
                        key={stat.id}
                        className="flex flex-col items-center"
                        data-ocid={`stats.item.${stat.sortOrder}`}
                      >
                        <Icon size={28} className={stat.color} />
                        <div
                          className={`text-3xl font-extrabold mt-2 ${stat.color}`}
                        >
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-600 mt-1 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About Preview - Community Center image */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={
                featuredCenterImage ||
                "/assets/generated/community-center.dim_600x400.jpg"
              }
              alt="Community Center"
              className="rounded-2xl shadow-lg w-full object-cover h-72 md:h-80"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-green-100 text-ngo-green mb-3">About Us</Badge>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              A Decade of Transforming Lives
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded over a decade ago, DMVV Bhartiy Mahila Shakti Foundation
              has been at the forefront of women's empowerment in India. We
              believe that when women thrive, families flourish and communities
              transform.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our integrated approach addresses education, skill development,
              financial inclusion, healthcare, and legal rights — creating
              holistic opportunities for women from all backgrounds.
            </p>
            <Link to="/about">
              <Button
                className="bg-ngo-green text-white hover:bg-ngo-green-dark"
                data-ocid="about_preview.primary_button"
              >
                Know More <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      {activeYouTubeVideos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <Badge className="bg-red-100 text-red-600 mb-3">YouTube</Badge>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Watch &amp; Learn
            </h2>
            <p className="text-gray-500 mt-2">
              Videos from our programs and events
            </p>
          </div>
          {activeYouTubeVideos.length === 1 ? (
            <div className="max-w-3xl mx-auto">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full rounded-2xl shadow-xl"
                  src={`https://www.youtube.com/embed/${activeYouTubeVideos[0].youtubeId}`}
                  title={activeYouTubeVideos[0].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4 text-center">
                {activeYouTubeVideos[0].title}
              </h3>
              {activeYouTubeVideos[0].description && (
                <p className="text-gray-500 text-center mt-2">
                  {activeYouTubeVideos[0].description}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl p-6">
                <div
                  className="relative w-full"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
                    src={`https://www.youtube.com/embed/${activeYouTubeVideos[0].youtubeId}`}
                    title={activeYouTubeVideos[0].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div>
                  <Badge className="bg-red-100 text-red-600 mb-2">
                    Featured
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {activeYouTubeVideos[0].title}
                  </h3>
                  <p className="text-gray-600">
                    {activeYouTubeVideos[0].description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeYouTubeVideos.slice(1).map((video) => (
                  <div
                    key={video.id}
                    className="rounded-xl overflow-hidden shadow-md bg-white"
                  >
                    <div
                      className="relative w-full"
                      style={{ paddingTop: "56.25%" }}
                    >
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                        {video.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Schemes Overview */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-orange-100 text-ngo-orange mb-3">
              Government Schemes
            </Badge>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Key Schemes for Women
            </h2>
            <p className="text-gray-500 mt-2">
              We help women access these government programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Beti Bachao Beti Padhao",
                desc: "Protecting and educating the girl child across India",
                icon: "👧",
              },
              {
                name: "PM Ujjwala Yojana",
                desc: "Clean cooking fuel for women from BPL households",
                icon: "🔥",
              },
              {
                name: "Mahila Shakti Kendra",
                desc: "Strengthening rural women through community participation",
                icon: "🏠",
              },
              {
                name: "Stand-Up India",
                desc: "Loans for women entrepreneurs to set up enterprises",
                icon: "📊",
              },
              {
                name: "Skill India for Women",
                desc: "Vocational training and placement for women",
                icon: "🎓",
              },
              {
                name: "MUDRA Yojana",
                desc: "Micro-financing for small businesses run by women",
                icon: "💰",
              },
            ].map((scheme) => (
              <motion.div
                key={scheme.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow border border-gray-200">
                  <CardContent className="p-5">
                    <div className="text-3xl mb-3">{scheme.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {scheme.name}
                    </h3>
                    <p className="text-sm text-gray-600">{scheme.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/schemes">
              <Button
                variant="outline"
                className="border-ngo-green text-ngo-green hover:bg-green-50"
                data-ocid="schemes.primary_button"
              >
                View All Schemes <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <Badge className="bg-blue-100 text-blue-700 mb-3">
            Latest Updates
          </Badge>
          <h2 className="text-3xl font-extrabold text-gray-900">
            News &amp; Announcements
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-44 object-cover rounded-t-lg"
                  />
                )}
                <CardContent className="p-5">
                  <Badge variant="outline" className="text-xs mb-2">
                    {item.category}
                  </Badge>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="text-xs text-gray-400 mt-3">
                    {item.publishDate}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/news">
            <Button
              variant="outline"
              className="border-ngo-green text-ngo-green hover:bg-green-50"
              data-ocid="news.primary_button"
            >
              View All News <ChevronRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-ngo-green py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            {homeCTA.heading}
          </h2>
          <p className="text-green-200 text-lg mb-8">{homeCTA.subtext}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-ngo-orange text-white hover:bg-ngo-orange-dark font-semibold"
                data-ocid="cta.primary_button"
              >
                {homeCTA.primaryBtnText}
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
                data-ocid="cta.secondary_button"
              >
                {homeCTA.secondaryBtnText}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
