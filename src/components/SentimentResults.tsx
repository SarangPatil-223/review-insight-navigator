
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

// Sample data for demonstration
const sentimentData = [
  { name: "Positive", value: 65, color: "#10b981" },
  { name: "Neutral", value: 20, color: "#6b7280" },
  { name: "Negative", value: 15, color: "#ef4444" },
];

const wordFrequencyData = [
  { word: "Reliable", count: 45 },
  { word: "Durable", count: 38 },
  { word: "Value", count: 32 },
  { word: "Quality", count: 28 },
  { word: "Easy", count: 24 },
];

const reviewScoreData = [
  { name: "5★", value: 120, fill: "#10b981" },
  { name: "4★", value: 75, fill: "#60a5fa" },
  { name: "3★", value: 40, fill: "#fbbf24" },
  { name: "2★", value: 18, fill: "#f97316" },
  { name: "1★", value: 12, fill: "#ef4444" },
];

// Content analysis & scoring
const contentScores = [
  { name: "Feature Satisfaction", score: 78 },
  { name: "Value for Money", score: 82 },
  { name: "Durability", score: 67 },
  { name: "Customer Service", score: 58 },
];

const SentimentResults = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Sentiment Overview */}
      <Card className="card-hover border border-white/10 bg-secondary/30">
        <CardHeader>
          <CardTitle>Sentiment Analysis</CardTitle>
          <CardDescription>Overall sentiment breakdown of reviews</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rating Distribution */}
      <Card className="card-hover border border-white/10 bg-secondary/30">
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
          <CardDescription>Star rating breakdown</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reviewScoreData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Common Keywords */}
      <Card className="card-hover border border-white/10 bg-secondary/30">
        <CardHeader>
          <CardTitle>Common Keywords</CardTitle>
          <CardDescription>Frequently mentioned terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wordFrequencyData.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.word}</span>
                  <span className="text-sm text-muted-foreground">{item.count} mentions</span>
                </div>
                <Progress value={item.count * 2} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Score Analysis */}
      <Card className="card-hover border border-white/10 bg-secondary/30">
        <CardHeader>
          <CardTitle>Product Score Analysis</CardTitle>
          <CardDescription>Sentiment scores by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentScores.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.score}/100</span>
                </div>
                <Progress
                  value={item.score}
                  className="h-2"
                  style={{
                    background: "#27272a",
                    backgroundImage: "linear-gradient(to right, #ef4444, #10b981)"
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentResults;
