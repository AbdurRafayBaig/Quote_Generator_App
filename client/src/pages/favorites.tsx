import { useState } from "react";
import QuoteGenerator from "@/components/quote-generator";

export default function Favorites() {
  const [currentView, setCurrentView] = useState<"home" | "favorites">("favorites");

  return (
    <QuoteGenerator
      currentView={currentView}
      onNavigateToFavorites={() => setCurrentView("favorites")}
      onNavigateToHome={() => setCurrentView("home")}
    />
  );
}
