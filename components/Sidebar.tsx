
import React from 'react';
import { SECTIONS } from '../constants';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const NavLink: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isActive, onClick, children }) => {
  const baseClasses =
    'w-full text-right px-4 py-3 rounded-md transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900';
  const activeClasses = 'bg-amber-400 text-slate-900 font-bold shadow-lg';
  const inactiveClasses =
    'bg-slate-800 hover:bg-slate-700 hover:shadow-md hover:-translate-y-px';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 bg-slate-900/80 backdrop-blur-sm p-4 md:p-6 border-l border-slate-700 flex-shrink-0">
      <h2 className="text-xl font-bold text-amber-300 mb-6 text-center md:text-right">תפריט ראשי</h2>
      <nav className="flex flex-col space-y-3">
        {SECTIONS.map((section) => (
          <NavLink
            key={section.id}
            isActive={activeView === section.id}
            onClick={() => setActiveView(section.id)}
          >
            {section.title.split(': ')[1]}
          </NavLink>
        ))}
        <div className="border-t border-slate-700 my-3"></div>
        <NavLink
          isActive={activeView === 'game'}
          onClick={() => setActiveView('game')}
        >
          🎲 משחק אינטראקטיבי
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
