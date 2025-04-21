import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DataClassification } from "@/lib/types";
import CatalogCard from "@/components/data-catalog/CatalogCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Cloud, Database, FileText, Code } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { createAsset } from "@/api/assets";
import { CloudProvider, AssetType } from "@/lib/governance-types";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["stream", "database", "api", "dataset"]),
  domain: z.string().min(1, "Domain is required"),
  classification: z.array(z.nativeEnum(DataClassification)).min(1, "At least one classification is required"),
  cloudPlatform: z.enum(["aws", "azure", "gcp", "palantir"]),
});

type FormValues = z.infer<typeof formSchema>;

interface CloudProviderData {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const cloudProviders: CloudProviderData[] = [
  { id: "aws", name: "AWS", icon: <Cloud className="h-5 w-5 text-yellow-500" /> },
  { id: "azure", name: "Azure", icon: <Cloud className="h-5 w-5 text-blue-500" /> },
  { id: "gcp", name: "Google Cloud", icon: <Cloud className="h-5 w-5 text-green-500" /> },
  { id: "palantir", name: "Palantir", icon: <Code className="h-5 w-5 text-red-500" /> },
];

const getAssetTypeIcon = (type: string) => {
  switch (type) {
    case "stream": return <Code className="h-5 w-5" />;
    case "database": return <Database className="h-5 w-5" />;
    case "api": return <Cloud className="h-5 w-5" />;
    case "dataset": return <FileText className="h-5 w-5" />;
    default: return <FileText className="h-5 w-5" />;
  }
};

const DataCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [classificationFilter, setClassificationFilter] = useState("all");
  const [cloudFilter, setCloudFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [catalogItems, setCatalogItems] = useState<any[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "dataset",
      domain: "",
      classification: [],
      cloudPlatform: "aws",
    },
  });

  const handleAddAsset = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await createAsset({
        name: values.title,
        description: values.description,
        type: values.type,
        cloud: values.cloudPlatform,
      });
      
      toast({
        title: "Success",
        description: `Data asset created successfully in ${values.cloudPlatform.toUpperCase()}`,
        variant: "default",
      });

      fetchDataAssets();
      
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create data asset",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataAssets = async () => {
    try {
      const { data, error } = await supabase
        .from("data_assets")
        .select("*")
        .order("last_updated", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const transformedData = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          type: item.type,
          domain: item.domain,
          classification: item.classification,
          owner: item.owner_name,
          lastUpdated: item.last_updated,
          cloudPlatform: item.cloud_platform,
        }));
        setCatalogItems(transformedData);
      }
    } catch (error) {
      console.error("Error fetching data assets:", error);
      toast({
        title: "Error",
        description: "Failed to load data assets",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDataAssets();
  }, [toast]);

  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === "all" || item.domain === domainFilter;
    const matchesClassification = classificationFilter === "all" || 
                                  item.classification.includes(classificationFilter);
    const matchesCloud = cloudFilter === "all" || item.cloudPlatform === cloudFilter;
    
    return matchesSearch && matchesDomain && matchesClassification && matchesCloud;
  });
  
  const uniqueDomains = [...new Set(catalogItems.map(item => item.domain))];

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Catalog</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>+ Add Data Asset</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Data Asset</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddAsset)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter asset title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="stream">Stream</SelectItem>
                            <SelectItem value="database">Database</SelectItem>
                            <SelectItem value="api">API</SelectItem>
                            <SelectItem value="dataset">Dataset</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select domain" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {uniqueDomains.map(domain => (
                              <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                            ))}
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cloudPlatform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cloud Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cloud" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cloudProviders.map(provider => (
                              <SelectItem key={provider.id} value={provider.id}>
                                <div className="flex items-center gap-2">
                                  {provider.icon}
                                  <span>{provider.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="classification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classification</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const current = field.value;
                          const newValue = current.includes(value as DataClassification)
                            ? current.filter(v => v !== value)
                            : [...current, value as DataClassification];
                          field.onChange(newValue);
                        }}
                        value=""
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select classifications">
                              {field.value.length > 0 
                                ? field.value.join(", ") 
                                : "Select classifications"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(DataClassification).map(classification => (
                            <SelectItem 
                              key={classification} 
                              value={classification}
                              className={field.value.includes(classification) ? "bg-accent" : ""}
                            >
                              {classification}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Creating..." : "Create"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            placeholder="Search data assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-xs"
          />
          
          <div className="flex flex-1 flex-wrap gap-2 sm:justify-end">
            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                {uniqueDomains.map(domain => (
                  <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={classificationFilter} onValueChange={setClassificationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by classification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classifications</SelectItem>
                {Object.values(DataClassification).map(classification => (
                  <SelectItem key={classification} value={classification}>
                    {classification}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={cloudFilter} onValueChange={setCloudFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by cloud" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clouds</SelectItem>
                {cloudProviders.map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex items-center gap-2">
                      {provider.icon}
                      <span>{provider.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="grid">
          <div className="flex justify-end mb-4">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="grid" className="mt-0">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-md">
                <p className="text-muted-foreground">No data assets found matching your filters.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <CatalogCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    type={item.type as AssetType}
                    domain={item.domain}
                    classifications={item.classification}
                    owner={item.owner}
                    lastUpdated={item.lastUpdated}
                    typeIcon={getAssetTypeIcon(item.type)}
                    cloudPlatform={item.cloudPlatform as CloudProvider}
                    cloudIcon={cloudProviders.find(cp => cp.id === item.cloudPlatform)?.icon}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-md">
                <p className="text-muted-foreground">No data assets found matching your filters.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <div key={item.id} className="flex items-start p-4 border rounded-md hover:bg-accent/5">
                    <div className="mr-4 p-2 bg-accent/10 rounded-md">
                      {getAssetTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className="text-xs bg-accent/20 px-2 py-0.5 rounded">
                          {item.domain}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>Owner: {item.owner}</span>
                        <span>Updated: {new Date(item.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        {cloudProviders.find(cp => cp.id === item.cloudPlatform)?.icon}
                        <span className="text-xs">{item.cloudPlatform.toUpperCase()}</span>
                      </div>
                      <div className="flex gap-1">
                        {item.classification.map((cls) => (
                          <span key={cls} className="text-xs bg-secondary px-1 py-0.5 rounded">
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DataCatalog;
