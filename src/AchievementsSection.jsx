import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Cloud, Terminal, Shield, Database } from 'lucide-react';

export default function AchievementsSection({ darkMode: dm }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-24 pt-8"
    >
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-end justify-between gap-8">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-50" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)' }}></div>
        <div className="max-w-2xl relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-blue-500 mb-4 block font-bold">Collection_Archive // 001</span>
          <h1 className={`text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 ${dm ? 'text-white' : 'text-neutral-900'}`}>
            THE HALL OF FAME
          </h1>
          <p className={`text-lg leading-relaxed max-w-lg ${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>
            A curated documentation of milestone victories, technical mastery, and global impact metrics. Accessing encrypted legacy data...
          </p>
        </div>
        <div className="flex gap-4 mb-2 relative z-10">
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-500">42</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">Total Badges</div>
          </div>
          <div className={`w-px h-12 self-center ${dm ? 'bg-white/10' : 'bg-black/10'}`}></div>
          <div className="text-right">
            <div className="text-3xl font-bold text-cyan-500">08</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">World Rank</div>
          </div>
        </div>
      </section>

      {/* Trophy Case: Bento Grid */}
      <section>
        <div className="flex items-center gap-4 mb-12">
          <div className={`h-px flex-grow ${dm ? 'bg-white/10' : 'bg-black/10'}`}></div>
          <h2 className={`text-2xl font-black uppercase tracking-widest ${dm ? 'text-white' : 'text-neutral-900'}`}>Major Victories</h2>
          <div className="h-px w-12 bg-blue-500/40"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[450px]">
          {/* Main Win */}
          <div className={`md:col-span-7 rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-500 border group ${dm ? 'bg-white/[0.02] border-white/[0.06] hover:shadow-[0_0_50px_rgba(59,130,246,0.05)]' : 'bg-white border-black/[0.06] hover:shadow-xl'}`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-blue-500/20">
                <Trophy size={14} /> 1st Place
              </span>
              <h3 className={`text-4xl md:text-5xl font-black tracking-tight mb-4 transition-colors ${dm ? 'text-white group-hover:text-blue-400' : 'text-neutral-900 group-hover:text-blue-600'}`}>IdeaStorm '23</h3>
              <p className={`max-w-md leading-relaxed ${dm ? 'text-neutral-400' : 'text-neutral-600'}`}>Pioneered a decentralized governance model for smart cities, securing top honors among 500+ participants globally.</p>
            </div>
            <div className="mt-12 flex items-center justify-between relative z-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Issued by IIT Roorkee</div>
            </div>
          </div>
          
          {/* Secondary Wins */}
          <div className="md:col-span-5 grid grid-rows-2 gap-6">
            <div className={`border rounded-2xl p-8 transition-colors group flex flex-col justify-center ${dm ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]' : 'bg-white border-black/[0.06] hover:bg-neutral-50'}`}>
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full text-[10px] font-bold tracking-widest uppercase border border-cyan-500/20">
                  3rd Runner Up
                </span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 transition-colors ${dm ? 'text-white group-hover:text-cyan-400' : 'text-neutral-900 group-hover:text-cyan-600'}`}>LNMHacks 8.0</h3>
              <p className={`text-sm ${dm ? 'text-neutral-400' : 'text-neutral-600'}`}>Built an AI-driven triage system for emergency response in 36 hours.</p>
            </div>
            <div className={`border rounded-2xl p-8 transition-colors group flex flex-col justify-center ${dm ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]' : 'bg-white border-black/[0.06] hover:bg-neutral-50'}`}>
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full text-[10px] font-bold tracking-widest uppercase border border-violet-500/20">
                  Finalist
                </span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 transition-colors ${dm ? 'text-white group-hover:text-violet-400' : 'text-neutral-900 group-hover:text-violet-600'}`}>Smart India Hackathon</h3>
              <p className={`text-sm ${dm ? 'text-neutral-400' : 'text-neutral-600'}`}>Top 10 national finalist for the Ministry of Education's digital initiative.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          {val: '05+', label: 'Communities Led', color: 'border-blue-500 text-blue-500'}, 
          {val: '300+', label: 'Students Mentored', color: 'border-cyan-500 text-cyan-500'},
          {val: '50+', label: 'Events Managed', color: 'border-violet-500 text-violet-500'},
          {val: '15k+', label: 'Lines of Code', color: 'border-emerald-500 text-emerald-500'}
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl border-b-2 border-r border-t border-l ${stat.color} ${dm ? 'bg-white/[0.01]' : 'bg-white shadow-sm'}`}>
            <div className={`text-3xl md:text-4xl font-black mb-2 ${dm ? 'text-white' : 'text-neutral-900'}`}>{stat.val}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section>
        <div className="flex items-center gap-4 mb-12">
          <h2 className={`text-2xl font-black uppercase tracking-widest ${dm ? 'text-white' : 'text-neutral-900'}`}>Technical Credentials</h2>
          <div className={`h-px flex-grow ${dm ? 'bg-white/10' : 'bg-black/10'}`}></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CertCard icon={<Cloud size={32} strokeWidth={1.5} />} title="AWS Certified" sub="Solutions Architect" id="AWS-SEC-4921" color="blue" dm={dm} />
          <CertCard icon={<Terminal size={32} strokeWidth={1.5} />} title="Red Hat" sub="Enterprise Specialist" id="RH-990-210" color="cyan" dm={dm} />
          <CertCard icon={<Shield size={32} strokeWidth={1.5} />} title="CompTIA Security+" sub="Cyber Defense" id="SEC-PL-8821" color="violet" dm={dm} />
          <CertCard icon={<Database size={32} strokeWidth={1.5} />} title="Google Cloud" sub="Professional Developer" id="GCP-DEV-0012" color="emerald" dm={dm} />
        </div>
      </section>
    </motion.div>
  );
}

function CertCard({ icon, title, sub, id, color, dm }) {
  const colorClasses = {
    blue: { text: "text-blue-500", bg: "bg-blue-500/20", border: "border-blue-500/20", hover: "hover:border-blue-500/40" },
    cyan: { text: "text-cyan-500", bg: "bg-cyan-500/20", border: "border-cyan-500/20", hover: "hover:border-cyan-500/40" },
    violet: { text: "text-violet-500", bg: "bg-violet-500/20", border: "border-violet-500/20", hover: "hover:border-violet-500/40" },
    emerald: { text: "text-emerald-500", bg: "bg-emerald-500/20", border: "border-emerald-500/20", hover: "hover:border-emerald-500/40" }
  };
  const c = colorClasses[color];

  return (
    <div className={`group rounded-2xl p-1 border transition-all ${dm ? `bg-white/[0.01] border-white/[0.04] ${c.hover}` : `bg-white border-black/[0.06] shadow-sm hover:shadow-md`}`}>
      <div className={`p-8 rounded-[calc(1rem-1px)] h-full text-center flex flex-col items-center border ${dm ? 'bg-white/[0.02] border-white/[0.02]' : 'bg-neutral-50/50 border-white'}`}>
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className={`absolute inset-0 ${c.bg} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          <div className={`relative w-full h-full rounded-full border ${c.border} flex items-center justify-center ${dm ? 'bg-white/[0.03]' : 'bg-white shadow-sm'}`}>
            <span className={c.text}>{icon}</span>
          </div>
        </div>
        <h4 className={`font-bold text-lg mb-1 ${dm ? 'text-white' : 'text-neutral-900'}`}>{title}</h4>
        <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>{sub}</p>
        <div className={`mt-auto pt-4 border-t w-full text-[10px] font-mono ${dm ? 'border-white/10 text-neutral-500' : 'border-black/10 text-neutral-400'}`}>ID: {id}</div>
      </div>
    </div>
  );
}
