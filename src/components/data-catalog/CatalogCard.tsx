
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DataClassification } from "@/lib/types";
import AccessRequestForm from "./AccessRequestForm";
import CloudProviderSelector from "./CloudProviderSelector";
import { AssetType, CloudProvider, DataAsset } from "@/lib/governance-types";

interface CatalogCardProps {
  id: string;
  title: string;
  description: string;
  type: AssetType;
  domain: string;
  classifications: DataClassification[];
  owner: string;
  lastUpdated: string;
  typeIcon?: React.ReactNode;
  cloudPlatform?: CloudProvider;
  cloudIcon?: React.ReactNode;
}

const CatalogCard = ({
  id,
  title,
  description,
  type,
  domain,
  classifications,
  owner,
  lastUpdated,
  typeIcon,
  cloudPlatform,
  cloudIcon
}: CatalogCardProps) => {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  
  const asset: DataAsset = {
    id,
    title,
    description,
    type,
    domain,
    classification: classifications,
    cloudPlatform: cloudPlatform as CloudProvider,
    owner,
    lastUpdated
  };

  return (
    <>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {typeIcon && <div className="p-1.5 bg-accent/20 rounded">{typeIcon}</div>}
              <h3 className="font-medium line-clamp-1">{title}</h3>
            </div>
            {cloudPlatform && (
              <CloudProviderSelector 
                provider={cloudPlatform} 
                size="sm"
                showLabel 
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {classifications.map((classification, index) => (
              <Badge key={index} variant="outline">{classification}</Badge>
            ))}
          </div>
          
          <div className="flex flex-col gap-1 text-xs text-muted-foreground mb-3">
            <div className="flex items-center justify-between">
              <span>Domain:</span>
              <span className="font-medium">{domain}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Owner:</span>
              <span className="font-medium">{owner}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Updated:</span>
              <span className="font-medium flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-auto pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              View Details
            </Button>
            <Button size="sm" className="flex-1" onClick={() => setIsRequestDialogOpen(true)}>
              Request Access
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <AccessRequestForm 
            asset={asset} 
            onClose={() => setIsRequestDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CatalogCard;
