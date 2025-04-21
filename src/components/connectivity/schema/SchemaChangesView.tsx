
import React from 'react';
import ClassificationsTable from './ClassificationsTable';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSchemaAnalysis } from '@/hooks/useSchemaAnalysis';

interface SchemaChangesViewProps {
  connectorId?: string;
}

const SchemaChangesView: React.FC<SchemaChangesViewProps> = ({ connectorId }) => {
  const { classifications, isAnalyzing, progress, startAnalysis, refetchClassifications } = useSchemaAnalysis(connectorId);
  
  const isLoading = isAnalyzing;
  const data = classifications;
  const error = null;

  const handleStartAnalysis = async () => {
    await startAnalysis();
    refetchClassifications();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Running schema analysis...</p>
        <Progress value={progress} className="w-64 mt-4" />
        <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error loading classifications: {error.message}</p>
        <Button onClick={() => refetchClassifications()} variant="outline" className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Schema Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <p className="text-muted-foreground mb-6">No schema analysis data available.</p>
          <Button onClick={handleStartAnalysis} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Start Schema Analysis'
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Schema Classifications</h2>
        <Button onClick={handleStartAnalysis} disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Re-analyze Schema'
          )}
        </Button>
      </div>
      <ClassificationsTable classifications={data} />
    </div>
  );
};

export default SchemaChangesView;
