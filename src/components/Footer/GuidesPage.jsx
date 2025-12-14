import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Car, CreditCard, Shield, Clock, MapPin } from "lucide-react";

const guides = [
  {
    icon: Car,
    title: "How to Rent a Car",
    description: "Step-by-step guide to booking your perfect vehicle",
    steps: [
      "Browse our car collection and select your preferred vehicle",
      "Choose your rental dates and pickup/dropoff locations",
      "Fill in your details and complete the booking",
      "Pick up your car at the designated location with your ID",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment Methods",
    description: "Accepted payment options and billing information",
    steps: [
      "We accept all major credit and debit cards",
      "A security deposit is held and released upon return",
      "Full payment is processed at the time of booking",
      "Receipts are sent automatically to your email",
    ],
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description: "Understanding your protection options",
    steps: [
      "Basic insurance is included with every rental",
      "Collision Damage Waiver (CDW) reduces your liability",
      "Personal Accident Insurance covers driver and passengers",
      "Theft Protection provides coverage against vehicle theft",
    ],
  },
  {
    icon: Clock,
    title: "Rental Duration & Extensions",
    description: "Managing your rental period",
    steps: [
      "Minimum rental period is 24 hours",
      "Extensions can be requested through your account",
      "Contact us at least 4 hours before your return time",
      "Late returns may incur additional charges",
    ],
  },
  {
    icon: MapPin,
    title: "Pickup & Return",
    description: "Important information about vehicle handover",
    steps: [
      "Arrive on time at your chosen pickup location",
      "Bring your driver's license and booking confirmation",
      "Inspect the vehicle and note any existing damage",
      "Return with the same fuel level to avoid extra charges",
    ],
  },
  {
    icon: BookOpen,
    title: "Account Management",
    description: "Managing your ByDrive profile",
    steps: [
      "View and manage your bookings from your profile",
      "Update your personal information anytime",
      "Access your rental history and receipts",
      "Leave reviews for cars you've rented",
    ],
  },
];

function GuidesPage() {
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
            Support
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Rental Guides
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about renting with ByDrive
          </p>
        </div>
      </motion.section>

      {/* Guides Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <guide.icon className="w-6 h-6 text-gray-900" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {guide.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              <ul className="space-y-2">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-gray-900 text-white rounded-full text-xs flex items-center justify-center mt-0.5">
                      {stepIndex + 1}
                    </span>
                    <span className="text-sm text-gray-600">{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gray-50 rounded-2xl p-8 sm:p-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer service team is here to help you with any questions or
            concerns. Check our FAQ or get in touch directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/faq"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-200 rounded-full font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              View FAQ
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default GuidesPage;
