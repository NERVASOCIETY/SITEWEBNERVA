import express from "express";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Supabase Client
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn("WARNING: Supabase URL or Anon Key is missing from .env!");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // API endpoint for contact submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, company, service, message } = req.body;

      if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: "Tous les champs obligatoires doivent être remplis." });
      }

      console.log("Reçu de soumission de contact:", { name, email, phone, company, service });

      // Insert into Supabase table: 'contacts'
      const { data, error } = await supabase
        .from("contacts")
        .insert([
          {
            name,
            email,
            phone,
            company: company || null,
            service: service || null,
            message,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error("Erreur lors de l'insertion dans Supabase (contacts):", error);
        
        // Let's fallback: maybe the table is named 'leads' (or similar)
        console.log("Tentative d'insertion alternative dans 'leads'...");
        const { data: leadData, error: leadError } = await supabase
          .from("leads")
          .insert([
            {
              name,
              email,
              phone,
              company: company || null,
              service: service || null,
              message,
              created_at: new Date().toISOString()
            }
          ])
          .select();

        if (leadError) {
          console.error("Erreur lors de l'insertion alternative (leads):", leadError);
          
          return res.status(500).json({ 
            success: false, 
            error: "Impossible de sauvegarder la soumission dans les tables 'contacts' ou 'leads'.",
            details: error.message || leadError.message,
            sqlNeeded: `CREATE TABLE IF NOT EXISTS contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  service text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);`
          });
        } else {
          return res.json({ success: true, table: "leads", data: leadData });
        }
      }

      return res.json({ success: true, table: "contacts", data });
    } catch (err: any) {
      console.error("Erreur serveur inattendue:", err);
      return res.status(500).json({ success: false, error: "Erreur serveur interne.", details: err.message });
    }
  });

  // Live GET endpoint to view recent submissions
  app.get("/api/contacts", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        const { data: leadData, error: leadError } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });
          
        if (leadError) {
          return res.status(500).json({ 
            error: "Impossible de récupérer les contacts depuis Supabase.", 
            details: error.message || leadError.message 
          });
        }
        return res.json({ table: "leads", data: leadData });
      }
      return res.json({ table: "contacts", data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
