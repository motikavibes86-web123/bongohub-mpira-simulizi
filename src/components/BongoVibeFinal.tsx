"use client";
import React, { useState } from "react";
import {
  Search,
  Home,
  Tv,
  Gamepad2,
  MessageSquare,
  Sparkles,
  Bell,
  Send,
  Film,
  BookOpen,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function BongoVibeFinal() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "moura" | "simulizi" | "elimu" | "zaid"
  >("moura");

  // Kazi ya Gemini AI
  const handleAskAI = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(query);
      // result.response may be different shape depending on SDK; defensive:
      const text =
        (result?.response && typeof result.response === "string"
          ? result.response
          : result?.response?.text?.() ?? result?.candidates?.[0]?.content) ??
        "Hakuna jibu";
      setResponse(text);
    } catch (e) {
      setResponse("Tafadhali weka API Key yako kwenye Settings!");
    }
    setLoading(false);
  };

  const sections = [
    {
      id: "moura",
      label: "Moura",
      icon: <Film size={18} />,
      desc: "Sinema, tamthilia na videos",
    },
    {
      id: "simulizi",
      label: "Simulizi",
      icon: <BookOpen size={18} />,
      desc: "Hadithi za mdomo, podcasts",
    },
    {
      id: "elimu",
      label: "Elimu",
      icon: <GraduationCap size={18} />,
      desc: "Masomo, mafunzo na resources",
    },
    {
      id: "zaid",
      label: "Zaidi",
      icon: <MoreHorizontal size={18} />,
      desc: "Fursa, Live, Vipindi vingine",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-24 selection:bg-blue-600">
      {/* Header */}
      <header className="p-4 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-600/20 italic">
            B
          </div>
          <h1 className="text-xl font-black tracking-tighter">BongoVibe</h1>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg">
          INGIA
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Notification */}
        <div className="bg-blue-600 rounded-full p-4 flex items-center gap-3 shadow-xl animate-bounce">
          <div className="bg-white/20 p-2 rounded-full">
            <Bell size={20} className="text-white" />
          </div>
          <p className="text-[11px] font-bold leading-tight">
            KARIBU TENA BONGOVIBE! JE, UMESOMA SMS ZA LEO? 👋
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-sm font-bold tracking-[0.3em] text-gray-500 uppercase">
            BURUDANI YA KITANZANIA 🇹🇿
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Tafuta TV, Simulizi au Fursa..."
            className="w-full bg-zinc-900 border border-white/10 rounded-full py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
          />
        </div>

        {/* Modern Section Buttons (kawaida kwa app ya kisasa) */}
        <div className="flex gap-3 items-center justify-between">
          {sections.map((s) => {
            const isActive = activeSection === (s.id as any);
            return (
              <button
                key={s.id}
                role="tab"
                aria-pressed={isActive}
                onClick={() => setActiveSection(s.id as any)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 px-3 rounded-2xl transition-transform transform ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 shadow-2xl scale-105"
                    : "bg-zinc-900/60 hover:bg-zinc-900/80"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  {s.icon}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-tight ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Example Card that changes with section */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-lg font-black tracking-tight mb-2">
            {activeSection === "moura" && "Moura — Sinema na Vipindi"}
            {activeSection === "simulizi" && "Simulizi — Hadithi za Kusisimua"}
            {activeSection === "elimu" && "Elimu — Kozi na Resources"}
            {activeSection === "zaid" && "Zaidi — Live & Fursa"}
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            {activeSection === "moura" &&
              "Tazama vipindi vinavyopendwa, trailers na list za sinema."}
            {activeSection === "simulizi" &&
              "Sikiliza simulizi za mdomo, podcasts na sehemu za hadithi."}
            {activeSection === "elimu" &&
              "Pata mafunzo, note, na video za kujifunzia kila siku."}
            {activeSection === "zaid" &&
              "Vifaa vingine: fursa za kazi, live shows, na notifications."}
          </p>
        </div>

        {/* Live Sports Card (Yanga vs Simba) */}
        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl border border-white/5 group">
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            alt="Pitch"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

          <div className="absolute top-10 left-0 right-0 flex justify-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center font-black text-2xl border-4 border-yellow-400/20 shadow-xl">
                Y
              </div>
              <p className="text-[10px] font-black mt-2 text-yellow-500">YANGA</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center font-black text-2xl border-4 border-red-500/20 shadow-xl">
                S
              </div>
              <p className="text-[10px] font-black mt-2 text-red-500">SIMBA</p>
            </div>
          </div>

          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Dabi ya Kariakoo: Live Sasa
            </span>
          </div>

          <div className="absolute bottom-10 left-8">
            <h3 className="text-5xl font-black italic tracking-tighter leading-none">
              YANGA <span className="text-yellow-500">SC</span>
            </h3>
          </div>

          <button className="absolute right-6 bottom-16 bg-blue-600 p-4 rounded-2xl shadow-2xl shadow-blue-600/40 animate-pulse">
            <MessageSquare size={24} />
          </button>
        </div>

        {/* Bongo AI Section */}
        <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-blue-500" size={20} />
            <span className="font-bold text-sm tracking-widest text-blue-500 uppercase">
              Bongo AI
            </span>
          </div>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Uliza chochote..."
              className="w-full bg-black border border-white/10 rounded-2xl p-4 pr-12 text-sm outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAskAI}
              className="absolute right-3 top-2 bg-blue-600 p-2 rounded-xl"
              aria-label="Tuma swali kwa AI"
            >
              {loading ? <Send size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          {response && (
            <div className="bg-blue-600/10 p-4 rounded-2xl border border-blue-500/20 text-xs leading-relaxed text-blue-100">
              {response}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex justify-around items-center z-50">
        <NavItem icon={<Home size={22} />} label="NYUMBANI" active />
        <NavItem icon={<Tv size={22} />} label="BONGO TV LIVE" />
        <NavItem icon={<Gamepad2 size={22} />} label="GAMES" />
        <NavItem icon={<MessageSquare size={22} />} label="NUKUU & SMS" />
        <NavItem icon={<Sparkles size={22} />} label="BONGO AI" />
      </nav>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
        active ? "text-blue-500" : "text-gray-500 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-[8px] font-black uppercase tracking-tight">{label}</span>
    </div>
  );
}
