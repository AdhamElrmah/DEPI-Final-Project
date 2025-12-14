import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function CookiePolicyPage() {
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
            Cookie Policy
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
              What Are Cookies?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Cookies are small text files that are stored on your computer or
              mobile device when you visit our website. They help us provide you
              with a better experience by remembering your preferences,
              analyzing how you use our site, and enabling certain features.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              1. Types of Cookies We Use
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-gray-900 pl-4">
                <h3 className="font-semibold text-gray-900">
                  Essential Cookies
                </h3>
                <p className="text-gray-600">
                  These cookies are necessary for the website to function
                  properly. They enable core functionality such as security,
                  network management, and accessibility.
                </p>
              </div>

              <div className="border-l-4 border-gray-700 pl-4">
                <h3 className="font-semibold text-gray-900">
                  Performance Cookies
                </h3>
                <p className="text-gray-600">
                  These cookies collect information about how visitors use our
                  website, such as which pages are visited most often. This data
                  helps us improve the website's performance.
                </p>
              </div>

              <div className="border-l-4 border-gray-500 pl-4">
                <h3 className="font-semibold text-gray-900">
                  Functionality Cookies
                </h3>
                <p className="text-gray-600">
                  These cookies allow the website to remember choices you make
                  (such as your username, language, or region) and provide
                  enhanced, personalized features.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="font-semibold text-gray-900">
                  Targeting/Advertising Cookies
                </h3>
                <p className="text-gray-600">
                  These cookies are used to deliver advertisements more relevant
                  to you and your interests. They also limit the number of times
                  you see an advertisement.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              2. Cookies We Use
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cookie Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      session_id
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Maintains user session
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      auth_token
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Authentication token
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">7 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      preferences
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      User preferences
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">1 year</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      _analytics
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Site analytics
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              3. Managing Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can control and manage cookies in various ways. Please note
              that removing or blocking cookies may impact your experience on
              our website.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                <strong>Browser Settings:</strong> Most browsers allow you to
                refuse or accept cookies through their settings.
              </li>
              <li>
                <strong>Clear Cookies:</strong> You can delete cookies that have
                already been stored on your device.
              </li>
              <li>
                <strong>Private Browsing:</strong> Use private/incognito mode to
                limit cookie storage.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              4. Third-Party Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may use third-party services that set their own cookies, such
              as analytics providers and payment processors. We do not control
              the use of these cookies and recommend reviewing the privacy
              policies of these third parties.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              5. Updates to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Cookie Policy from time to time. Any changes
              will be posted on this page with an updated revision date. We
              encourage you to check this page periodically for the latest
              information on our cookie practices.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about our use of cookies, please contact
              us:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@bydrive.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default CookiePolicyPage;
