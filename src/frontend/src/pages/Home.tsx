import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import {
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  ChevronRight,
  Clock,
  GraduationCap,
  Heart,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const initiatives = [
  { icon: GraduationCap, label: "Vocational Training", color: "text-blue-600" },
  { icon: BookOpen, label: "Education Support", color: "text-green-600" },
  { icon: Banknote, label: "Financial Empowerment", color: "text-orange-500" },
  { icon: Heart, label: "Healthcare", color: "text-red-500" },
];

const stats = [
  {
    icon: Users,
    number: "50,000+",
    label: "Women Empowered",
    color: "text-green-700",
  },
  {
    icon: MapPin,
    number: "200+",
    label: "Active Centers",
    color: "text-orange-500",
  },
  {
    icon: Award,
    number: "15+",
    label: "States Covered",
    color: "text-blue-600",
  },
  {
    icon: Clock,
    number: "10+",
    label: "Years of Service",
    color: "text-purple-600",
  },
];

export default function Home() {
  const { news } = useApp();
  const latestNews = news.filter((n) => n.isPublished).slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-[88vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/assets/generated/hero-women-empowerment.dim_1400x700.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full py-16 flex flex-col lg:flex-row items-center gap-8">
          {/* Left: Hero text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-white"
          >
            <Badge className="bg-ngo-orange text-white mb-4 text-sm px-3 py-1">
              महिला सशक्तिकरण
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
              Empowering Women,
              <br />
              <span className="text-ngo-orange">Transforming India</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
              DMVV Bhartiy Mahila Shakti Foundation™ works tirelessly to provide
              vocational training, financial support, and opportunities for
              women across rural and urban India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button
                  size="lg"
                  className="bg-ngo-orange text-white hover:bg-ngo-orange-dark font-semibold"
                  data-ocid="hero.primary_button"
                >
                  Explore Our Work <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                  data-ocid="hero.secondary_button"
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Floating panel */}
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
                  {initiatives.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl"
                    >
                      <item.icon size={28} className={item.color} />
                      <span className="text-xs font-medium text-gray-700 mt-2">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t px-5 py-3">
                  <div className="font-semibold text-sm text-gray-800 mb-3">
                    Impact Stories
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                      <img
                        src="/assets/generated/training-tailoring.dim_600x400.jpg"
                        className="w-10 h-10 object-cover rounded-lg"
                        alt="Training"
                      />
                      <div>
                        <div className="text-xs font-semibold text-gray-800">
                          Sunita's Story
                        </div>
                        <div className="text-xs text-gray-500">
                          From trainee to entrepreneur
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
                      <img
                        src="/assets/generated/employment-success.dim_600x400.jpg"
                        className="w-10 h-10 object-cover rounded-lg"
                        alt="Employment"
                      />
                      <div>
                        <div className="text-xs font-semibold text-gray-800">
                          Rekha's Journey
                        </div>
                        <div className="text-xs text-gray-500">
                          Self-reliant through microfinance
                        </div>
                      </div>
                    </div>
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
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center"
                    >
                      <stat.icon size={28} className={stat.color} />
                      <div
                        className={`text-3xl font-extrabold mt-2 ${stat.color}`}
                      >
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 mt-1 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/assets/generated/community-center.dim_600x400.jpg"
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
            News & Announcements
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
            Join the Movement for Women's Empowerment
          </h2>
          <p className="text-green-200 text-lg mb-8">
            Become a volunteer, donate, or register as a beneficiary. Together,
            we can create lasting change.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-ngo-orange text-white hover:bg-ngo-orange-dark font-semibold"
                data-ocid="cta.primary_button"
              >
                Register Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
                data-ocid="cta.secondary_button"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
