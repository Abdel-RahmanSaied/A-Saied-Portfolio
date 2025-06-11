import React from "react";

export default function LetsTalkPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Let&apos;s Talk
      </h1>
      <p className="text-lg text-slate-300 mb-10 max-w-xl text-center">
        Interested in working together? Drop me a message and I&apos;ll get back to you as soon as possible!
      </p>
      <a
        href="mailto:abdelrahman.saied@asasit.com"
        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
      >
        Send Email
      </a>
    </div>
  );
}