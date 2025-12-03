/**
 * LoadingScreen Component
 * 
 * Fast, polished loading screen with orbital favicon animation.
 * Minimal loading time with smooth transitions.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden">
      {/* Orbital animation container */}
      <div className="relative w-40 h-40">
        {/* Orbital path */}
        <div className="absolute inset-0 rounded-full border border-border/20" />
        
        {/* Center logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
          <img 
            src="/favicon.png" 
            alt="Loading" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
          />
        </div>
        
        {/* Orbiting ball */}
        <div className="absolute inset-0 animate-orbit">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48">
        <div className="h-0.5 bg-border/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-muted-foreground text-xs mt-2 font-body">
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
