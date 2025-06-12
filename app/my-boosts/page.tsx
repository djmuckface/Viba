"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getSavedBoosts, formatTimestamp, unsaveBoost, SavedBoost } from "../utils/savedBoosts";

export default function MyBoostsPage() {
  const [boosts, setBoosts] = useState<SavedBoost[]>([]);
  const [deleteAnimation, setDeleteAnimation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load boosts from localStorage
  const loadBoosts = useCallback(() => {
    setIsLoading(true);
    try {
      const savedBoosts = getSavedBoosts();
      setBoosts(savedBoosts);
    } catch (error) {
      console.error("Error loading saved boosts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load boosts on mount and when localStorage changes
  useEffect(() => {
    loadBoosts();

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'viba_saved_boosts') {
        loadBoosts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadBoosts]);

  const handleUnsave = async (id: string) => {
    setDeleteAnimation(id);
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 300));
    unsaveBoost(id);
    loadBoosts();
    setDeleteAnimation(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-viba-gray">My Saved Boosts</h1>
        <Link
          href="/"
          className="text-viba-gray/60 hover:text-viba-gray flex items-center space-x-2 transition-colors"
        >
          <span className="text-lg">←</span>
          <span>Back Home</span>
        </Link>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-viba-teal"></div>
        </div>
      ) : boosts.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <div className="text-4xl">💭</div>
          <p className="text-viba-gray/60">No saved boosts yet!</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-viba-teal text-white rounded-full hover:bg-viba-teal/90 transition-colors"
          >
            Get your first boost →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boosts.map((boost) => (
            <div
              key={boost.id}
              className={`
                bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                transform transition-all duration-300
                ${deleteAnimation === boost.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
              `}
            >
              <div className="p-6 space-y-4">
                {/* Boost Text */}
                <p className="text-lg text-viba-gray/80 italic">
                  "{boost.text}"
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-viba-gray/60">
                      <span className="font-medium">{boost.mood}</span>
                      <span>×</span>
                      <span className="font-medium">{boost.scenario}</span>
                    </div>
                    <div className="text-viba-gray/40">
                      {formatTimestamp(boost.timestamp)}
                    </div>
                  </div>

                  {/* Unsave Button */}
                  <button
                    onClick={() => handleUnsave(boost.id)}
                    className="text-viba-gray/40 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50"
                    title="Remove from saved"
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 