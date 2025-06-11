"use client";

import { useState } from "react";
import { Github, ExternalLink, Code, Database, Globe, Smartphone } from "lucide-react";

type Project = {
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  github?: string;
  live?: string;
  category: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Twiscope",
    description:
      "A real-time OSINT analytics platform processing 5M+ data points daily. Includes real-time alerts, ML integration, and custom dashboards.",
    techStack: ["Python", "Django", "Celery", "Redis", "AWS"],
    // github: "https://github.com/Abdel-RahmanSaied",
    live: "https://twiscope.net/",
    category: "Analytics",
    featured: true,
    image: "https://twiscope-storage-s3.s3.me-south-1.amazonaws.com/assets/images/twiscope-logo.webp",
},
  {
    title: "Deep Linkup",
    description:
      "Modular ML API platform built with FastAPI, Kubernetes, and PostgreSQL. Supports 100K+ API calls/day.",
    techStack: ["FastAPI", "Django", "Kubernetes", "PostgreSQL"],
    category: "API Platform",
    featured: true,
    image: "https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2023/03/28045210/Generative-Adversarial-Networks-5.png",
  },
  {
    title: "Gymawy App",
    description:
      "Fitness mobile app for custom workout plans and real-time progress tracking, built with Flutter and DRF.",
    techStack: ["Flutter", "Django REST Framework", "Firebase"],
    category: "Mobile App",
    image: "https://i.pinimg.com/736x/2b/03/ce/2b03cec90b46e701a27369634d264336.jpg",
  },
];

const techIcons: Record<string, string> = {
  Python: "🐍",
  Django: "🎯",
  FastAPI: "⚡",
  Flutter: "📱",
  Kubernetes: "☸️",
  Redis: "🔴",
  AWS: "☁️",
  PostgreSQL: "🐘",
  Celery: "📊",
  Firebase: "🔥",
};

export default function PortfolioPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin [animation-duration:20s]"></div>
      </div>

      <div className="relative z-10 px-6 py-20">
        <section className="max-w-7xl mx-auto space-y-16">
          {/* Hero Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-purple-300 mb-4">
              <Code size={16} />
              <span>Senior Software Engineer</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences that merge cutting-edge technology with innovative design
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-2 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {filteredProjects.map((project, index) => (
              <article
                key={index}
                className={`group relative ${
                  project.featured ? "lg:col-span-8" : "lg:col-span-4"
                } ${filteredProjects.length === 1 ? "lg:col-span-12" : ""}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                aria-labelledby={`project-${index}`}
              >
                <div
                  className={`relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 ${
                    hoveredCard === index ? "transform -translate-y-2 shadow-2xl shadow-purple-500/20" : ""
                  }`}
                >
                  {/* Project Image */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="absolute inset-0 w-full h-full object-cover opacity-10"
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-6 right-6 z-10">
                      <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full text-xs text-yellow-300">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                          {project.category === "Analytics" && <Database size={20} />}
                          {project.category === "API Platform" && <Globe size={20} />}
                          {project.category === "Mobile App" && <Smartphone size={20} />}
                        </div>
                        <div>
                          <h2 id={`project-${index}`} className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                            {project.title}
                          </h2>
                          <span className="text-sm text-purple-300 font-medium">{project.category}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">{project.description}</p>
                    </div>

                    <div className="flex-1 mb-6">
                      <h3 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wider">Tech Stack</h3>
                      <div className="flex flex-wrap gap-3">
                        {project.techStack.map((tech) => (
                          <div
                            key={tech}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-medium text-white hover:bg-white/20 transition-all duration-300"
                          >
                            <span className="text-lg">{techIcons[tech] || "⚙️"}</span>
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 group/btn"
                        >
                          <Github size={18} className="group-hover/btn:rotate-12 transition-transform" />
                          <span className="font-medium">Source Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                        >
                          <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          <span className="font-medium">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
              { label: "Data Points Processed Daily", value: "5M+" },
              { label: "API Calls Handled Daily", value: "100K+" },
              { label: "Real-time Monitoring", value: "24/7" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}