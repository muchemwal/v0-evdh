
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DataSourceType } from "@/lib/types";
import TranslatedText from "@/components/ui/translated-text";

interface ConnectorProps {
  name: string;
  type: DataSourceType;
  health: number;
  assets: number;
  lastSync: string;
}

const connectors: ConnectorProps[] = [
  {
    name: "Vehicle Telemetry API",
    type: DataSourceType.API,
    health: 98,
    assets: 1243,
    lastSync: "2 minutes ago"
  },
  {
    name: "Customer Database",
    type: DataSourceType.DATABASE,
    health: 100,
    assets: 58,
    lastSync: "5 minutes ago"
  },
  {
    name: "Charging Station Network",
    type: DataSourceType.IOT_DEVICE,
    health: 87,
    assets: 432,
    lastSync: "12 minutes ago"
  },
  {
    name: "Manufacturing Data Lake",
    type: DataSourceType.FILE_SYSTEM,
    health: 100,
    assets: 875,
    lastSync: "1 hour ago"
  }
];

export function ConnectorStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TranslatedText textEn="Data Source Health" textAr="صحة مصدر البيانات" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {connectors.map((connector) => (
            <div key={connector.name} className="flex flex-col space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  <TranslatedText 
                    textEn={connector.name} 
                    textAr={getArabicConnectorName(connector.name)} 
                  />
                </span>
                <span className="text-muted-foreground text-xs flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-1 ${
                    connector.health > 90 ? 'bg-green-500' : 
                    connector.health > 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></span>
                  <TranslatedText 
                    textEn={`${connector.health}% uptime`} 
                    textAr={`${connector.health}% وقت التشغيل`} 
                  />
                </span>
              </div>
              <Progress value={connector.health} className="h-1" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  <TranslatedText 
                    textEn={`${connector.assets} assets`}
                    textAr={`${connector.assets} أصول`}
                  />
                </span>
                <span>
                  <TranslatedText 
                    textEn={`Last sync: ${connector.lastSync}`}
                    textAr={`آخر مزامنة: ${getArabicTime(connector.lastSync)}`}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Helper functions for Arabic translations
function getArabicConnectorName(englishName: string): string {
  const translations: Record<string, string> = {
    "Vehicle Telemetry API": "واجهة برمجة تطبيقات تليمتري المركبات",
    "Customer Database": "قاعدة بيانات العملاء",
    "Charging Station Network": "شبكة محطات الشحن",
    "Manufacturing Data Lake": "بحيرة بيانات التصنيع"
  };
  return translations[englishName] || englishName;
}

function getArabicTime(englishTime: string): string {
  const translations: Record<string, string> = {
    "2 minutes ago": "قبل دقيقتين",
    "5 minutes ago": "قبل 5 دقائق",
    "12 minutes ago": "قبل 12 دقيقة",
    "1 hour ago": "قبل ساعة واحدة"
  };
  return translations[englishTime] || englishTime;
}

export default ConnectorStatusCard;
