
import React, { useState } from 'react';
import { SECTIONS } from './constants';
import { Section } from './types';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import InteractiveGame from './components/InteractiveGame';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('section-1');

  const activeSection: Section | undefined = SECTIONS.find(
    (s) => s.id === activeView
  );

  return (
    <div className="bg-slate-900 min-h-screen text-gray-200 flex flex-col md:flex-row-reverse">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <header className="mb-8 text-center md:text-right">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
            מזוודת הזהב של המנהיג
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mt-2">
            אפליקציה חינוכית על מנהיגות ושגשוג משותף, מבוססת על המשל
          </p>
        </header>

        <div className="bg-slate-800/50 rounded-xl shadow-2xl p-6 md:p-8 backdrop-blur-sm border border-slate-700">
          {activeView.startsWith('section-') && activeSection ? (
            <ContentDisplay
              key={activeSection.id}
              title={activeSection.title}
              content={activeSection.content}
            />
          ) : (
            <InteractiveGame />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
