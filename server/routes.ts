import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertPostSchema, insertProjectSchema } from "@shared/schema";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get all AI posts
  app.get("/api/posts/ai", async (req: Request, res: Response) => {
    try {
      const posts = await storage.getPostsByType("ai");
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI posts" });
    }
  });

  // Get specific AI post
  app.get("/api/posts/ai/:id", async (req: Request, res: Response) => {
    try {
      const post = await storage.getPostById(parseInt(req.params.id));
      if (!post || post.type !== "ai") {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Get all Notes
  app.get("/api/posts/notes", async (req: Request, res: Response) => {
    try {
      const posts = await storage.getPostsByType("notes");
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notes" });
    }
  });

  // Get specific Note
  app.get("/api/posts/notes/:id", async (req: Request, res: Response) => {
    try {
      const post = await storage.getPostById(parseInt(req.params.id));
      if (!post || post.type !== "notes") {
        return res.status(404).json({ message: "Note not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch note" });
    }
  });

  // Create a new post
  app.post("/api/posts", async (req: Request, res: Response) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  // Create a new project
  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);

      // In a real implementation, you would use environment variables for email config
      // This is a mock implementation for demonstration
      const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || "",
          pass: process.env.EMAIL_PASS || "",
        },
      });

      try {
        // Since we're using a mock SMTP server, we'll just simulate sending
        // In a real implementation, you would uncomment this and use real credentials
        /*
        await transporter.sendMail({
          from: '"Portfolio Contact" <contact@example.com>',
          to: "sudm711@gmail.com",
          subject: `Contact Form: ${contactData.subject}`,
          text: `
            Name: ${contactData.name}
            Email: ${contactData.email}
            
            Message:
            ${contactData.message}
          `,
          html: `
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${contactData.message}</p>
          `,
        });
        */
        
        // Simulating success
        res.status(201).json({ message: "Message sent successfully" });
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Even if email fails, we've still saved the contact message
        res.status(201).json({ 
          message: "Contact information saved, but email delivery failed",
          contact
        });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
