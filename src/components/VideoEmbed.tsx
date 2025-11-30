/**
 * VideoEmbed Component
 * 
 * Responsive YouTube video embed with loading state and hover effects.
 * Supports both YouTube video IDs and full URLs.
 */

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface VideoEmbedProps {
  videoId: string;
  title?: string;
  thumbnail?: string;
  className?: string;
}

/**
 * Extracts YouTube video ID from various URL formats
 */
const getYouTubeId = (input: string): string => {
  // If it's already just an ID, return it
  if (!input.includes("/") && !input.includes("?")) {
    return input;
  }
  
  // Try to extract from URL
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = input.match(regExp);
  return match && match[7].length === 11 ? match[7] : input;
};

const VideoEmbed = ({ videoId, title = "Video", thumbnail, className = "" }: VideoEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const actualVideoId = getYouTubeId(videoId);
  
  // Default YouTube thumbnail if none provided
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${actualVideoId}/maxresdefault.jpg`;

  const handlePlay = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`video-embed group ${className}`}>
      {!isLoaded ? (
        // Thumbnail with play button
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={handlePlay}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback to hqdefault if maxresdefault doesn't exist
              e.currentTarget.src = `https://img.youtube.com/vi/${actualVideoId}/hqdefault.jpg`;
            }}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 transition-all duration-300 group-hover:bg-background/20">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-lg shadow-primary/30">
              <FontAwesomeIcon
                icon={faPlay}
                className="text-primary-foreground text-xl md:text-2xl ml-1"
              />
            </div>
          </div>
          {/* Title overlay */}
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
              <p className="text-foreground text-sm font-medium truncate">{title}</p>
            </div>
          )}
        </div>
      ) : (
        // Actual YouTube embed
        <iframe
          src={`https://www.youtube.com/embed/${actualVideoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      )}
    </div>
  );
};

export default VideoEmbed;