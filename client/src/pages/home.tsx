import { useState } from "react";
import QuoteGenerator from "@/components/quote-generator";

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "favorites">("home");

  return (
    <QuoteGenerator
      currentView={currentView}
      onNavigateToFavorites={() => setCurrentView("favorites")}
      onNavigateToHome={() => setCurrentView("home")}
    />
  );
}
