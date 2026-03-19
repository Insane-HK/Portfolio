import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Github, Linkedin, Mail, Terminal, Award, Users, Cloud, Brain, Database, Globe, Sparkles, Bot, Lightbulb, Zap, ExternalLink, Code2, Trophy, Briefcase, GraduationCap, Sun, Moon, Rocket, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import profilePic from './assets/profile.jpg';

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// --- CURSOR GLOW HOOK ---
function useMouseGlow(ref) {
  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [ref, handleMouseMove]);
}

// --- ANIMATED COUNTER ---
function AnimatedNumber({ value, duration = 1500 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{display.toFixed(1)}</span>;
}

// --- TYPING EFFECT ---
function TypeWriter({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1));
      }, isDeleting ? deleteSpeed : speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, textIndex, isDeleting, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className="gradient-text font-semibold">
      {displayText}
      <span className="ml-0.5 inline-block w-[2px] h-5 bg-blue-500 align-middle" style={{ animation: 'blink 1s step-end infinite' }} />
    </span>
  );
}

// --- PARTICLE FIELD BACKGROUND ---
function ParticleField({ darkMode }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: darkMode
              ? `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '139, 92, 246'}, ${Math.random() * 0.3 + 0.1})`
              : `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '139, 92, 246'}, ${Math.random() * 0.2 + 0.05})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme class to root
  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const dm = darkMode;

  return (
    <div className={`min-h-screen font-sans noise-overlay transition-colors duration-500 ${dm ? 'bg-[#050505] text-neutral-200' : 'bg-[#f5f5f7] text-neutral-800'}`}>
      <ParticleField darkMode={dm} />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
        ? dm
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-white/90 backdrop-blur-xl border-b border-black/[0.08] shadow-lg shadow-black/10'
        : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`font-bold tracking-tight flex items-center gap-2.5 cursor-pointer group ${dm ? 'text-white' : 'text-neutral-900'}`}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                <span className="text-white text-sm font-black">H</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full pulse-dot border-2 border-current" />
            </div>
            <span className="text-lg">Hitesh<span className="text-blue-400">.</span></span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className={`flex gap-1 text-sm font-medium rounded-full p-1 border ${dm ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-black/[0.04] border-black/[0.08]'}`}>
              <NavButton id="about" label="About" activeTab={activeTab} setActiveTab={setActiveTab} darkMode={dm} />
              <NavButton id="projects" label="Projects" activeTab={activeTab} setActiveTab={setActiveTab} darkMode={dm} />
            </div>
            {/* Dark / Light Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setDarkMode(!dm)}
              className={`p-2 rounded-full border transition-all duration-300 ${dm
                ? 'bg-white/[0.05] border-white/[0.1] text-yellow-300 hover:bg-white/[0.1]'
                : 'bg-black/[0.05] border-black/[0.1] text-violet-600 hover:bg-black/[0.1]'}`}
              title={dm ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {dm ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
          </motion.div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-24 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-20"
        >
          {/* Hero Header */}
          <section className="space-y-8">
            <motion.div variants={fadeInUp} className="flex flex-col-reverse md:flex-row justify-between items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-dot" />
                    Open to Opportunities
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${dm ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>
                    🎓 B.Tech CSE '27
                  </span>
                </div>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-[1.1] ${dm ? 'text-white' : 'text-neutral-900'}`}>
                  Hi, I'm{' '}
                  <span className="gradient-text">Hitesh</span>
                  <motion.span
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                    className="inline-block ml-2 origin-[70%_70%]"
                  >
                    👋
                  </motion.span>
                </h1>
                <div className={`text-lg md:text-xl mb-3 h-8 ${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  I build{' '}
                  <TypeWriter texts={['AI-Powered Apps', 'Web3 Platforms', 'Cloud Solutions', 'Trading Systems', 'Computer Vision']} />
                </div>
                <p className={`text-sm leading-relaxed max-w-lg mt-4 ${dm ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  Full Stack Developer &amp; Cloud Enthusiast from <span className={dm ? 'text-neutral-400' : 'text-neutral-700'}>Jaipur, India</span>.
                  Passionate about AI/ML, Web3, and building tech communities at <span className={dm ? 'text-neutral-400' : 'text-neutral-700'}>Poornima College of Engineering</span>.
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {['Beta MLSA', 'AWS Cloud Club Founder', 'Hack It Sapiens Organizer'].map(role => (
                    <span key={role} className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded border ${dm ? 'text-neutral-500 bg-white/[0.03] border-white/[0.06]' : 'text-neutral-500 bg-black/[0.03] border-black/[0.07]'}`}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Profile Visual */}
              <motion.div variants={scaleIn} className="relative group">
                <div className={`w-36 h-36 md:w-44 md:h-44 rounded-2xl border flex items-center justify-center overflow-hidden relative ${dm ? 'bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-cyan-500/20 border-white/[0.08]' : 'bg-gradient-to-br from-blue-100 via-violet-100 to-cyan-100 border-black/[0.08]'}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${dm ? 'from-blue-600/10 to-violet-600/10 group-hover:from-blue-600/20 group-hover:to-violet-600/20' : 'from-blue-400/10 to-violet-400/10 group-hover:from-blue-400/20 group-hover:to-violet-400/20'}`} />
                  <div className="z-10 w-full h-full p-1.5">
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover rounded-[14px] shadow-lg transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </div>
                <div className={`absolute -bottom-2 -right-2 px-3 py-1.5 border rounded-lg text-xs font-mono shadow-xl ${dm ? 'bg-[#0d0d0d] border-white/[0.08] text-neutral-400' : 'bg-white border-black/[0.08] text-neutral-500'}`}>
                  CGPA: <span className="text-emerald-500 font-bold"><AnimatedNumber value={8.0} /></span>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <SocialLink href="mailto:hiteshapn@gmail.com" icon={<Mail size={16} />} label="Email" darkMode={dm} />
              <SocialLink href="https://www.linkedin.com/in/hiteshkhatwani2005/" icon={<Linkedin size={16} />} label="LinkedIn" darkMode={dm} />
              <SocialLink href="https://github.com/Insane-Hk" icon={<Github size={16} />} label="GitHub" darkMode={dm} />
              
              <button
                onClick={() => {
                  setActiveTab('projects');
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all text-sm font-bold shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${dm
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-500/25 border border-emerald-400/30'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/30 border border-emerald-600/20'}`}
              >
                <Code2 size={16} />
                <span>Projects</span>
              </button>
            </motion.div>
          </section>

          {/* ✨ Opportunity Banner */}
          <motion.section variants={fadeInUp}>
            <OpportunityBanner darkMode={dm} />
          </motion.section>

          {/* Content Tabs */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === 'about' && <AboutSection key="about" darkMode={dm} />}
              {activeTab === 'projects' && <ProjectsSection key="projects" darkMode={dm} />}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 border-t py-10 ${dm ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-sm ${dm ? 'text-neutral-600' : 'text-neutral-400'}`}>© 2026 Hitesh Khatwani. Crafted with ❤️</p>
          <div className={`flex items-center gap-4 text-xs ${dm ? 'text-neutral-600' : 'text-neutral-400'}`}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-dot" />
              Available for opportunities
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- OPPORTUNITY BANNER ---
function OpportunityBanner({ darkMode: dm }) {
  const items = [
    { icon: '💼', title: 'Internships', desc: 'Open to SDE, ML, Cloud, or Web3 internship roles — remote or in-person.' },
    { icon: '🚀', title: 'Trainee / Trials', desc: 'Eager to join training programs, apprenticeships, or trial projects.' },
    { icon: '🤝', title: 'Collaborations', desc: 'Looking to co-build products, contribute to open source, or join hackathon squads.' },
  ];

  return (
    <div className={`rounded-2xl border overflow-hidden relative ${dm
      ? 'bg-gradient-to-br from-blue-500/[0.07] via-violet-500/[0.05] to-emerald-500/[0.07] border-blue-500/20'
      : 'bg-gradient-to-br from-blue-50 via-violet-50 to-emerald-50 border-blue-200'}`}>
      {/* Top bar */}
      <div className={`px-6 py-4 border-b flex items-center gap-3 ${dm ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
          <Rocket size={16} className="text-white" />
        </div>
        <div>
          <h2 className={`font-bold text-base ${dm ? 'text-white' : 'text-neutral-900'}`}>
            Open to Internships &amp; Trainee Roles
          </h2>
          <p className={`text-xs ${dm ? 'text-neutral-500' : 'text-neutral-500'}`}>
            Currently seeking opportunities to learn, grow, and contribute
          </p>
        </div>
        <div className="ml-auto px-3 py-1 bg-emerald-500/15 text-emerald-500 text-xs font-semibold rounded-full border border-emerald-500/25 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-dot" />
          Available Now
        </div>
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {items.map((item, i) => (
          <div key={item.title} className={`px-6 py-5 ${i < items.length - 1 ? (dm ? 'md:border-r border-white/[0.06]' : 'md:border-r border-black/[0.06]') : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{item.icon}</span>
              <span className={`font-semibold text-sm ${dm ? 'text-white' : 'text-neutral-800'}`}>{item.title}</span>
            </div>
            <p className={`text-xs leading-relaxed ${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className={`px-6 py-4 border-t flex flex-col sm:flex-row gap-3 ${dm ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
        <a
          href="mailto:hiteshapn@gmail.com"
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Mail size={14} />
          Reach Out via Email
        </a>
        <a
          href="https://www.linkedin.com/in/hiteshkhatwani2005/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all border hover:-translate-y-0.5 active:translate-y-0 ${dm
            ? 'bg-white/[0.04] border-white/[0.1] text-neutral-300 hover:bg-white/[0.08] hover:text-white'
            : 'bg-black/[0.04] border-black/[0.1] text-neutral-600 hover:bg-black/[0.07] hover:text-neutral-900'}`}
        >
          <Linkedin size={14} />
          Connect on LinkedIn
        </a>
      </div>
    </div>
  );
}

// --- SECTIONS ---

function AboutSection({ darkMode: dm }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-16"
    >
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard number="4+" label="Projects Shipped" icon="🚀" darkMode={dm} />
        <StatCard number="2" label="Certifications" icon="📜" darkMode={dm} />
        <StatCard number="5+" label="Communities Led" icon="👥" darkMode={dm} />
        <StatCard number="8.0" label="CGPA Score" icon="🎯" darkMode={dm} />
      </div>

      {/* Tech Stack */}
      <section className="space-y-6">
        <SectionHeader icon={<Code2 size={20} />} title="Tech Arsenal" subtitle="Technologies I work with" darkMode={dm} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <StackCard icon={<Terminal size={16} />} title="Languages" items={["C++", "Python", "JavaScript"]} color="blue" darkMode={dm} />
          <StackCard icon={<Globe size={16} />} title="Web & Backend" items={["Node.js", "Django", "React.js", "MongoDB", "Firebase"]} color="violet" darkMode={dm} />
          <StackCard icon={<Brain size={16} />} title="AI & Machine Learning" items={["TensorFlow", "OpenCV", "YOLOv8", "RAG", "LLM Orchestration"]} color="cyan" darkMode={dm} />
          <StackCard icon={<Cloud size={16} />} title="Cloud & Web3" items={["AWS", "Docker", "Git", "Solidity", "Ethers.js"]} color="emerald" darkMode={dm} />
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <SectionHeader icon={<Briefcase size={20} />} title="Experience" subtitle="Where I've worked" darkMode={dm} />
        <div className="space-y-4">
          <ExperienceCard
            date="Dec 2024 - Mar 2025"
            title="Web3 Community Associate"
            company="Unilend Finance"
            description="Conducted blockchain workshops and promoted decentralized finance solutions. Hosted technical sessions to engage student communities."
            tags={["Blockchain", "DeFi", "Community"]}
            color="violet"
            darkMode={dm}
          />
          <ExperienceCard
            date="Jul 2024 - Aug 2024"
            title="Frontend Developer Intern"
            company="Cynbit"
            description="Built responsive interfaces for tourism clients using React.js. Collaborated in a 3-member team to deliver production deployments within 10 days."
            tags={["React.js", "Frontend", "Production"]}
            color="blue"
            darkMode={dm}
          />
          <ExperienceCard
            date="Present"
            title="Community Leader"
            company="Campus Roles"
            description="Collage Convener at Indiginous (Jaipur). Beta MLSA conducting Microsoft tech workshops. Co-Organizer of 'Hack It Sapiens 2.0'. Founder of the college's first AWS Cloud Club."
            tags={["MLSA", "AWS", "Leadership"]}
            color="emerald"
            isActive
            darkMode={dm}
          />
        </div>
      </section>

      {/* Achievements */}
      <section className="space-y-6">
        <SectionHeader icon={<Trophy size={20} />} title="Achievements" subtitle="Recognition & certifications" darkMode={dm} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AchievementCard
            emoji="🏆"
            title="1st Prize - IdeaStorm"
            subtitle="IIT Roorkee"
            desc="Won among 30+ teams for the Smart Traffic Management System project."
            color="yellow"
            darkMode={dm}
          />
          <AchievementCard
            emoji="🥉"
            title="3rd Place - LNMHacks 8.0"
            subtitle="StreamStake20"
            desc="Awarded 3rd place for Web3 live stream betting platform."
            color="orange"
            darkMode={dm}
          />
          <AchievementCard
            emoji="📜"
            title="Certifications"
            subtitle="Red Hat & AWS"
            desc="RHCSA (Red Hat Certified System Admin) & AWS Certified Cloud Practitioner."
            color="blue"
            darkMode={dm}
          />
        </div>
      </section>
    </motion.div>
  );
}

function ProjectsSection({ darkMode: dm }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      <SectionHeader icon={<Database size={20} />} title="Selected Projects" subtitle="Things I've built" darkMode={dm} />

      <div className="grid gap-5">
        <ProjectCard
          title="CivicBridge AI"
          tech={["Amazon Bedrock", "RAG", "DynamoDB"]}
          description="AI platform to recommend government schemes. Implemented on-the-fly RAG extracting PDF data dynamically without vector DBs. Multilingual support."
          link="https://stream-stake20-eqh8.vercel.app/"
          color="blue"
          emoji="🏛️"
          darkMode={dm}
        />
        <ProjectCard
          title="StreamStake20"
          tech={["Web3", "OpenCV", "Solidity", "Node.js"]}
          description="Web3 live stream betting platform. Python CV pipeline extracts game state at ~2Hz to trigger automated bet resolution via Firebase and smart contracts."
          link="https://stream-stake20.vercel.app/"
          color="violet"
          emoji="🎮"
          badge="🥉 3rd Place"
          darkMode={dm}
        />
        <ProjectCard
          title="Bank Nifty Algo Trader"
          tech={["Python", "Full-stack", "Trading"]}
          description="Algorithmic trading dashboard to automate options strategies. Decoupled architecture using CSV-based communication for low-latency execution."
          link="https://bnf-algo-trader.onrender.com/"
          color="emerald"
          emoji="📈"
          darkMode={dm}
        />
        <ProjectCard
          title="Smart Traffic Management"
          tech={["Python", "YOLOv8", "OpenCV"]}
          description="Computer vision-based adaptive traffic control system. Achieved 95% accuracy in vehicle detection. Winner of IdeaStorm at IIT Roorkee."
          color="cyan"
          emoji="🚦"
          badge="🏆 1st Prize"
          darkMode={dm}
        />
      </div>
    </motion.div>
  );
}

// --- SHARED SUB-COMPONENTS ---

function SectionHeader({ icon, title, subtitle, darkMode: dm }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg border ${dm ? 'bg-white/[0.04] border-white/[0.06] text-neutral-400' : 'bg-black/[0.04] border-black/[0.06] text-neutral-500'}`}>
        {icon}
      </div>
      <div>
        <h2 className={`text-lg font-bold ${dm ? 'text-white' : 'text-neutral-900'}`}>{title}</h2>
        {subtitle && <p className={`text-xs ${dm ? 'text-neutral-500' : 'text-neutral-400'}`}>{subtitle}</p>}
      </div>
    </div>
  );
}

function StatCard({ number, label, icon, darkMode: dm }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      className={`rounded-xl p-4 text-center group cursor-default border transition-all duration-300 ${dm
        ? 'glass-card bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
        : 'bg-white border-black/[0.06] shadow-sm hover:shadow-md'}`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className={`text-2xl font-black mb-1 ${dm ? 'text-white' : 'text-neutral-900'}`}>{number}</div>
      <div className={`text-[11px] uppercase tracking-wider font-medium ${dm ? 'text-neutral-500' : 'text-neutral-400'}`}>{label}</div>
    </motion.div>
  );
}

function NavButton({ id, label, activeTab, setActiveTab, darkMode: dm }) {
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-1.5 rounded-full transition-all duration-300 text-sm ${activeTab === id
        ? dm
          ? 'bg-white text-black font-semibold shadow-lg shadow-white/10'
          : 'bg-neutral-900 text-white font-semibold shadow-lg shadow-black/10'
        : dm
          ? 'text-neutral-500 hover:text-neutral-300'
          : 'text-neutral-400 hover:text-neutral-700'
      }`}
    >
      {label}
    </button>
  );
}

function SocialLink({ href, icon, label, darkMode: dm }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-all text-sm hover:-translate-y-0.5 active:translate-y-0 font-medium ${dm
        ? 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.06] hover:border-white/[0.12] text-neutral-400 hover:text-white'
        : 'bg-white hover:bg-neutral-50 border-black/[0.08] hover:border-black/[0.15] text-neutral-500 hover:text-neutral-900 shadow-sm'}`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function StackCard({ title, items, icon, color, darkMode: dm }) {
  const colorMap = {
    blue: dm ? 'from-blue-500/10 border-blue-500/10 hover:border-blue-500/25' : 'from-blue-50 border-blue-100 hover:border-blue-300',
    violet: dm ? 'from-violet-500/10 border-violet-500/10 hover:border-violet-500/25' : 'from-violet-50 border-violet-100 hover:border-violet-300',
    cyan: dm ? 'from-cyan-500/10 border-cyan-500/10 hover:border-cyan-500/25' : 'from-cyan-50 border-cyan-100 hover:border-cyan-300',
    emerald: dm ? 'from-emerald-500/10 border-emerald-500/10 hover:border-emerald-500/25' : 'from-emerald-50 border-emerald-100 hover:border-emerald-300',
  };
  const textColorMap = {
    blue: 'text-blue-500',
    violet: 'text-violet-500',
    cyan: 'text-cyan-500',
    emerald: 'text-emerald-500',
  };
  const badgeColorMap = {
    blue: dm ? 'bg-blue-500/[0.08] border-blue-500/20 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-600',
    violet: dm ? 'bg-violet-500/[0.08] border-violet-500/20 text-violet-300' : 'bg-violet-50 border-violet-200 text-violet-600',
    cyan: dm ? 'bg-cyan-500/[0.08] border-cyan-500/20 text-cyan-300' : 'bg-cyan-50 border-cyan-200 text-cyan-600',
    emerald: dm ? 'bg-emerald-500/[0.08] border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-600',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`p-4 rounded-xl bg-gradient-to-br ${colorMap[color]} to-transparent border transition-all duration-300`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={textColorMap[color]}>{icon}</span>
        <span className={`text-sm font-semibold ${dm ? 'text-neutral-300' : 'text-neutral-700'}`}>{title}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={`text-xs px-2.5 py-1 rounded-md border ${badgeColorMap[color]} font-mono`}>
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ExperienceCard({ date, title, company, description, tags, color, isActive, darkMode: dm }) {
  const borderMap = {
    blue: 'border-l-blue-500',
    violet: 'border-l-violet-500',
    emerald: 'border-l-emerald-500',
  };
  const tagColorMap = {
    blue: dm ? 'bg-blue-500/[0.08] text-blue-400' : 'bg-blue-50 text-blue-600',
    violet: dm ? 'bg-violet-500/[0.08] text-violet-400' : 'bg-violet-50 text-violet-600',
    emerald: dm ? 'bg-emerald-500/[0.08] text-emerald-400' : 'bg-emerald-50 text-emerald-600',
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className={`rounded-xl p-5 border-l-2 ${borderMap[color]} relative group transition-all ${dm
        ? 'glass-card bg-white/[0.02] border border-white/[0.06]'
        : 'bg-white border border-black/[0.06] shadow-sm hover:shadow-md'}`}
    >
      {isActive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-dot" />
          <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">Current</span>
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-mono px-2 py-0.5 rounded ${dm ? 'text-neutral-500 bg-white/[0.03]' : 'text-neutral-400 bg-black/[0.04]'}`}>{date}</span>
      </div>
      <h3 className={`font-bold text-base mb-0.5 ${dm ? 'text-white' : 'text-neutral-900'}`}>{title}</h3>
      <p className={`text-sm font-medium mb-2 ${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>{company}</p>
      <p className={`text-sm leading-relaxed mb-3 ${dm ? 'text-neutral-500' : 'text-neutral-500'}`}>{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-md ${tagColorMap[color]} font-medium`}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function AchievementCard({ emoji, title, subtitle, desc, color, darkMode: dm }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      className={`rounded-xl p-5 group cursor-default border transition-all ${dm
        ? 'glass-card bg-white/[0.02] border-white/[0.06]'
        : 'bg-white border-black/[0.06] shadow-sm hover:shadow-md'}`}
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className={`font-bold text-sm mb-1 ${dm ? 'text-white' : 'text-neutral-900'}`}>{title}</h3>
      <p className={`text-xs mb-2 font-medium ${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>{subtitle}</p>
      <p className={`text-xs leading-relaxed ${dm ? 'text-neutral-500' : 'text-neutral-500'}`}>{desc}</p>
    </motion.div>
  );
}

function ProjectCard({ title, tech, description, link, color, emoji, badge, darkMode: dm }) {
  const cardRef = useRef(null);
  useMouseGlow(cardRef);

  const colorMap = {
    blue: 'group-hover:text-blue-500',
    violet: 'group-hover:text-violet-500',
    cyan: 'group-hover:text-cyan-500',
    emerald: 'group-hover:text-emerald-500',
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -3 }}
      className={`group glow-hover rounded-2xl p-6 relative overflow-hidden border transition-all ${dm
        ? 'glass-card bg-white/[0.02] border-white/[0.06]'
        : 'bg-white border-black/[0.06] shadow-sm hover:shadow-xl'}`}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <div>
              <h3 className={`font-bold text-lg transition-colors ${colorMap[color]} ${dm ? 'text-white' : 'text-neutral-900'}`}>
                {link ? <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">{title}</a> : title}
              </h3>
              {badge && (
                <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded font-semibold mt-1 inline-block border border-amber-500/20">
                  {badge}
                </span>
              )}
            </div>
          </div>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg border transition-all ${dm ? 'bg-white/[0.03] text-neutral-600 hover:text-white hover:bg-white/[0.06] border-white/[0.06]' : 'bg-black/[0.03] text-neutral-400 hover:text-neutral-900 hover:bg-black/[0.06] border-black/[0.06]'}`}>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
        <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-neutral-400' : 'text-neutral-500'}`}>{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className={`text-[11px] px-2.5 py-1 rounded-md border font-mono ${dm ? 'bg-white/[0.04] text-neutral-400 border-white/[0.06]' : 'bg-black/[0.03] text-neutral-500 border-black/[0.07]'}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
