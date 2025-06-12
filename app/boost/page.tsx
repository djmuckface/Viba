"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBoost } from "../context/BoostContext";
import BoostDisplay from "../components/BoostDisplay";
import Link from "next/link";

export default function BoostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSelectedMood, setSelectedScenario, resetSelections } = useBoost();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const mood = searchParams.get("mood");
  const scenario = searchParams.get("scenario");

  useEffect(() => {
    // If no mood or scenario, redirect to home
    if (!mood || !scenario) {
      router.replace("/");
      return;
    }

    try {
      // Set the selections in context
      setSelectedMood(mood);
      setSelectedScenario(scenario);

      // Log for future API integration
      console.log("Boost requested:", { mood, scenario });
    } catch (error) {
      console.error("Error setting boost state:", error);
      router.replace("/");
      return;
    }

    setIsLoading(false);
  }, [mood, scenario, router, setSelectedMood, setSelectedScenario]);

  const handleRefreshBoost = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleStartOver = () => {
    resetSelections();
    router.push("/");
  };

  if (isLoading || !mood || !scenario) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-viba-gray/60 animate-pulse">Loading your boost...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          onClick={resetSelections}
          className="text-viba-gray/60 hover:text-viba-gray flex items-center space-x-2 transition-colors"
        >
          <span className="text-lg">←</span>
          <span>Back to Selection</span>
        </Link>

        {/* Saved Boosts Link */}
        <Link
          href="/my-boosts"
          className="text-viba-gray/60 hover:text-viba-gray flex items-center space-x-2 transition-colors"
        >
          <span>❤️</span>
          <span>Saved Boosts</span>
        </Link>
      </div>

      {/* Boost Content */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="text-viba-gray/60 mb-2">Your Boost for</div>
          <div className="flex items-center justify-center space-x-2 text-lg">
            <span className="font-medium text-viba-gray">{decodeURIComponent(mood)}</span>
            <span className="text-viba-gray/40">×</span>
            <span className="font-medium text-viba-gray">{decodeURIComponent(scenario)}</span>
          </div>
        </div>

        <BoostDisplay 
          mood={decodeURIComponent(mood)} 
          scenario={decodeURIComponent(scenario)}
          refreshKey={refreshKey}
        />

        {/* Action Buttons */}
        <div className="flex flex-col items-center space-y-4 pt-4">
          <button
            onClick={handleRefreshBoost}
            className="bg-viba-teal text-white px-8 py-3 rounded-full font-medium hover:bg-viba-teal/90 transition-colors w-full max-w-sm flex items-center justify-center space-x-2"
          >
            <span>🔄</span>
            <span>Get Another Boost</span>
          </button>
          <button
            onClick={handleStartOver}
            className="text-viba-gray/60 hover:text-viba-gray transition-colors px-8 py-3 rounded-full font-medium border border-gray-100 hover:border-gray-200 w-full max-w-sm flex items-center justify-center space-x-2"
          >
            <span>🔁</span>
            <span>Start Over</span>
          </button>
        </div>
      </div>
    </div>
  );
} 