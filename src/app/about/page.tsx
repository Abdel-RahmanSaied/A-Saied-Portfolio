"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  Briefcase, 
  Code, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Star,
  ArrowRight,
  Zap,
  Target,
  Users,
  TrendingUp,
  Download,
  Send
} from "lucide-react";

import Link from "next/link";

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const timelineData = [
    {
      date: "2024 – Present",
      title: "Senior Software Engineer – Software Team Lead",
      company: "ASAS IT",
      icon: <Users className="w-5 h-5" />,
      gradient: "from-purple-500 to-pink-500",
      details: [
        "Led development of Twiscope, processing 2M+ daily data points",
        "Architected scalable backend with real-time pipelines",
        "Integrated ML models for trend prediction",
        "Optimized performance: 25% latency reduction, 5M+ daily throughput",
        "Enhanced team performance and platform security",
        "Improved user engagement through stakeholder collaboration"
      ]
    },
    {
      date: "2023 – 2024",
      title: "Senior Software Engineer – Python Developer",
      company: "ASAS IT",
      icon: <Code className="w-5 h-5" />,
      gradient: "from-blue-500 to-cyan-500",
      details: [
        "Led advanced Python application development",
        "Aligned technical direction with business objectives"
      ]
    },
    {
      date: "2022 – 2023",
      title: "Software Engineer – Backend Developer",
      company: "ClouDev-Solutions",
      icon: <Zap className="w-5 h-5" />,
      gradient: "from-green-500 to-emerald-500",
      details: [
        "Enhanced cloud-based systems and workflows",
        "Reduced downtimes through proactive maintenance"
      ]
    },
    {
      date: "2022 – 2023",
      title: "Software Engineer",
      company: "Prime Consulting Office (PCO)",
      icon: <Target className="w-5 h-5" />,
      gradient: "from-orange-500 to-red-500",
      details: [
        "Built tailored client solutions for operational efficiency",
        "Applied modern development methodologies"
      ]
    },
    {
      date: "2020 – 2022",
      title: "Software Engineer – Desktop Application Developer",
      company: "Co-Source",
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: "from-indigo-500 to-purple-500",
      details: [
        "Led end-to-end desktop application development",
        "Delivered complete SDLC from planning to deployment"
      ]
    }
  ];

  const techStack = [
    { name: "Python", level: 95 },
    { name: "Django", level: 90 },
    { name: "DRF", level: 88 },
    { name: "FastAPI", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "PostgreSQL", level: 85 },
    { name: "Redis", level: 82 },
    { name: "MongoDB", level: 78 },
    { name: "Docker", level: 88 },
    { name: "AWS", level: 85 },
    { name: "Linux", level: 90 },
    { name: "CI/CD", level: 87 },
    { name: "GitHub Actions", level: 85 },
    { name: "Celery", level: 80 },
    { name: "Nginx", level: 83 }
  ];

  const achievements = [
    { icon: <TrendingUp className="w-6 h-6" />, value: "30%", label: "Performance Improvement" },
    { icon: <Zap className="w-6 h-6" />, value: "40%", label: "Deployment Time Reduction" },
    { icon: <Target className="w-6 h-6" />, value: "5M+", label: "Daily Data Points" },
    { icon: <Star className="w-6 h-6" />, value: "4+", label: "Years Experience" }
  ];

  return (
    <div className="relative bg-slate-950 text-white min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <main className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-32">

          {/* Hero Section */}
          <motion.section 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Who Am I?
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-2xl -z-10 rounded-full" />
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              I'm <span className="font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Abdel-Rahman Mohamed Saied</span> — 
              Software Team Lead & Senior Software Engineer specializing in building scalable systems and leading impactful teams.
            </motion.p>

            {/* Achievement Cards */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-purple-400 mb-3 flex justify-center">
                    {achievement.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{achievement.value}</div>
                  <div className="text-sm text-slate-400">{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Professional Summary */}
          <motion.section
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Professional Summary
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                With over 4 years of experience in the software industry, I specialize in building scalable, robust backend systems using Python and Django. 
                I have successfully led the development of critical applications, improving system performance by up to 30%. My expertise in DevOps and cloud 
                technologies has optimized CI/CD pipelines, reducing deployment time by 40%. As a team lead, I focus on aligning development practices with 
                organizational goals, ensuring smooth project execution and improved system reliability.
              </p>
            </div>
          </motion.section>

          {/* Tech Stack with Progress Bars */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Tech Stack & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-white">{tech.name}</span>
                    <span className="text-sm text-purple-400">{tech.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.5, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Experience Timeline */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Professional Journey
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 opacity-50" />
              
              {timelineData.map((entry, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} mb-16`}
                    initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.8 }}
                  >
                    <div className={`w-full max-w-md ${isLeft ? 'pr-8' : 'pl-8'}`}>
                      <motion.div
                        className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${entry.gradient}`}>
                            {entry.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-lg">{entry.title}</h3>
                            <p className="text-purple-400 font-semibold">{entry.company}</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">{entry.date}</p>
                        <ul className="space-y-2">
                          {entry.details.map((detail, i) => (
                            <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                              <ArrowRight className="w-3 h-3 text-purple-400 mt-1 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full border-4 border-slate-950 z-10" />
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Why Work With Me */}
          <motion.section
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-500/20">
              <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Why Work With Me?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  "Proven ability to lead high-impact projects and drive results under tight deadlines",
                  "Strong balance between technical excellence and team mentorship",
                  "Deep experience with scalable systems, modern DevOps, and cloud infrastructure",
                  "Strategic thinker with a hands-on approach to building meaningful software products"
                ].map((point, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-slate-300">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Education
                </h2>
              </div>
              <div className="pl-4 border-l-2 border-emerald-500/50">
                <h3 className="text-xl font-semibold text-white mb-2">Bachelor's Degree in Computer Science</h3>
                <p className="text-emerald-400 font-medium mb-2">Higher Technological Institute</p>
                <p className="text-slate-300">Graduated with an A+ in final project and overall good grade</p>
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            className="text-center relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Let's Connect
                </h2>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                  I'm open to freelance opportunities, collaborations, or just a good tech talk!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  {/* <motion.a
                    href="mailto:abdelrahman.saied@asasit.com"
                    className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5" />
                    Email Me
                  </motion.a> */}

                  {/* Final Section: Download CV + Get in Touch */}
          <motion.section
            className="text-center relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Link href="/lets-talk">
                <motion.button
                  className="group flex items-center gap-3 border-2 border-slate-600 hover:border-purple-500 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-purple-500/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 group-hover:animate-pulse" />
                  Get in Touch
                </motion.button>
              </Link>
              <motion.a
                href="/assets/Abdelrahman_Saied_resume.pdf"
                download={true}
                className="group flex items-center gap-3 border-2 border-slate-600 hover:border-purple-500 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-purple-500/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download CV
              </motion.a>
            </div>
          </motion.section>
                  
                  <motion.a
                    href="https://www.linkedin.com/in/abdel-rahman-saied"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </motion.a>

                  
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  );
}