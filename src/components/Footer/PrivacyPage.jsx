import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="pt-16 md:pb-12 text-center bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: December 2025
          </p>
        </div>
      </motion.section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-8"
        >
          {/* Introduction */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At ByDrive, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our car rental platform.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                Personal identification information (name, email address, phone
                number)
              </li>
              <li>
                Driver's license information and identification documents
              </li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Rental history and preferences</li>
              <li>Communication records with our customer service</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Process and manage your vehicle rentals</li>
              <li>Verify your identity and driver eligibility</li>
              <li>Process payments and prevent fraud</li>
              <li>Send booking confirmations and updates</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>
                Send promotional offers and newsletters (with your consent)
              </li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                Insurance providers for coverage verification and claims
                processing
              </li>
              <li>
                Payment processors for secure transaction handling
              </li>
              <li>
                Law enforcement when required by law or to protect our rights
              </li>
              <li>
                Third-party service providers who assist in our operations
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              We do not sell your personal information to third parties for
              marketing purposes.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. This includes
              encryption of sensitive data, secure servers, and regular security
              audits. However, no method of transmission over the Internet is
              100% secure.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              5. Cookies and Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your
              browsing experience, analyze site traffic, and personalize
              content. You can control cookie preferences through your browser
              settings. For more details, please see our Cookie Policy.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              7. Data Retention
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your personal information for as long as your account is
              active or as needed to provide our services. We may retain certain
              information for longer periods as required by law or for
              legitimate business purposes such as resolving disputes and
              enforcing our agreements.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              8. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy or wish to
              exercise your rights, please contact us:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@bydrive.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> 123 Drive Street, Car City, CC 12345
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default PrivacyPage;
