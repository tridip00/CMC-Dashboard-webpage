import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  ClipboardList, 
  BarChart3, 
  Menu, 
  X, 
  ChevronRight,
  UserCircle,
  Bell,
  Maximize2, // Icon for entering fullscreen
  Minimize2 // Icon for exiting fullscreen
} from 'lucide-react';

import pslogo from "../src/assets/cmc-core.png";

const DashboardApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); // State to track fullscreen mode

  // Handle window resize for responsive sidebar and mobile detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsSidebarOpen(false); // Sidebar closed by default on mobile
      } else {
        setIsMobile(false);
        // Only open the sidebar automatically if not in fullscreen mode
        if (!isFullScreen) setIsSidebarOpen(true);
      }
    };

    handleResize(); // Init on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullScreen]); // Re-run effect when fullscreen changes

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    // When entering fullscreen on desktop, ensure the sidebar is closed for max space
    if (!isFullScreen && !isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Configuration for the dashboards
  const dashboards = [
    {
      id: 0,
      title: 'Task Management',
      subtitle: 'Track deliverables and timelines',
      icon: <ClipboardList size={20} />,
      url: "https://app.fabric.microsoft.com/reportEmbed?reportId=7b3e5466-7fc5-4eed-b112-14deab98d329&autoAuth=true&ctid=d93ab9c6-31df-4214-9557-88af67b8d358",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10"
    },
    {
      id: 1,
      title: 'Department MIS',
      subtitle: 'Management Information System Overview',
      icon: <BarChart3 size={20} />,
      url: "https://app.fabric.microsoft.com/reportEmbed?reportId=bf867815-26c6-4cf6-87b1-9094baadc874&autoAuth=true&ctid=d93ab9c6-31df-4214-9557-88af67b8d358",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      id: 2,
      title: 'Ongoing Projects (L1)',
      subtitle: 'Live construction and site monitoring',
      icon: <Building2 size={20} />,
      url: "https://app.fabric.microsoft.com/reportEmbed?reportId=c6b1350b-4820-40ab-bf4d-643bfeaebc93&autoAuth=true&ctid=d93ab9c6-31df-4214-9557-88af67b8d358",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10"
    }
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Mobile Overlay for closing sidebar */}
      {isMobile && isSidebarOpen && !isFullScreen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden completely in fullscreen mode */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800 bg-slate-900/95 backdrop-blur-xl ${
          isFullScreen ? 'hidden' : (isSidebarOpen ? 'w-72 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0')
        } ${!isSidebarOpen && !isMobile ? 'lg:w-20' : ''}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${!isSidebarOpen && !isMobile ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                <img src= {pslogo} alt="PS Group Logo" className="w-full h-full object-contain rounded-lg" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-wide">PS GROUP</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">CMC Department</span>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-1 hover:bg-slate-800 rounded-md text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {dashboards.map((dash) => (
            <button
              key={dash.id}
              onClick={() => {
                setActiveTab(dash.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
              className={`relative group w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
                activeTab === dash.id 
                  ? 'bg-slate-800 text-white shadow-lg shadow-black/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              {/* Active Indicator Line */}
              {activeTab === dash.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full" />
              )}

              <div className={`p-2 rounded-lg transition-colors ${activeTab === dash.id ? dash.bgColor : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                <div className={activeTab === dash.id ? dash.color : 'text-slate-400'}>
                  {dash.icon}
                </div>
              </div>

              <div className={`flex flex-col items-start text-left overflow-hidden transition-all duration-300 ${!isSidebarOpen && !isMobile ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                <span className="font-medium text-sm truncate w-full">{dash.title}</span>
                <span className="text-[10px] text-slate-500 truncate w-full">{dash.subtitle}</span>
              </div>

              {/* Tooltip for collapsed state */}
              {!isSidebarOpen && !isMobile && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-slate-700">
                  {dash.title}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile / Footer */}
        <div className="p-4 border-t border-slate-800">
          <button className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors ${!isSidebarOpen && !isMobile ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">TK</span>
            </div>
            
            <div className={`flex flex-col items-start overflow-hidden transition-all duration-300 ${!isSidebarOpen && !isMobile ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
              <span className="text-sm font-medium text-slate-200">Admin User</span>
              <span className="text-xs text-slate-500">View Profile</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
        
        {/* Top Header - Hidden in fullscreen mode */}
        <header className={`h-16 flex items-center justify-between px-4 lg:px-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10 ${isFullScreen ? 'hidden' : ''}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
            >
              {isSidebarOpen ? <Menu size={20} /> : <ChevronRight size={20} />}
            </button>
            
            <div className="hidden md:flex flex-col">
              <h2 className="text-lg font-semibold text-white leading-tight">
                {dashboards[activeTab].title}
              </h2>
              <span className="text-xs text-slate-500">
                Updated via scheduled refresh
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="h-6 w-px bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-full border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-500">Live</span>
            </div>
            
            {/* Fullscreen Toggle Button */}
            <button 
                onClick={toggleFullScreen} 
                title="Enter Fullscreen"
                className="p-2 text-slate-400 hover:text-white hover:bg-indigo-600/20 rounded-lg transition-colors"
            >
                <Maximize2 size={20} />
            </button>
          </div>
        </header>
        
        {/* Floating Exit Fullscreen Button - Visible only in fullscreen mode */}
        {isFullScreen && (
          <button
            onClick={toggleFullScreen}
            title="Exit Fullscreen"
            className="fixed top-4 right-4 z-50 p-3 bg-slate-800/80 hover:bg-slate-700/90 text-white rounded-full shadow-lg transition-colors backdrop-blur-sm"
          >
            <Minimize2 size={24} />
          </button>
        )}


        {/* Dashboard Content (Iframe Container) */}
        {/* Adjusts padding and rounded corners based on fullscreen state */}
        <div className={`flex-1 overflow-hidden flex flex-col transition-all duration-300 ${isFullScreen ? 'p-0' : 'p-4 lg:p-6'}`}>
          <div className={`flex-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative ${isFullScreen ? 'rounded-none border-none' : ''}`}>
            
            {/* Loading Skeleton */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
               <div className="flex flex-col items-center gap-4">
                 <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                 <span className="text-slate-500 text-sm animate-pulse">Loading Power BI Report...</span>
               </div>
            </div>

            {/* The Power BI Iframe */}
            <iframe 
              title={dashboards[activeTab].title}
              src={dashboards[activeTab].url}
              className="w-full h-full relative z-10 bg-slate-900" 
              frameBorder="0" 
              allowFullScreen={true}
            ></iframe>
            
          </div>
          
          {/* Footer Info - Hidden in fullscreen mode */}
          <div className={`mt-4 flex justify-between items-center text-xs text-slate-500 px-2 transition-opacity duration-300 ${isFullScreen ? 'opacity-0 hidden' : 'opacity-100'}`}>
            <span>© 2025 PS Group - CMC Department</span>
            <span className="hidden md:inline">Confidential Data - Internal Use Only</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardApp;