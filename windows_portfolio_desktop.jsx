import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  FileText,
  Mail,
  User,
  Briefcase,
  Music,
  Github,
  Linkedin,
  Globe,
  Search,
  Wifi,
  Volume2,
  BatteryFull,
  Power,
  Minimize2,
  Maximize2,
  X,
  Image as ImageIcon,
  Computer,
  HelpCircle,
} from "lucide-react";

const PROFILE = {
  name: "Abdurrachman Azis",
  role: "Frontend / Portfolio Designer",
  email: "abdurrachman.azis@example.com",
  location: "Jakarta, Indonesia",
  website: "https://yourdomain.com",
  github: "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
};

const shortcuts = [
  { id: "about", label: "My Computer", icon: Computer, x: 28, y: 24 },
  { id: "projects", label: "Projects", icon: Folder, x: 28, y: 128 },
  { id: "resume", label: "Resume.txt", icon: FileText, x: 28, y: 232 },
  { id: "contact", label: "Contact", icon: Mail, x: 28, y: 336 },
  { id: "gallery", label: "Portfolio Pics", icon: ImageIcon, x: 128, y: 24 },
  { id: "music", label: "CD Player", icon: Music, x: 128, y: 128 },
];

const windowMeta = {
  about: { title: "My Computer - About", icon: Computer, size: { w: 620, h: 400 } },
  projects: { title: "Projects", icon: Folder, size: { w: 760, h: 500 } },
  resume: { title: "Resume.txt - Notepad", icon: FileText, size: { w: 650, h: 470 } },
  contact: { title: "Contact", icon: Mail, size: { w: 560, h: 420 } },
  gallery: { title: "Portfolio Pics", icon: ImageIcon, size: { w: 700, h: 450 } },
  music: { title: "CD Player", icon: Music, size: { w: 480, h: 320 } },
};

const bevelOut = "border-t-white border-l-white border-r-[#404040] border-b-[#404040]";
const bevelIn = "border-t-[#404040] border-l-[#404040] border-r-white border-b-white";
const font98 = { fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif" };

function Win98Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`border-2 ${bevelOut} bg-[#c0c0c0] px-3 py-1 text-[12px] text-black active:border-t-[#404040] active:border-l-[#404040] active:border-r-white active:border-b-white ${className}`}
    >
      {children}
    </button>
  );
}

function DesktopIcon({ item, onOpen }) {
  const Icon = item.icon;
  return (
    <motion.button
      drag
      dragMomentum={false}
      initial={{ x: item.x, y: item.y }}
      whileTap={{ scale: 0.98 }}
      onDoubleClick={() => onOpen(item.id)}
      className="absolute flex w-[82px] flex-col items-center gap-1 px-1 py-1 text-white outline-none hover:bg-[#000080]/40 focus:bg-[#000080]/60"
      style={{ ...font98, touchAction: "none" }}
      title="Double-click to open. Drag to move."
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        <div className="absolute inset-0 translate-x-[2px] translate-y-[2px] bg-black/25" />
        <div className="relative flex h-10 w-10 items-center justify-center border border-black bg-[#dcdcdc] text-[#000080] shadow-sm">
          <Icon className="h-7 w-7" strokeWidth={2.5} />
        </div>
      </div>
      <span className="max-w-[80px] text-center text-[11px] leading-tight drop-shadow-[1px_1px_0_#000]">{item.label}</span>
    </motion.button>
  );
}

function WindowChrome({ id, z, minimized, maximized, onFocus, onClose, onMinimize, onMaximize, children }) {
  const meta = windowMeta[id];
  const Icon = meta.icon;
  const defaultPos = useMemo(() => ({ x: 245 + Math.random() * 80, y: 70 + Math.random() * 70 }), [id]);

  if (minimized) return null;

  return (
    <motion.div
      drag={!maximized}
      dragMomentum={false}
      onMouseDown={onFocus}
      initial={{ opacity: 0, x: defaultPos.x, y: defaultPos.y }}
      animate={
        maximized
          ? { opacity: 1, x: 4, y: 4, width: "calc(100vw - 8px)", height: "calc(100vh - 44px)" }
          : { opacity: 1, width: meta.size.w, height: meta.size.h }
      }
      exit={{ opacity: 0 }}
      transition={{ duration: 0.08 }}
      className={`absolute overflow-hidden border-2 ${bevelOut} bg-[#c0c0c0] p-[2px] shadow-[2px_2px_0_rgba(0,0,0,.45)]`}
      style={{ ...font98, zIndex: z, touchAction: "none" }}
    >
      <div className="flex h-6 cursor-default items-center justify-between bg-[#000080] pl-1 text-white">
        <div className="flex items-center gap-1 text-[12px] font-bold">
          <Icon className="h-4 w-4" />
          {meta.title}
        </div>
        <div className="flex gap-[2px] pr-[2px]">
          <button onClick={onMinimize} className={`flex h-[18px] w-[20px] items-center justify-center border-2 ${bevelOut} bg-[#c0c0c0] text-black`} aria-label="Minimize">
            <Minimize2 className="h-3 w-3" />
          </button>
          <button onClick={onMaximize} className={`flex h-[18px] w-[20px] items-center justify-center border-2 ${bevelOut} bg-[#c0c0c0] text-black`} aria-label="Maximize">
            <Maximize2 className="h-3 w-3" />
          </button>
          <button onClick={onClose} className={`flex h-[18px] w-[22px] items-center justify-center border-2 ${bevelOut} bg-[#c0c0c0] text-black`} aria-label="Close">
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="flex h-7 items-center gap-4 border-b border-[#808080] px-2 text-[12px] text-black">
        <span><u>F</u>ile</span><span><u>E</u>dit</span><span><u>V</u>iew</span><span><u>H</u>elp</span>
      </div>
      <div className={`h-[calc(100%-54px)] overflow-auto border-2 ${bevelIn} bg-white text-black`}>{children}</div>
    </motion.div>
  );
}

function AboutContent() {
  return (
    <div className="grid h-full grid-cols-[185px_1fr] gap-4 bg-white p-4 text-[12px]">
      <div className={`border-2 ${bevelIn} bg-[#efefef] p-3 text-center`}>
        <Computer className="mx-auto mb-3 h-16 w-16 text-[#000080]" />
        <h2 className="font-bold">{PROFILE.name}</h2>
        <p className="mt-1">{PROFILE.role}</p>
      </div>
      <div>
        <h1 className="mb-2 text-[16px] font-bold">Welcome to my Windows 98 portfolio</h1>
        <p className="leading-5">
          This desktop-style website uses classic beveled windows, draggable desktop icons, a Start menu, taskbar buttons, and local-app style portfolio folders.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            ["Name", PROFILE.name],
            ["Location", PROFILE.location],
            ["Focus", "Frontend, UI, interaction"],
            ["Status", "Available for projects"],
          ].map(([k, v]) => (
            <div key={k} className={`border-2 ${bevelIn} bg-[#f8f8f8] p-2`}>
              <b>{k}:</b> {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    { name: "Windows 98 Portfolio UI", type: "Interactive Website", desc: "Draggable shortcuts, local-style app windows, taskbar, and Start menu." },
    { name: "Dashboard System", type: "Product Design", desc: "Reusable analytics layouts and practical interface components." },
    { name: "Brand Landing Page", type: "Frontend", desc: "Fast, polished landing page with accessible sections." },
  ];
  return (
    <div className="bg-white p-3 text-[12px]">
      <div className={`mb-3 flex items-center gap-2 border-2 ${bevelIn} bg-white px-2 py-1 text-black`}>
        <Search className="h-4 w-4" /> Search Projects
      </div>
      <div className="grid grid-cols-3 gap-3">
        {projects.map((p) => (
          <div key={p.name} className={`border-2 ${bevelOut} bg-[#c0c0c0] p-3`}>
            <Folder className="mb-2 h-9 w-9 fill-yellow-300 text-black" />
            <h3 className="font-bold">{p.name}</h3>
            <p className="mt-1 text-[#000080]">{p.type}</p>
            <p className="mt-2 leading-5">{p.desc}</p>
            <Win98Button className="mt-3">Open</Win98Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeContent() {
  return (
    <pre className="min-h-full whitespace-pre-wrap bg-white p-3 font-mono text-[13px] leading-6 text-black">
{`${PROFILE.name}
${PROFILE.role}
${PROFILE.email} | ${PROFILE.location}

SUMMARY
Creative frontend-focused builder who enjoys polished interfaces, playful interaction, and practical product thinking.

EXPERIENCE
- Built responsive web interfaces with React and modern CSS.
- Designed interactive portfolio systems and reusable UI components.
- Collaborated across content, design, and engineering workflows.

SKILLS
React, JavaScript, TypeScript, Tailwind CSS, Framer Motion, UI Design, Accessibility, Performance

NOTE
Replace this content with your real CV, then add a downloadable PDF button.`}
    </pre>
  );
}

function ContactContent() {
  return (
    <div className="bg-white p-4 text-[12px]">
      <h2 className="text-[16px] font-bold">Contact Person</h2>
      <p className="mt-2">Direct contact hub for recruiters, clients, and collaborators.</p>
      <div className="mt-4 space-y-2">
        <a className={`flex items-center gap-2 border-2 ${bevelOut} bg-[#c0c0c0] p-2`} href={`mailto:${PROFILE.email}`}><Mail className="h-5 w-5" /> {PROFILE.email}</a>
        <a className={`flex items-center gap-2 border-2 ${bevelOut} bg-[#c0c0c0] p-2`} href={PROFILE.github} target="_blank" rel="noreferrer"><Github className="h-5 w-5" /> GitHub</a>
        <a className={`flex items-center gap-2 border-2 ${bevelOut} bg-[#c0c0c0] p-2`} href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-5 w-5" /> LinkedIn</a>
        <a className={`flex items-center gap-2 border-2 ${bevelOut} bg-[#c0c0c0] p-2`} href={PROFILE.website} target="_blank" rel="noreferrer"><Globe className="h-5 w-5" /> Personal Website</a>
      </div>
    </div>
  );
}

function GalleryContent() {
  return (
    <div className="grid grid-cols-3 gap-3 bg-white p-3 text-[12px]">
      {["UI Shot", "Workspace", "Case Study", "Brand", "Prototype", "Experiment"].map((name, i) => (
        <div key={name} className={`border-2 ${bevelOut} bg-[#c0c0c0] p-2`}>
          <div className={`flex h-28 items-center justify-center border-2 ${bevelIn} bg-white`}>
            <ImageIcon className="h-10 w-10 text-[#000080]" />
          </div>
          <div className="mt-2 font-bold">{name} {i + 1}</div>
        </div>
      ))}
    </div>
  );
}

function MusicContent({ playing, setPlaying }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#c0c0c0] p-6 text-center text-[12px]">
      <div className={`mb-4 flex h-24 w-24 items-center justify-center border-2 ${bevelIn} bg-black text-lime-400`}>
        <Music className="h-12 w-12" />
      </div>
      <h2 className="text-[16px] font-bold">CD Player</h2>
      <p className="mt-2 max-w-sm leading-5">
        Put your licensed music file at <code>/public/audio/a-new-quest.mp3</code>. Browsers require the visitor to click before audio can play.
      </p>
      <Win98Button onClick={() => setPlaying(!playing)} className="mt-4">{playing ? "Pause" : "Play"}</Win98Button>
    </div>
  );
}

function StartMenu({ open, onOpenWindow }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.08 }}
          className={`absolute bottom-9 left-0 z-[9999] flex w-[320px] border-2 ${bevelOut} bg-[#c0c0c0] shadow-[2px_2px_0_rgba(0,0,0,.55)]`}
          style={font98}
        >
          <div className="flex w-10 items-end justify-center bg-[#000080] pb-3 text-white">
            <div className="-rotate-90 whitespace-nowrap text-[20px] font-bold tracking-wide">Windows 98</div>
          </div>
          <div className="flex-1 py-1 text-[12px]">
            {shortcuts.map((s) => {
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={() => onOpenWindow(s.id)} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-[#000080] hover:text-white">
                  <Icon className="h-6 w-6" /> {s.label}
                </button>
              );
            })}
            <div className="my-1 border-t border-[#808080]" />
            <button className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-[#000080] hover:text-white"><HelpCircle className="h-6 w-6" /> Help</button>
            <button className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-[#000080] hover:text-white"><Power className="h-6 w-6" /> Shut Down...</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContentRouter({ id, playing, setPlaying }) {
  if (id === "about") return <AboutContent />;
  if (id === "projects") return <ProjectsContent />;
  if (id === "resume") return <ResumeContent />;
  if (id === "contact") return <ContactContent />;
  if (id === "gallery") return <GalleryContent />;
  if (id === "music") return <MusicContent playing={playing} setPlaying={setPlaying} />;
  return null;
}

export default function WindowsPortfolioDesktop() {
  const [windows, setWindows] = useState([]);
  const [zTop, setZTop] = useState(30);
  const [startOpen, setStartOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const openWindow = (id) => {
    setStartOpen(false);
    setWindows((current) => {
      if (current.some((w) => w.id === id)) {
        const nextZ = zTop + 1;
        setZTop(nextZ);
        return current.map((w) => (w.id === id ? { ...w, minimized: false, z: nextZ } : w));
      }
      const nextZ = zTop + 1;
      setZTop(nextZ);
      return [...current, { id, z: nextZ, minimized: false, maximized: false }];
    });
  };

  const updateWindow = (id, patch) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  const closeWindow = (id) => setWindows((ws) => ws.filter((w) => w.id !== id));
  const focusWindow = (id) => {
    const nextZ = zTop + 1;
    setZTop(nextZ);
    updateWindow(id, { z: nextZ });
  };

  React.useEffect(() => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.play().catch(() => setPlaying(false));
    else audioRef.current.pause();
  }, [playing]);

  const clock = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#008080] select-none" style={font98}>
      <audio ref={audioRef} src="/audio/a-new-quest.mp3" loop />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px)", backgroundSize: "4px 4px" }} />

      {shortcuts.map((item) => <DesktopIcon key={item.id} item={item} onOpen={openWindow} />)}

      <AnimatePresence>
        {windows.map((w) => (
          <WindowChrome
            key={w.id}
            id={w.id}
            z={w.z}
            minimized={w.minimized}
            maximized={w.maximized}
            onFocus={() => focusWindow(w.id)}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => updateWindow(w.id, { minimized: true })}
            onMaximize={() => updateWindow(w.id, { maximized: !w.maximized })}
          >
            <ContentRouter id={w.id} playing={playing} setPlaying={setPlaying} />
          </WindowChrome>
        ))}
      </AnimatePresence>

      <StartMenu open={startOpen} onOpenWindow={openWindow} />

      <div className={`absolute bottom-0 left-0 right-0 z-[9998] flex h-9 items-center justify-between border-2 ${bevelOut} bg-[#c0c0c0] px-1 text-[12px]`}>
        <div className="flex h-full items-center gap-1">
          <button onClick={() => setStartOpen(!startOpen)} className={`flex h-7 items-center gap-1 border-2 ${startOpen ? bevelIn : bevelOut} bg-[#c0c0c0] px-2 font-bold`}>
            <div className="grid grid-cols-2 gap-[1px]">
              <span className="h-2 w-2 bg-red-500" /><span className="h-2 w-2 bg-green-500" />
              <span className="h-2 w-2 bg-blue-500" /><span className="h-2 w-2 bg-yellow-400" />
            </div>
            Start
          </button>
          {windows.map((w) => {
            const Icon = windowMeta[w.id].icon;
            return (
              <button key={w.id} onClick={() => updateWindow(w.id, { minimized: !w.minimized })} className={`flex h-7 min-w-[120px] items-center gap-1 border-2 ${!w.minimized ? bevelIn : bevelOut} bg-[#c0c0c0] px-2 text-left`}>
                <Icon className="h-4 w-4" /> {windowMeta[w.id].title}
              </button>
            );
          })}
        </div>
        <div className={`flex h-7 items-center gap-2 border-2 ${bevelIn} bg-[#c0c0c0] px-2`}>
          <Wifi className="h-4 w-4" />
          <button onClick={() => setPlaying(!playing)} title="Toggle music"><Volume2 className={`h-4 w-4 ${playing ? "text-[#000080]" : ""}`} /></button>
          <BatteryFull className="h-4 w-4" />
          <span>{clock}</span>
        </div>
      </div>
    </main>
  );
}
