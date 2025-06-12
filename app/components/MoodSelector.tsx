"use client";

import { useBoost } from "../context/BoostContext";
import { useRef } from "react";

const moods = [
  { id: "motivated", label: "Motivated", emoji: "💪" },
  { id: "anxious", label: "Anxious", emoji: "😰" },
  { id: "tired", label: "Tired", emoji: "😴" },
  { id: "excited", label: "Excited", emoji: "🤩" },
  { id: "calm", label: "Calm", emoji: "😌" },
  { id: "stressed", label: "Stressed", emoji: "😤" },
  { id: "happy", label: "Happy", emoji: "😊" },
  { id: "sad", label: "Sad", emoji: "😢" },
];

export default function MoodSelector() {
  const { selectedMood, setSelectedMood } = useBoost();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Left Scroll Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md text-viba-gray/60 hover:text-viba-gray transition-colors md:hidden"
        aria-label="Scroll left"
      >
        ←
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md text-viba-gray/60 hover:text-viba-gray transition-colors md:hidden"
        aria-label="Scroll right"
      >
        →
      </button>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-4 -mb-4 scrollbar-hide scroll-smooth"
        >
          <div className="flex space-x-3 px-8 min-w-max">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-full transition-all
                  ${
                    selectedMood === mood.id
                      ? "bg-viba-teal text-white shadow-md scale-105"
                      : "bg-white text-viba-gray hover:bg-viba-teal/5 border border-gray-100"
                  }
                `}
              >
                <span className="text-xl">{mood.emoji}</span>
                <span className="font-medium whitespace-nowrap">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}
