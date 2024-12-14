import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: number;
}

export function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <Card className="p-6">
      <CardContent className="p-0 space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
