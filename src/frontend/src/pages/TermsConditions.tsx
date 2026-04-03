import { Badge } from "@/components/ui/badge";

export default function TermsConditions() {
  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Legal</Badge>
          <h1 className="text-4xl font-extrabold text-white">
            Terms &amp; Conditions
          </h1>
          <p className="text-green-200 mt-2">
            Please read these terms carefully before using our services
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="prose prose-gray max-w-none space-y-8">
          <div>
            <p className="text-gray-500 text-sm">
              Last updated: January 1, 2025
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to DMVV Bhartiy Mahila Shakti Foundation (“Foundation”,
              “we”, “our”, or “us”). By accessing our website, registering as a
              member, or using any of our services, you agree to be bound by
              these Terms and Conditions. These terms apply to all visitors,
              users, volunteers, donors, and members of the Foundation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Use of Website
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                This website is intended for informational and registration
                purposes for the programs and services of DMVV Foundation.
              </li>
              <li>
                You may not use this website for any illegal or unauthorized
                purpose.
              </li>
              <li>
                You agree not to transmit any worms, viruses, or any code of a
                destructive nature.
              </li>
              <li>
                All content on this website is the property of DMVV Foundation
                and may not be reproduced without written permission.
              </li>
              <li>
                We reserve the right to refuse service to anyone for any reason
                at any time.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Membership Terms
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Membership is open to women aged 18 years and above who are
                Indian citizens.
              </li>
              <li>
                All information provided during registration must be accurate
                and truthful.
              </li>
              <li>
                Members must comply with all rules and regulations of the
                Foundation.
              </li>
              <li>
                Membership can be revoked if a member is found to be providing
                false information or engaging in conduct detrimental to the
                Foundation.
              </li>
              <li>
                Members are responsible for maintaining the confidentiality of
                their login credentials.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Privacy Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We respect your privacy and are committed to protecting your
              personal data. The information you provide during registration is
              used solely for managing your membership, delivering services, and
              communicating program updates. We do not sell, trade, or transfer
              your personally identifiable information to outside parties
              without your consent, except where required by law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website, including but not limited to text,
              graphics, logos, images, and software, is the property of DMVV
              Bhartiy Mahila Shakti Foundation and is protected by applicable
              intellectual property laws. Unauthorized use, reproduction, or
              distribution of this content is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Donations &amp; Financial Transactions
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                All donations to DMVV Foundation are voluntary and
                non-refundable unless otherwise agreed in writing.
              </li>
              <li>
                Donations are eligible for tax deduction under Section 80G of
                the Income Tax Act.
              </li>
              <li>
                Loan disbursements are subject to the Foundation's loan policy
                and committee approval.
              </li>
              <li>
                All financial transactions must comply with Indian financial
                laws and regulations.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The information on this website is provided on an “as is” basis.
              DMVV Foundation makes no warranties, express or implied, and
              hereby disclaims all warranties regarding the accuracy,
              reliability, or suitability of the information contained on this
              website. While we strive to keep information current and accurate,
              we cannot guarantee that errors will not occur.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms and Conditions are governed by and construed in
              accordance with the laws of India. Any disputes arising from these
              terms shall be subject to the exclusive jurisdiction of the courts
              in Lucknow, Uttar Pradesh.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For any questions regarding these Terms and Conditions, please
              contact us at:{" "}
              <a
                href="mailto:info@dmvvfoundation.org"
                className="text-ngo-green hover:underline"
              >
                info@dmvvfoundation.org
              </a>{" "}
              or visit our office at 15-A Civil Lines, Lucknow, Uttar Pradesh -
              226001.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
