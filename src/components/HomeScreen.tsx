"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ChevronDown, 
  Code2, 
  Database, 
  Cloud, 
  Zap, 
  Users, 
  TrendingUp,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MessageCircleMore,
  
  Play,
//   Star,
//   CheckCircle,
//   Globe,
//   Server,
//   Layers,
//   Shield
} from "lucide-react";
import Link from "next/link";

export default function HomeScreen() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentService, setCurrentService] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Backend Development",
      description: "Scalable Python & Django applications",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Engineering",
      description: "Real-time data pipelines & analytics",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "DevOps & Cloud",
      description: "AWS infrastructure & CI/CD optimization",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Leadership",
      description: "Technical mentorship & project management",
      gradient: "from-orange-500 to-red-500"
    }
  ];
  
  <div className="text-center text-white text-xl my-10">
  {services[currentService].title}
</div>

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);



  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const stats = [
    { number: "4+", label: "Years Experience", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "5M+", label: "Data Points Daily", icon: <Database className="w-6 h-6" /> },
    { number: "30%", label: "Performance Boost", icon: <Zap className="w-6 h-6" /> },
    { number: "40%", label: "Deployment Speed", icon: <Cloud className="w-6 h-6" /> }
  ];

  const techStack = [
    { name: "Python", color: "bg-yellow-500" },
    { name: "Django", color: "bg-green-600" },
    { name: "FastAPI", color: "bg-teal-500" },
    { name: "PostgreSQL", color: "bg-blue-600" },
    { name: "Redis", color: "bg-red-500" },
    { name: "Docker", color: "bg-blue-500" },
    { name: "AWS", color: "bg-orange-500" },
    { name: "MongoDB", color: "bg-green-500" }
  ];

  const projects = [
    {
      title: "Twiscope Analytics Platform",
      description: "Real-time OSINT data analytics processing 2M+ daily data points with ML integration",
      tech: ["Python", "Django", "PostgreSQL", "Redis", "ML"],
      metrics: "2M+ daily data points",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      title: "Cloud Infrastructure Optimization",
      description: "DevOps solutions reducing deployment time by 40% with automated CI/CD pipelines",
      tech: ["AWS", "Docker", "CI/CD", "Linux"],
      metrics: "40% faster deployments",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "Scalable Backend Systems",
      description: "High-performance backend architecture handling 5M+ daily throughput",
      tech: ["FastAPI", "PostgreSQL", "Redis", "Nginx"],
      metrics: "5M+ daily throughput",
      gradient: "from-green-600 to-teal-600"
    }
  ];

  return (
    <div className="relative bg-slate-950 text-white min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 opacity-40">
        <div 
          className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl transition-all duration-700 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-green-500/15 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-6"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Main Title */}
            <motion.div className="relative">
              <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  Building
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Tomorrow&apos;s
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Systems
                </span>
              </motion.h1>
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 blur-3xl -z-10" />
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-slate-300 font-light max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Senior Software Engineer & Team Lead crafting 
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> scalable backend solutions </span>
              that power the next generation of applications
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
<Link href="/portfolio">
  <motion.button
    className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="relative z-10 flex items-center gap-3">
      View My Work
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
  </motion.button>
</Link>


<Link href="/about" passHref>
  <motion.button
    className="group flex items-center gap-3 border-2 border-slate-600 hover:border-purple-500 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-purple-500/10"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Play className="w-5 h-5 group-hover:animate-pulse" />
    Who am I?
  </motion.button>
</Link>

{/* <Link href="/about">
  <motion.button
    className="group flex items-center gap-3 border-2 border-slate-600 hover:border-purple-500 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-purple-500/10"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Play className="w-5 h-5 group-hover:animate-pulse" />
    Who am I?
  </motion.button>
</Link> */}

            </motion.div>
            

            {/* Social Links */}
            <motion.div 
              className="flex gap-6 justify-center pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {[
                { icon: <Github className="w-6 h-6" />, href: "https://github.com/Abdel-RahmanSaied", label: "GitHub" },
                { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/abdel-rahman-saied", label: "LinkedIn" },
                { icon: <Mail className="w-6 h-6" />, href: "mailto:abdelrahman.saied@asasit.com", label: "Email" },
                { icon: <MessageCircleMore className="w-6 h-6" />, href: "https://wa.me/966558046143", label: "WhatsApp" }

              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 rounded-full border border-white/20"
            >
              <ChevronDown className="w-6 h-6 text-white/60" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="relative z-10 py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-purple-400 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="relative z-10 py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              What I Do
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Specialized in building robust, scalable systems that drive business growth and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.gradient} mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section 
        className="relative z-10 py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Some of the impactful projects I&apos;ve led and contributed to
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-xs font-semibold mb-4`}>
                    {project.metrics}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIdx) => (
                      <span key={techIdx} className="px-2 py-1 text-xs bg-white/10 rounded-md text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group/btn">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Showcase */}
      <motion.section 
        className="relative z-10 py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Technologies I Master
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-3 h-3 rounded-full ${tech.color}`} />
                <span className="text-white font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="relative z-10 py-32 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how I can help scale your backend systems and lead your development initiatives to success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/lets-talk">

  <motion.button
    className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="flex items-center gap-3">
      Let&apos;s Talk
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </span>
  </motion.button>
</Link>
                
<Link href="/portfolio">
  <motion.button
    className="group border-2 border-slate-600 hover:border-purple-500 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-purple-500/10"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    View Portfolio
  </motion.button>
</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}