import { Badge } from "@/components/ui/badge";

export default function RulesRegulations() {
  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Guidelines</Badge>
          <h1 className="text-4xl font-extrabold text-white">
            Rules &amp; Regulations
          </h1>
          <p className="text-green-200 mt-2">
            Code of conduct and operational guidelines for all members
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="space-y-8">
          <div className="bg-green-50 border border-ngo-green/20 rounded-xl p-5">
            <p className="text-gray-600 text-sm">
              These Rules &amp; Regulations govern the conduct of all members,
              volunteers, staff, and beneficiaries of DMVV Bhartiy Mahila Shakti
              Foundation. All individuals associated with the Foundation are
              expected to adhere to these guidelines.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-ngo-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                1
              </span>
              General Rules
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                All members must treat each other with respect, dignity, and
                compassion.
              </li>
              <li>
                Discrimination based on religion, caste, language, or economic
                status is strictly prohibited.
              </li>
              <li>
                Members must maintain the confidentiality of sensitive
                information shared within programs.
              </li>
              <li>
                Use of the Foundation's name for personal commercial gain is
                strictly prohibited.
              </li>
              <li>All communications must be truthful and non-defamatory.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-ngo-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                2
              </span>
              Membership Rules
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Membership is valid for one year and must be renewed annually.
              </li>
              <li>
                Members must attend at least 60% of scheduled meetings and
                programs.
              </li>
              <li>Membership fees, if applicable, must be paid on time.</li>
              <li>
                Members must update their personal information within 30 days of
                any change.
              </li>
              <li>
                Transfer of membership to another individual is not permitted.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-ngo-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                3
              </span>
              Program Rules
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Beneficiaries enrolled in training programs must maintain
                regular attendance.
              </li>
              <li>
                Program materials and equipment must be used responsibly and
                returned in good condition.
              </li>
              <li>
                Beneficiaries found misusing program benefits will be removed
                from the program.
              </li>
              <li>
                Any grievance regarding program quality should be reported
                through official channels.
              </li>
              <li>
                Certificates are issued only upon successful completion of the
                full program.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-ngo-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                4
              </span>
              Center Rules
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Center premises must be kept clean and hygienic at all times.
              </li>
              <li>
                Only authorized personnel may access restricted areas of the
                center.
              </li>
              <li>
                No smoking, alcohol, or substance use is allowed on center
                premises.
              </li>
              <li>
                Visitors must sign the visitor register and state their purpose
                of visit.
              </li>
              <li>
                Damage to center property must be reported immediately to the
                center coordinator.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-ngo-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                5
              </span>
              Code of Conduct
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                All members must uphold the Foundation's values of integrity,
                service, and empowerment.
              </li>
              <li>
                Sexual harassment, bullying, or any form of intimidation is
                grounds for immediate expulsion.
              </li>
              <li>
                Members must not engage in political activities using the
                Foundation's name or resources.
              </li>
              <li>
                Social media posts representing the Foundation must be approved
                by the communications team.
              </li>
              <li>
                Members must support the principle of women's equal rights and
                dignity.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                6
              </span>
              Disciplinary Action
            </h2>
            <p className="text-gray-600 mb-3">
              Violations of these rules may result in one or more of the
              following actions:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Verbal or written warning</li>
              <li>Suspension from programs or center facilities</li>
              <li>Recovery of losses or damages caused</li>
              <li>Termination of membership</li>
              <li>Legal action where applicable under Indian law</li>
            </ul>
            <p className="text-gray-500 text-sm mt-3">
              All disciplinary matters are handled by the Foundation's Grievance
              Committee. Members have the right to present their case before any
              action is taken.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
