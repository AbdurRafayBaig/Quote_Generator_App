import { users, quotes, type User, type InsertUser, type Quote, type InsertQuote } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getQuotes(): Promise<Quote[]>;
  getQuoteById(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quotes: Map<number, Quote>;
  private currentUserId: number;
  private currentQuoteId: number;

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    this.currentUserId = 1;
    this.currentQuoteId = 1;

    // Initialize with sample quotes
    this.initializeSampleQuotes();
  }

  private initializeSampleQuotes() {
    const sampleQuotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "motivation"
      },
      {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
        category: "life"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "dreams"
      },
      {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        category: "inspiration"
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success"
      },
      {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        category: "motivation"
      },
      {
        text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        author: "Martin Luther King Jr.",
        category: "friendship"
      },
      {
        text: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde",
        category: "authenticity"
      }
    ];

    sampleQuotes.forEach(quote => {
      this.createQuote(quote);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuoteById(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++;
    const quote: Quote = { ...insertQuote, id };
    this.quotes.set(id, quote);
    return quote;
  }
}

export const storage = new MemStorage();
