
import React, { useState, useEffect } from 'react';
import { GAME_STEPS } from '../constants';

const InteractiveGame: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const currentStep = GAME_STEPS.find((step) => step.id === currentStepId);

  useEffect(() => {
    if (feedback) {
      setShowFeedback(true);
      const timer = setTimeout(() => {
        setShowFeedback(false);
        setFeedback(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleOptionClick = (nextStep: number, feedbackMsg?: string) => {
    if (feedbackMsg) {
      setFeedback(feedbackMsg);
    }
    
    // Slight delay to allow feedback to be seen before changing question
    setTimeout(() => {
        setCurrentStepId(nextStep);
    }, feedbackMsg ? 500 : 0);
  };

  const handleRestart = () => {
    setCurrentStepId(0);
    setFeedback(null);
    setShowFeedback(false);
  };

  if (!currentStep) {
    return <div>טוען משחק...</div>;
  }

  return (
    <div className="flex flex-col items-center text-center p-4 min-h-[300px]">
        {showFeedback && (
            <div className="absolute top-5 right-5 bg-slate-700 text-white py-2 px-4 rounded-lg shadow-lg animate-pulse">
                {feedback}
            </div>
        )}

      {currentStep.type === 'question' && (
        <div className="w-full max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-300 mb-6">
            קבל החלטה...
          </h3>
          <p className="text-xl mb-8 leading-relaxed">{currentStep.text}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStep.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.nextStep, option.feedback)}
                className="bg-sky-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-sky-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep.type === 'outcome' && (
        <div className="w-full max-w-2xl animate-fade-in">
          <h3
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              currentStep.isGoodEnding ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {currentStep.isGoodEnding ? 'סיום חיובי!' : 'סיום שלילי'}
          </h3>
          <p className="text-xl mb-8 leading-relaxed">{currentStep.text}</p>
          <button
            onClick={handleRestart}
            className="bg-amber-500 text-slate-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-amber-400 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            שחק שוב
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveGame;
