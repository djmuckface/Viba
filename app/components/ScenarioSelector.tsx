"use client";

import { useBoost } from "../context/BoostContext";

const scenarios = [
  {
    id: "meeting",
    title: "Before a Meeting",
    icon: "📊",
    description: "Prepare for an important meeting",
  },
  {
    id: "social",
    title: "Social Anxiety",
    icon: "🫂",
    description: "Navigate social situations",
  },
  {
    id: "date",
    title: "Date Night",
    icon: "💝",
    description: "Feel confident on your date",
  },
  {
    id: "speaking",
    title: "Public Speaking",
    icon: "🎤",
    description: "Ace your presentation",
  },
  {
    id: "creative",
    title: "Creative Block",
    icon: "🎨",
    description: "Overcome creative obstacles",
  },
  {
    id: "interview",
    title: "Job Interview",
    icon: "💼",
    description: "Nail your interview",
  },
];

export default function ScenarioSelector() {
  const { selectedScenario, setSelectedScenario } = useBoost();

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {scenarios.map((scenario) => (
        <button
          key={scenario.id}
          onClick={() => handleScenarioSelect(scenario.id)}
          className={`
            p-6 rounded-xl text-left transition-all
            ${
              selectedScenario === scenario.id
                ? "bg-viba-teal text-white shadow-md scale-[1.02]"
                : "bg-white text-viba-gray hover:bg-viba-teal/5 border border-gray-100"
            }
          `}
        >
          <div className="text-3xl mb-3">{scenario.icon}</div>
          <h3 className="text-lg font-semibold mb-1">{scenario.title}</h3>
          <p className={`text-sm ${
            selectedScenario === scenario.id ? "text-white/80" : "text-viba-gray/60"
          }`}>
            {scenario.description}
          </p>
        </button>
      ))}
    </div>
  );
}
