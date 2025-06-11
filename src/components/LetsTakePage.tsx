import React from "react";

export default function LetsTakePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Let’s Take The Next Step Together
        </h1>
        <p className="text-lg text-slate-300">
          Whether you're looking to build a high-performing backend system, craft a scalable architecture,
          or need guidance for your development team — I'm here to help you achieve your goals.
        </p>

        <div className="mt-12 space-y-6">
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 shadow-lg"
          >
            Contact Me
          </a>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-10">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl max-w-sm w-full backdrop-blur-lg">
              <h3 className="text-2xl font-bold mb-2 text-purple-400">Available For</h3>
              <ul className="list-disc list-inside text-slate-300 text-left">
                <li>Freelance Projects</li>
                <li>Team Consultation</li>
                <li>Architecture Reviews</li>
                <li>Speaking Engagements</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl max-w-sm w-full backdrop-blur-lg">
              <h3 className="text-2xl font-bold mb-2 text-purple-400">Let’s Collaborate On</h3>
              <ul className="list-disc list-inside text-slate-300 text-left">
                <li>AI-Powered Platforms</li>
                <li>Real-time Dashboards</li>
                <li>Data-Driven Applications</li>
                <li>Developer Experience Tooling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}