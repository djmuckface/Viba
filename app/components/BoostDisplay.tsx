"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useBoostHistory } from "../context/BoostHistoryContext";
import { isAdminUser } from "../utils/adminUtils";

interface BoostDisplayProps {
  mood: string;
  scenario: string;
  refreshKey?: number;
}

export default function BoostDisplay({ mood, scenario, refreshKey = 0 }: BoostDisplayProps) {
  const { data: session } = useSession();
  const { addToHistory, hasReachedDailyLimit, incrementUsage, getUsageCount } = useBoostHistory();
  const [boost, setBoost] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const isAdmin = isAdminUser(session?.user?.email);
  const usageCount = getUsageCount();
  const MAX_REFRESHES = 20;

  useEffect(() => {
    const fetchBoost = async () => {
      setIsLoading(true);
      setError(null);

      // Check refresh limit for non-admin users
      if (!isAdmin && hasReachedDailyLimit()) {
        setError("You've reached your daily refresh limit. Come back tomorrow for more boosts!");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/boost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mood, scenario }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate boost");
        }

        const data = await response.json();
        setBoost(data.boost);
        addToHistory(data.boost);

        // Only increment usage for non-admin users
        if (!isAdmin) {
          incrementUsage();
        }
      } catch (err) {
        setError("Failed to generate your boost. Please try again.");
        console.error("Error fetching boost:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoost();
  }, [mood, scenario, refreshKey, addToHistory, hasReachedDailyLimit, incrementUsage, isAdmin]);

  useEffect(() => {
    // Check if this boost is saved in localStorage
    const savedBoosts = JSON.parse(localStorage.getItem("savedBoosts") || "[]");
    setIsSaved(savedBoosts.some((saved: any) => saved.boost === boost));
  }, [boost]);

  const handleSaveBoost = () => {
    const savedBoosts = JSON.parse(localStorage.getItem("savedBoosts") || "[]");
    
    if (isSaved) {
      // Remove from saved boosts
      const updatedBoosts = savedBoosts.filter((saved: any) => saved.boost !== boost);
      localStorage.setItem("savedBoosts", JSON.stringify(updatedBoosts));
      setIsSaved(false);
    } else {
      // Add to saved boosts
      const newSavedBoost = {
        boost,
        mood,
        scenario,
        timestamp: new Date().toISOString(),
      };
      savedBoosts.push(newSavedBoost);
      localStorage.setItem("savedBoosts", JSON.stringify(savedBoosts));
      setIsSaved(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-viba-gray/60 animate-pulse">Generating your boost...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Boost Content */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="prose prose-lg max-w-none">
          <p className="text-viba-gray whitespace-pre-line">{boost}</p>
        </div>
      </div>

      {/* Save Button and Refresh Counter */}
      <div className="flex items-center justify-between text-sm">
        <button
          onClick={handleSaveBoost}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
            isSaved
              ? "text-red-500 hover:text-red-600"
              : "text-viba-gray/60 hover:text-viba-gray"
          }`}
        >
          <span>{isSaved ? "❤️" : "🤍"}</span>
          <span>{isSaved ? "Saved" : "Save for Later"}</span>
        </button>

        <div className="text-viba-gray/60">
          {isAdmin ? (
            "Admin Access: Unlimited Boosts"
          ) : (
            `${MAX_REFRESHES - usageCount} refreshes remaining today`
          )}
        </div>
      </div>
    </div>
  );
}
