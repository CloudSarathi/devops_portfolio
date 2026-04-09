"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-40 pb-24">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-10
        bg-linear-to-r from-blue-500 to-indigo-500
        bg-clip-text text-transparent"
      >
        About Cloud Sarathi
      </motion.h1>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-12">
        {/* LEFT PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -8, rotate: 1 }}
          className="group relative p-8 rounded-2xl
          bg-white/60 dark:bg-white/10
          backdrop-blur-sm
          border border-gray-200 dark:border-white/20
          shadow-lg"
        >
          {/* Profile Image */}
          <div
            className="w-40 h-40 mx-auto rounded-full overflow-hidden
          ring-2 ring-gray-300 dark:ring-white/40 mb-6"
          >
            <Image
              src="/logo.png"
              alt="Cloud Sarathi"
              width={160}
              height={160}
              className="object-cover w-full h-full
              transition duration-500
              group-hover:scale-110"
            />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Cloud DevOps
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm">India</p>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Cloud Sarathi Tech Community
            </p>
          </div>

          <button
            className="mt-6 w-full py-2 rounded-xl
          bg-blue-500 hover:bg-blue-600
          text-white transition shadow-md"
          >
            Follow on GitHub
          </button>

          <button
            className="mt-4 w-full py-2 rounded-xl
          bg-[#78350F] hover:bg-[#92400E]
          text-white transition shadow-md"
          >
            Join Our Community
          </button>
        </motion.div>

        {/* RIGHT SIDE CONTENT */}
        <div className="md:col-span-2 space-y-10">
          {/* ABOUT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl
            bg-white/60 dark:bg-white/10
            backdrop-blur-sm
            border border-gray-200 dark:border-white/20
            shadow-md"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-semibold text-gray-900 dark:text-white">
                Cloud Sarathi Tech Community
              </span>{" "}
              is a growing DevOps and Cloud learning platform created for
              engineers who want to master modern infrastructure, automation,
              and scalable system design.
            </p>

            <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-300">
              <li>⚡ Real-world DevOps Projects</li>
              <li>⚙ Automation pipelines</li>
              <li>📘 DevOps learning resources</li>
              <li>🌍 Cloud architecture guides</li>
              <li>💡 Open source collaboration</li>
            </ul>
          </motion.div>

          {/* ACHIEVEMENTS */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Achievements
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: "50+", label: "Projects Completed" },
                { num: "15+", label: "Certifications" },
                { num: "100+", label: "Blog Posts" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 text-center rounded-xl
                  bg-white/60 dark:bg-white/10
                  backdrop-blur-sm
                  border border-gray-200 dark:border-white/20
                  shadow-sm"
                >
                  <h2 className="text-3xl font-bold text-blue-500">
                    {item.num}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl
            bg-white/60 dark:bg-white/10
            backdrop-blur-sm
            border border-gray-200 dark:border-white/20
            shadow-sm"
          >
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Specialized Skills
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                "Infrastructure as Code",
                "Kubernetes",
                "Docker",
                "AWS",
                "Terraform",
                "Jenkins",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1 text-sm rounded-full
                  bg-gray-200 dark:bg-white/20
                  border border-gray-300 dark:border-white/20
                  transition hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
