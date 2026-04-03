import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Eye, Heart, Target, Users } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    desc: "We approach every woman's situation with empathy, dignity, and genuine care.",
  },
  {
    icon: Target,
    title: "Impact-Driven",
    desc: "We measure our success by the real, tangible change we create in women's lives.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    desc: "We serve women from all castes, religions, and economic backgrounds without discrimination.",
  },
  {
    icon: Award,
    title: "Integrity",
    desc: "We maintain complete transparency in fund utilization and program implementation.",
  },
  {
    icon: BookOpen,
    title: "Education",
    desc: "We believe education is the most powerful tool for sustainable women empowerment.",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "We envision an India where every woman is self-reliant, respected, and empowered.",
  },
];

const leadership = [
  {
    name: "Dr. Anjali Srivastava",
    role: "Founder & President",
    qualification: "Ph.D. Social Work, BHU",
  },
  {
    name: "Mrs. Meena Gupta",
    role: "Secretary General",
    qualification: "M.A. Public Administration",
  },
  {
    name: "Mr. Suresh Kumar Verma",
    role: "Treasurer",
    qualification: "CA, ICAI",
  },
  {
    name: "Dr. Priya Nair",
    role: "Program Director",
    qualification: "MBA, Social Entrepreneurship",
  },
];

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section
        className="relative h-52 flex items-center bg-ngo-green"
        style={{
          backgroundImage: `linear-gradient(rgba(15,74,46,0.85), rgba(15,74,46,0.85)), url('/assets/generated/community-center.dim_600x400.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">About Us</Badge>
          <h1 className="text-4xl font-extrabold text-white">
            About DMVV Foundation
          </h1>
          <p className="text-green-200 mt-2">
            Our story, mission, and the people behind the movement
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              DMVV Bhartiy Mahila Shakti Foundation™ was established with a
              singular vision: to empower every woman in India regardless of her
              social or economic background. What began as a small community
              initiative in Uttar Pradesh has grown into a nationwide movement
              touching the lives of over 50,000 women.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Over the past decade, we have established 200+ centers across 15
              states, implemented government schemes at the grassroots level,
              provided vocational training to lakhs of women, and facilitated
              microfinance loans to thousands of women entrepreneurs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Registered under the Societies Registration Act, we operate with
              complete transparency and accountability. Our work is guided by
              the Constitution of India's commitment to gender equality and
              social justice.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/assets/generated/awards-ceremony.dim_600x400.jpg"
              alt="Foundation Event"
              className="rounded-2xl shadow-lg w-full h-80 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-l-4 border-ngo-green">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-ngo-green" size={28} />
                <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To empower women from all strata of Indian society through skill
                development, education, financial inclusion, and advocacy —
                creating a generation of self-reliant, confident, and
                economically independent women who can contribute to their
                families, communities, and nation.
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-ngo-orange">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-ngo-orange" size={28} />
                <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                An India where every woman, irrespective of her background, has
                equal access to opportunities, rights, and resources. A nation
                where gender equality is not just an aspiration but a lived
                reality — from village panchayats to corporate boardrooms.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Our Core Values
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <val.icon size={28} className="text-ngo-green mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">{val.title}</h3>
                  <p className="text-sm text-gray-600">{val.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-ngo-green py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white">
              Leadership Team
            </h2>
            <p className="text-green-200 mt-2">
              Guided by experience, driven by purpose
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person) => (
              <Card
                key={person.name}
                className="bg-white/10 border-green-600 text-white"
              >
                <CardContent className="p-5 text-center">
                  <div className="w-16 h-16 bg-ngo-orange rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                    {person.name.charAt(0)}
                  </div>
                  <h3 className="font-bold">{person.name}</h3>
                  <p className="text-ngo-orange text-sm mt-1">{person.role}</p>
                  <p className="text-green-300 text-xs mt-1">
                    {person.qualification}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Our Achievements
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              year: "2015",
              title: "Best NGO Award",
              desc: "Received National Award for Excellence in Women's Empowerment by Ministry of Women & Child Development",
            },
            {
              year: "2018",
              title: "100th Center Opened",
              desc: "Reached a milestone of 100 active centers across 8 states serving over 20,000 women",
            },
            {
              year: "2020",
              title: "ISO 9001:2015 Certified",
              desc: "Achieved international quality management certification for our training and program delivery",
            },
            {
              year: "2022",
              title: "NABARD Partnership",
              desc: "Signed MOU with NABARD to support women farmers through Mahila Kisan Sashaktikaran Pariyojana",
            },
            {
              year: "2023",
              title: "Digital India Recognition",
              desc: "Recognized by MeitY for digital literacy initiatives reaching 10,000 women in rural areas",
            },
            {
              year: "2025",
              title: "50,000 Women Milestone",
              desc: "Crossed the landmark of 50,000 women directly empowered through our various programs",
            },
          ].map((ach) => (
            <motion.div
              key={ach.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <Badge className="bg-ngo-orange text-white mb-3">
                    {ach.year}
                  </Badge>
                  <h3 className="font-bold text-gray-900 mb-2">{ach.title}</h3>
                  <p className="text-sm text-gray-600">{ach.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
