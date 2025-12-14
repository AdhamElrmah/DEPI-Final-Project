import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function TermsPage() {
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
            Terms & Conditions
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
          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using the ByDrive car rental platform, you accept
              and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by these terms, please do
              not use this service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              2. Rental Agreement
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you rent a vehicle through ByDrive, you enter into a rental
              agreement that includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>The rental period as specified in your booking</li>
              <li>The agreed rental rate and any additional fees</li>
              <li>Insurance coverage terms and conditions</li>
              <li>Vehicle return requirements and location</li>
              <li>Fuel policy and mileage restrictions</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              3. Driver Requirements
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To rent a vehicle from ByDrive, the driver must:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Be at least 21 years of age (25 for luxury vehicles)</li>
              <li>Hold a valid driver's license for at least 2 years</li>
              <li>Provide a valid credit card in their name</li>
              <li>Present valid identification documents</li>
              <li>Not be under the influence of alcohol or drugs</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              4. Vehicle Use Restrictions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The rented vehicle may not be used for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Racing, speed testing, or any illegal activities</li>
              <li>Towing or pushing other vehicles</li>
              <li>Carrying passengers for hire (taxi/rideshare)</li>
              <li>Transportation of hazardous materials</li>
              <li>Off-road driving unless specifically authorized</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              5. Payment Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All rentals require a valid payment method. We accept major credit
              cards and debit cards. A security deposit may be held on your card
              and released upon vehicle return, subject to inspection. Late
              returns will incur additional daily charges at 150% of the regular
              rate.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              6. Cancellation Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Free cancellation is available up to 48 hours before your rental
              start time. Cancellations made within 48 hours may be subject to a
              cancellation fee equal to one day's rental. No-shows will be
              charged the full rental amount.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              7. Liability and Insurance
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Basic insurance coverage is included in all rentals. The renter is
              responsible for any damage not covered by insurance, including but
              not limited to damage caused by negligence, violation of terms, or
              driving under influence. Additional coverage options are available
              at checkout.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              8. Contact Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms & Conditions, please contact us
              at:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@bydrive.com
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

export default TermsPage;
