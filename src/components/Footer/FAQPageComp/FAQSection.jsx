import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "What are my extra costs (overheads) when I rent a car?",
    answer:
      'When you rent a car, the advertised daily rate is often just the starting point. Various additional costs, or "overheads," can significantly increase your final bill. It\'s crucial to be aware of these potential fees to budget accurately and avoid surprises.',
  },
  {
    id: 2,
    question: "Can I rent a car with cryptocurrency?",
    answer:
      "Yes, it is possible to rent a car with cryptocurrency, but it's not yet a mainstream option offered by major, international rental companies like Hertz, Avis, or Enterprise. Instead, you'll find this payment method available primarily through smaller, independent rental services and platforms that specialize in crypto payments.",
  },
  {
    id: 3,
    question: "Do I need to pay a security deposit to rent a car?",
    answer:
      'The security deposit is not a charge you pay upfront, but rather a "hold" or "pre-authorization" on your credit or debit card for a specific amount of money. This means the funds are reserved and not available for your use, but they are not actually debited from your account unless necessary.',
  },
  {
    id: 4,
    question: "Can I rent a car without a credit card?",
    answer:
      "This is the most common and widely accepted alternative to a credit card. However, there are often stricter rules and additional requirements when using a debit card, which can vary by company and even by location.",
  },
  {
    id: 5,
    question: "How do I rent a car through ByDrive?",
    answer:
      "Renting a car through ByDrive is simple - visit our website or app, choose your location, filter as per your requirement and budget, compare cars and prices, and book directly with the dealer. Whether you're looking for cheap car rentals in Dubai or luxury cars, you'll find everything in one place.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(1);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                <button
                  onClick={() => toggleOpen(item.id)}
                  className="w-full px-6 py-5 text-left font-semibold text-gray-900 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
                >
                  <span className="text-base md:text-lg">{item.question}</span>
                  <motion.div
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openId === item.id ? "auto" : 0,
                    opacity: openId === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
