import { useState } from "react";
import {
  ClipboardList,
  BarChart3,
  LandPlot,
  Building2,
  Menu,
  Bell,
  UserCircle,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
} from "lucide-react";

import pslogo from "./assets/G-Groups-removebg-preview.png";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const dashboards = [
    {
      title: "Task Management",
      icon: <ClipboardList size={18} />,
      url: "https://app.fabric.microsoft.com/reportEmbed?reportId=bbf9e0d0-2c4f-4fd5-803d-39f86fda4a00&autoAuth=true&ctid=d93ab9c6-31df-4214-9557-88af67b8d358",
    },
    {
      title: "Department MIS",
      icon: <BarChart3 size={18} />,
      url: "https://app.fabric.microsoft.com/reportEmbed?reportId=bf867815-26c6-4cf6-87b1-9094baadc874&autoAuth=true&ctid=d93ab9c6-31df-4214-9557-88af67b8d358",
    },
    {
      title: "Upcoming Projects (L1)",
      icon: <LandPlot size={18} />,
      url: "https://app.fabric.microsoft.com/reportEmbed?reportId=a123173a-4de3-45fc-a7e6-247e3df37529&autoAuth=true&ctid=d93ab9c6-31df-4214-9557-88af67b8d358",
    },
    {
      title: "Ongoing Projects (L1)",
      icon: <Building2 size={18} />,
      url: "https://app.fabric.microsoft.com/reportEmbed?reportId=c6b1350b-4820-40ab-bf4d-643bfeaebc93&autoAuth=true&ctid=d93ab9c6-31df-4214-9557-88af67b8d358",
    },
  ];

  return (
    <div
      className={`flex h-screen w-screen overflow-hidden transition-colors ${darkMode
          ? "bg-slate-950 text-slate-200"
          : "bg-slate-100 text-slate-900"
        }`}
    >
      {/* Sidebar */}
      {!fullscreen && (
        <aside
          className={`transition-all duration-300 border-r ${darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
            } ${sidebarOpen ? "w-64" : "w-16"}`}
        >
          <div className="h-12 flex items-center gap-3 px-4 border-b border-slate-700/40">
            <img src={pslogo} className="h-7 w-7 object-contain" />
            {sidebarOpen && (
              <span className="text-sm font-semibold tracking-wide">
                PS GROUP – CMC
              </span>
            )}
          </div>

          <nav className="p-2 space-y-1">
            {dashboards.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${activeTab === i
                    ? darkMode
                      ? "bg-indigo-600/20 text-white"
                      : "bg-indigo-100 text-indigo-700"
                    : "opacity-80 hover:opacity-100"
                  }`}
              >
                {d.icon}
                {sidebarOpen && <span>{d.title}</span>}
              </button>
            ))}
          </nav>
        </aside>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {!fullscreen && (
          <header
            className={`h-12 flex items-center justify-between px-4 border-b ${darkMode
                ? "bg-slate-950/80 border-slate-800"
                : "bg-white border-slate-200"
              }`}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded hover:bg-slate-800/20"
              >
                <Menu size={18} />
              </button>

              <span className="text-sm font-medium">
                {dashboards[activeTab].title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded hover:bg-slate-800/20"
                title="Toggle Theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Notification */}
              <button className="p-2 rounded hover:bg-slate-800/20 relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile with text */}
              <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-800/20">
                <UserCircle size={20} />
                <span className="text-xs font-medium whitespace-nowrap">
                  Admin | CMC
                </span>
              </button>

              {/* Fullscreen */}
              <button
                onClick={() => setFullscreen(true)}
                className="p-2 rounded hover:bg-slate-800/20"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </header>
        )}

        {/* Content */}
        <div className="flex-1 relative">
          <iframe
            src={dashboards[activeTab].url}
            title="Power BI Report"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
          />
        </div>

        {/* Footer */}
        {!fullscreen && (
          <footer
            className={`h-8 flex items-center justify-center text-xs ${darkMode ? "text-slate-500" : "text-slate-600"
              }`}
          >
            © 2025 Central Monitoring Cell (CMC) Department
          </footer>
        )}
      </main>

      {/* Exit Fullscreen */}
      {fullscreen && (
        <button
          onClick={() => setFullscreen(false)}
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700"
        >
          <Minimize2 size={20} />
        </button>
      )}
    </div>
  );
}
