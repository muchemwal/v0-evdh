
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import pages
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import DataCatalog from "@/pages/DataCatalog";
import Connectors from "@/pages/Connectors";
import Architecture from "@/pages/Architecture";
import DataLineage from "@/pages/DataLineage";
import Governance from "@/pages/Governance";
import Documentation from "@/pages/Documentation";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Workflows from "@/pages/Workflows";

// Import Supabase client
import { supabase } from "@/integrations/supabase/client";
import { seedSupabaseData } from "@/lib/supabaseSeeder";
import { LanguageProvider } from "@/contexts/LanguageContext";

function App() {
  const { toast } = useToast();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          await supabase.auth.signInAnonymously({});
        }
        const result = await seedSupabaseData(supabase);
        if (result) {
          console.log("Database seeded successfully");
        } else {
          console.warn("Database seeding skipped or failed");
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        toast({
          title: "Initialization Error",
          description: "Failed to initialize the application. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, [toast]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-xl font-medium text-gray-600">Initializing Application...</p>
        </div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data-catalog" element={<DataCatalog />} />
            <Route path="/connectors" element={<Connectors />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/data-lineage" element={<DataLineage />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
