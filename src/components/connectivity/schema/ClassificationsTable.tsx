
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DataClassification } from "@/lib/types";

interface ClassificationsTableProps {
  classifications: Array<{
    field_name: string;
    field_type: string;
    classification: string;
    confidence: number;
  }>;
}

const ClassificationsTable = ({ classifications }: ClassificationsTableProps) => {
  const getClassificationColor = (classification: DataClassification) => {
    switch (classification) {
      case DataClassification.PII:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case DataClassification.PHI:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case DataClassification.TELEMETRY:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case DataClassification.DIAGNOSTIC:
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300";
      case DataClassification.OPERATIONAL:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case DataClassification.FINANCIAL:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case DataClassification.CONFIDENTIAL:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Classification</TableHead>
          <TableHead className="text-right">Confidence</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classifications.map((item) => (
          <TableRow key={item.field_name}>
            <TableCell className="font-medium">{item.field_name}</TableCell>
            <TableCell>{item.field_type}</TableCell>
            <TableCell>
              <Badge className={getClassificationColor(item.classification as DataClassification)}>
                {item.classification}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {Math.round(item.confidence * 100)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClassificationsTable;
