export default function AboutPage() {
  return (
    <main className="bg-gray-950 text-white min-h-screen px-6 py-20">
      <section className="max-w-5xl mx-auto space-y-20">

        {/* Title & Intro */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">About Me</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm Abdel-Rahman Mohamed Saied — Software Team Lead, Backend Specialist, and OSINT engineer
            with a passion for clean architecture, high-impact systems, and building teams that ship.
          </p>
        </div>

        {/* Why Me Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold">Why Work With Me?</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            I blend hands-on coding experience with system-level thinking.
            Whether it’s leading a dev team, architecting an OSINT pipeline,
            or launching a SaaS product — I build with performance and scalability in mind.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              "Python", "Django", "DRF", "FastAPI", "Node.js", "PostgreSQL",
              "Redis", "MongoDB", "Docker", "AWS", "Linux", "CI/CD", "GitHub Actions",
              "Celery", "Nginx", "Web Scraping", "SaaS Architecture"
            ].map((tech) => (
              <span
                key={tech}
                className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full border border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "10,000+ Influencers Tracked",
              desc: "Built an OSINT system analyzing data across X, Instagram, and TikTok with NLP clustering and smart alerts.",
            },
            {
              title: "4+ Years Leading Teams",
              desc: "Managed backend teams delivering scalable microservices and platforms across KSA and Egypt.",
            },
            {
              title: "SaaS System Architect",
              desc: "Designed end-to-end solutions powering subscription models, real-time dashboards, and secure APIs.",
            }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

{/* Journey Timeline */}
<div>
  <h2 className="text-2xl font-semibold mb-4">My Journey</h2>
  <div className="space-y-5 border-l border-gray-700 pl-4">
  <div>
      <p className="text-sm text-gray-500">2024 – Present</p>
      <p className="text-gray-300">
        Leading Twiscope, a real-time OSINT analytics platform handling 5M+ daily data points. Architected scalable microservices and mentored dev teams.
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-500">2023 – 2024</p>
      <p className="text-gray-300">
        Took on the role of Senior Python Developer at ASAS IT. Developed enterprise-grade backend systems and led complex deployments.
      </p>
    </div>

    <div>
      <p className="text-sm text-gray-500">2022 – 2023 "Contract Base"</p>
      <p className="text-gray-300">
        Worked with PCO on scalable backend systems and cloud-based platforms, enhancing performance and reliability.
      </p>
    </div>


    <div>
                <p className="text-sm text-gray-500">2022 – 2023</p>
                <p className="text-gray-300">
                  Built backend cloud systems at ClouDev-Solutions.
                </p>
      </div>


    <div>
      <p className="text-sm text-gray-500">2020 – 2022</p>
      <p className="text-gray-300">
        Led the development of robust desktop applications at Co-Source, focusing on clean architecture and user-friendly interfaces.
      </p>
    </div>




  </div>
</div>

        {/* Fun Facts */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Fun Facts</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>I train 5 times a week – discipline is my superpower.</li>
            <li>Gaming + hacking = best recharge combo 🎮💻</li>
            <li>Dark mode, terminal, espresso ☕ – perfect workspace.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}