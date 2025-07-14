import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all quotes
  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });

  // Get random quote
  app.get("/api/quotes/random", async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      if (quotes.length === 0) {
        return res.status(404).json({ error: "No quotes available" });
      }
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      res.json(randomQuote);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch random quote" });
    }
  });

  // Get quote by ID
  app.get("/api/quotes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const quote = await storage.getQuoteById(id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      res.json(quote);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quote" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
