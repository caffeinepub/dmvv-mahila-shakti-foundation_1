import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Mail, Phone } from "lucide-react";
import { motion } from "motion/react";

const DEPT_COLORS: Record<string, string> = {
  Leadership: "bg-purple-100 text-purple-700",
  Programs: "bg-blue-100 text-blue-700",
  Finance: "bg-green-100 text-green-700",
  Operations: "bg-orange-100 text-orange-700",
  HR: "bg-pink-100 text-pink-700",
  IT: "bg-cyan-100 text-cyan-700",
};

export default function OurTeam() {
  const { teamMembers } = useApp();
  const activeMembers = teamMembers
    .filter((m) => m.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main className="min-h-screen">
      <section className="relative h-56 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Our People</Badge>
          <h1 className="text-4xl font-extrabold text-white">Our Team</h1>
          <p className="text-green-200 mt-2">
            The dedicated people behind DMVV Foundation's mission
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        {activeMembers.length === 0 ? (
          <div
            className="text-center py-20 text-gray-400"
            data-ocid="team.empty_state"
          >
            <p className="text-lg">Team members will be listed here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                data-ocid={`team.item.${idx + 1}`}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-ngo-green mb-4"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-ngo-green/10 border-4 border-ngo-green flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-ngo-green">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <Badge
                      className={`text-xs mb-2 ${DEPT_COLORS[member.department] || "bg-gray-100 text-gray-700"}`}
                    >
                      {member.department}
                    </Badge>
                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      {member.name}
                    </h3>
                    <p className="text-ngo-green text-sm font-medium mb-3">
                      {member.designation}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-col gap-1.5 w-full mt-auto">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-xs text-gray-500 hover:text-ngo-green transition-colors"
                        >
                          <Mail size={12} /> {member.email}
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2 text-xs text-gray-500 hover:text-ngo-green transition-colors"
                        >
                          <Phone size={12} /> {member.phone}
                        </a>
                      )}
                    </div>
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
