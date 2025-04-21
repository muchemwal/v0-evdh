
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileSearch } from "lucide-react";
import ClassificationsTable from "./schema/ClassificationsTable";
import SchemaChangesView from "./schema/SchemaChangesView";
import { useSchemaAnalysis } from "@/hooks/useSchemaAnalysis";

interface SchemaAnalysisCardProps {
  connectorId: string;
  onAnalysisComplete?: (results: any) => void;
}

const SchemaAnalysisCard = ({ connectorId, onAnalysisComplete }: SchemaAnalysisCardProps) => {
  const {
    classifications,
    isAnalyzing,
    progress,
    startAnalysis
  } = useSchemaAnalysis(connectorId);

  const handleAnalysis = async () => {
    try {
      const results = await startAnalysis();
      if (onAnalysisComplete) {
        onAnalysisComplete(results);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <FileSearch className="h-5 w-5 mr-2" />
          Schema Analysis & Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAnalyzing && !classifications && (
          <div className="text-center p-6 border border-dashed border-border rounded-md">
            <p className="mb-4 text-sm text-muted-foreground">
              Run a smart analysis on this connector to detect schema changes and suggest data classifications.
            </p>
            <Button onClick={handleAnalysis}>
              Start Analysis
            </Button>
          </div>
        )}
        
        {isAnalyzing && (
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Analyzing schema and detecting classifications...
            </p>
            <Progress value={progress} className="h-1" />
            <p className="text-center text-xs text-muted-foreground">
              {progress}% complete
            </p>
          </div>
        )}
        
        {classifications && (
          <Tabs defaultValue="classifications">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="classifications">Classifications</TabsTrigger>
              <TabsTrigger value="changes">Schema Changes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="classifications" className="pt-4 space-y-4">
              <div className="flex justify-between mb-2">
                <div className="text-sm">
                  <span className="font-medium">{classifications.length}</span>
                  <span className="text-muted-foreground"> fields classified</span>
                </div>
              </div>
              
              <ClassificationsTable classifications={classifications} />
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  Apply All Classifications
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="changes" className="pt-4 space-y-4">
              <SchemaChangesView connectorId={connectorId} />
            </TabsContent>
          </Tabs>
        )}
        
        {classifications && (
          <div className="text-right">
            <Button variant="outline" size="sm" onClick={handleAnalysis} className="mt-2">
              Re-analyze Schema
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SchemaAnalysisCard;
