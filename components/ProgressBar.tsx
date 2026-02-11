
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-emerald-100 rounded-full h-4 relative overflow-hidden">
      <div 
        className="bg-emerald-600 h-full transition-all duration-700 ease-out flex items-center justify-end px-2"
        style={{ width: `${progress}%` }}
      >
        {progress > 15 && <span className="text-[10px] text-white font-bold">{Math.round(progress)}%</span>}
      </div>
    </div>
  );
};

export default ProgressBar;
