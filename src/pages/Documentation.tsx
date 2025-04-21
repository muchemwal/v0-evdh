
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Book, FileCode, HelpCircle, Search } from "lucide-react";

interface DocItem {
  id: string;
  title: string;
  description: string;
  category: "user" | "api" | "architecture" | "faq";
  lastUpdated: string;
}

const sampleDocs: DocItem[] = [
  {
    id: "doc-001",
    title: "Getting Started Guide",
    description: "An introduction to the EV Data Hub platform and its core features.",
    category: "user",
    lastUpdated: "2025-03-15"
  },
  {
    id: "doc-002",
    title: "Data Catalog User Guide",
    description: "How to effectively use and manage assets in the data catalog.",
    category: "user",
    lastUpdated: "2025-03-20"
  },
  {
    id: "doc-003",
    title: "GraphQL API Reference",
    description: "Complete reference for all GraphQL endpoints, queries and mutations.",
    category: "api",
    lastUpdated: "2025-04-05"
  },
  {
    id: "doc-004",
    title: "REST API Authentication",
    description: "Guide to authentication methods for REST API access.",
    category: "api",
    lastUpdated: "2025-04-10"
  },
  {
    id: "doc-005",
    title: "System Architecture Overview",
    description: "High-level architecture of the EV Data Hub platform components.",
    category: "architecture",
    lastUpdated: "2025-03-25"
  },
  {
    id: "doc-006",
    title: "Data Lineage Implementation",
    description: "Technical details on how data lineage is tracked and visualized.",
    category: "architecture",
    lastUpdated: "2025-04-01"
  },
  {
    id: "doc-007",
    title: "Frequently Asked Questions",
    description: "Answers to common questions about the platform and its usage.",
    category: "faq",
    lastUpdated: "2025-04-12"
  },
  {
    id: "doc-008",
    title: "Troubleshooting Guide",
    description: "Solutions to common issues and problems on the platform.",
    category: "faq",
    lastUpdated: "2025-04-14"
  }
];

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredDocs = sampleDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || doc.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "user":
        return <Book className="h-4 w-4" />;
      case "api":
        return <FileCode className="h-4 w-4" />;
      case "architecture":
        return <FileText className="h-4 w-4" />;
      case "faq":
        return <HelpCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Documentation</h1>
        <Button>+ Add Document</Button>
      </div>
      
      <div className="relative w-full mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documentation..."
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="user">User Guides</TabsTrigger>
          <TabsTrigger value="api">API Documentation</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredDocs.map(doc => (
              <Card key={doc.id} className="cursor-pointer hover:bg-accent/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      {getCategoryIcon(doc.category)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {doc.description}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Last updated: {doc.lastUpdated}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredDocs.length === 0 && (
              <div className="text-center py-12 border border-dashed border-border rounded-lg col-span-2 mt-6">
                <p className="text-muted-foreground">No documents match your search criteria.</p>
                <Button variant="link" onClick={() => {
                  setSearchTerm("");
                  setActiveTab("all");
                }}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Documentation;
