"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SavedBoost {
  boost: string;
  mood: string;
  scenario: string;
  timestamp: string;
}

export default function SavedBoostsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [savedBoosts, setSavedBoosts] = useState<SavedBoost[]>([]);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    // Load saved boosts from localStorage
    const boosts = JSON.parse(localStorage.getItem("savedBoosts") || "[]");
    setSavedBoosts(boosts.sort((a: SavedBoost, b: SavedBoost) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  }, [status, router]);

  const handleRemoveBoost = (boost: SavedBoost) => {
    const updatedBoosts = savedBoosts.filter(b => b.boost !== boost.boost);
    localStorage.setItem("savedBoosts", JSON.stringify(updatedBoosts));
    setSavedBoosts(updatedBoosts);
  };

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-viba-gray/60 animate-pulse">Loading your saved boosts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-viba-gray">Your Saved Boosts</h1>
        <Link
          href="/"
          className="text-viba-gray/60 hover:text-viba-gray flex items-center space-x-2 transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      {savedBoosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-viba-gray/60 mb-4">You haven't saved any boosts yet.</p>
          <Link
            href="/"
            className="text-viba-teal hover:text-viba-teal/80 transition-colors"
          >
            Get your first boost →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {savedBoosts.map((boost, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-medium text-viba-gray">{boost.mood}</span>
                  <span className="text-viba-gray/40">×</span>
                  <span className="font-medium text-viba-gray">{boost.scenario}</span>
                </div>
                <button
                  onClick={() => handleRemoveBoost(boost)}
                  className="text-viba-gray/40 hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </div>

              <p className="text-viba-gray whitespace-pre-line">{boost.boost}</p>

              <div className="text-sm text-viba-gray/60">
                Saved on {new Date(boost.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 