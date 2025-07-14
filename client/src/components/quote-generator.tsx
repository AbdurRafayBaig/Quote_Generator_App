import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  Share2,
  Twitter,
  Facebook,
  Copy,
  Heart,
  Download,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Quote } from "@shared/schema";

interface QuoteGeneratorProps {
  onNavigateToFavorites: () => void;
  onNavigateToHome: () => void;
  currentView: "home" | "favorites";
}

export default function QuoteGenerator({
  onNavigateToFavorites,
  onNavigateToHome,
  currentView,
}: QuoteGeneratorProps) {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const { theme, setTheme } = useTheme();

  // Fetch all quotes
  const { data: quotes = [] } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
  });

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("quote-favorites");
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      setFavorites(favoriteIds);
      
      // Load favorite quotes
      const favQuotes = quotes.filter(quote => favoriteIds.includes(quote.id));
      setFavoriteQuotes(favQuotes);
    }
  }, [quotes]);

  useEffect(() => {
    // Set initial quote when quotes are loaded
    if (quotes.length > 0 && !currentQuote) {
      setCurrentQuote(quotes[0]);
    }
  }, [quotes, currentQuote]);

  const generateNewQuote = async () => {
    if (quotes.length === 0) return;
    
    setIsLoading(true);
    try {
      // Get a random quote different from current
      let newQuote;
      do {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      } while (newQuote.id === currentQuote?.id && quotes.length > 1);

      setCurrentQuote(newQuote);
    } catch (error) {
      console.error("Error generating new quote:", error);
    }
    setIsLoading(false);
    setShowShareMenu(false);
  };

  const toggleFavorite = () => {
    if (!currentQuote) return;
    
    const newFavorites = favorites.includes(currentQuote.id)
      ? favorites.filter(id => id !== currentQuote.id)
      : [...favorites, currentQuote.id];

    setFavorites(newFavorites);
    localStorage.setItem("quote-favorites", JSON.stringify(newFavorites));
    
    // Update favorite quotes
    const favQuotes = quotes.filter(quote => newFavorites.includes(quote.id));
    setFavoriteQuotes(favQuotes);
  };

  const removeFavorite = (quoteId: number) => {
    const newFavorites = favorites.filter(id => id !== quoteId);
    setFavorites(newFavorites);
    setFavoriteQuotes(favoriteQuotes.filter(quote => quote.id !== quoteId));
    localStorage.setItem("quote-favorites", JSON.stringify(newFavorites));
  };

  const copyToClipboard = async () => {
    if (!currentQuote) return;
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    await navigator.clipboard.writeText(text);
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    if (!currentQuote) return;
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=quotes,inspiration`;
    window.open(url, "_blank");
    setShowShareMenu(false);
  };

  const shareToFacebook = () => {
    if (!currentQuote) return;
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setShowShareMenu(false);
  };

  const shareQuote = (quote: Quote) => {
    const text = `"${quote.text}" - ${quote.author}`;
    if (navigator.share) {
      navigator.share({
        title: "Inspiring Quote",
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const downloadQuote = () => {
    if (!currentQuote) return;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#667eea");
    gradient.addColorStop(1, "#764ba2");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Quote text
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.textAlign = "center";

    // Word wrap the quote text
    const words = currentQuote.text.split(" ");
    let line = "";
    let y = 250;
    const lineHeight = 45;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > 700 && n > 0) {
        ctx.fillText(`"${line}"`, canvas.width / 2, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(`"${line}"`, canvas.width / 2, y);

    // Author
    ctx.font = "24px Arial";
    ctx.fillText(`- ${currentQuote.author}`, canvas.width / 2, y + 80);

    // Download
    const link = document.createElement("a");
    link.download = `quote-${currentQuote.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (currentView === "favorites") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Favorites Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onNavigateToHome}
            className="p-3 rounded-full bg-white/20 dark:bg-gray-800/50 shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-transform backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5 text-white dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100">
              Your Favorites
            </h1>
            <p className="text-white/70 dark:text-gray-400">
              {favoriteQuotes.length} saved quotes
            </p>
          </div>
        </div>

        {/* Favorites List */}
        {favoriteQuotes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start adding quotes to your favorites from the main page
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNavigateToHome}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-colors"
            >
              Discover Quotes
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {favoriteQuotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700 backdrop-blur-md"
              >
                <blockquote className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <cite className="text-blue-600 dark:text-blue-400 font-semibold">
                      — {quote.author}
                    </cite>
                    {quote.category && (
                      <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                        {quote.category}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => shareQuote(quote)}
                      className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                      title="Share quote"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFavorite(quote.id)}
                      className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
        >
          Quote Generator
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 dark:text-gray-300 text-lg"
        >
          Discover inspiration, one quote at a time
        </motion.p>
      </div>

      {/* Navigation Bar */}
      <div className="flex justify-between items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNavigateToFavorites}
          className="flex items-center gap-2 p-3 rounded-full bg-white/20 dark:bg-gray-800/50 shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-transform backdrop-blur-md"
          aria-label="View favorites"
        >
          <Heart className="w-5 h-5 text-red-500" />
          <span className="text-sm font-medium text-white dark:text-gray-300">
            {favorites.length > 0 ? favorites.length : ""}
          </span>
        </motion.button>

        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white/20 dark:bg-gray-800/50 shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-transform backdrop-blur-md"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <RefreshCw className="w-5 h-5 text-yellow-500" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <RefreshCw className="w-5 h-5 text-blue-400" />
            </motion.div>
          )}
        </button>
      </div>

      {/* Quote Card */}
      {currentQuote && (
        <motion.div
          layout
          className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20 dark:border-gray-700 mb-8 backdrop-blur-md"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-100 mb-6 leading-relaxed">
                &ldquo;{currentQuote.text}&rdquo;
              </blockquote>
              <cite className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
                — {currentQuote.author}
              </cite>
              {currentQuote.category && (
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {currentQuote.category}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateNewQuote}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Generating..." : "New Quote"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleFavorite}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg transition-colors ${
            currentQuote && favorites.includes(currentQuote.id)
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
          }`}
        >
          <Heart
            className={`w-5 h-5 ${
              currentQuote && favorites.includes(currentQuote.id) ? "fill-current" : ""
            }`}
          />
          {currentQuote && favorites.includes(currentQuote.id) ? "Favorited" : "Favorite"}
        </motion.button>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share
          </motion.button>

          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 z-10"
              >
                <button
                  onClick={shareToTwitter}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-800 dark:text-gray-200"
                >
                  <Twitter className="w-4 h-4 text-blue-400" />
                  Twitter
                </button>
                <button
                  onClick={shareToFacebook}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-800 dark:text-gray-200"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-800 dark:text-gray-200"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                  Copy
                </button>
                <button
                  onClick={downloadQuote}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-800 dark:text-gray-200"
                >
                  <Download className="w-4 h-4 text-purple-600" />
                  Download
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-white/70 dark:text-gray-400"
      >
        <p>
          {favorites.length > 0 && (
            <>
              You have {favorites.length} favorite quote{favorites.length !== 1 ? "s" : ""} •{" "}
            </>
          )}
          Quote #{currentQuote?.id || 0} of {quotes.length}
        </p>
      </motion.div>

      {/* Footer */}
      <div className="text-center mt-8 text-white/60 dark:text-gray-500">
        <p>Built with ❤️ for inspiration seekers</p>
      </div>
    </div>
  );
}
