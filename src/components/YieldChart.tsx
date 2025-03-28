
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, ReferenceLine } from 'recharts';
import { cn } from '@/lib/utils';

interface YieldChartProps {
  cropType: string;
  predictedYield: number;
  className?: string;
}

const COLORS = ['#eab308', '#22c55e', '#0ea5e9', '#ec4899'];

const YieldChart: React.FC<YieldChartProps> = ({ cropType, predictedYield, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [radarData, setRadarData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  
  useEffect(() => {
    // Create comparison data
    const averageYield = predictedYield * 0.7;
    const topYield = predictedYield * 1.2;
    const lowYield = predictedYield * 0.5;
    
    const data = [
      {
        name: 'Prediction',
        yield: predictedYield,
        fill: '#eab308',
      },
      {
        name: 'Average',
        yield: averageYield,
        fill: '#94a3b8',
      },
      {
        name: 'Top',
        yield: topYield,
        fill: '#22c55e',
      },
      {
        name: 'Low',
        yield: lowYield,
        fill: '#f97316',
      },
    ];
    
    setChartData(data);
    
    // Create radar chart data
    const radarData = [
      { subject: 'Quality', A: predictedYield/topYield * 100, fullMark: 100 },
      { subject: 'Ripeness', A: 70, fullMark: 100 },
      { subject: 'Size', A: 85, fullMark: 100 },
      { subject: 'Weight', A: 90, fullMark: 100 },
      { subject: 'Sweetness', A: 65, fullMark: 100 },
      { subject: 'Acidity', A: 75, fullMark: 100 },
    ];
    setRadarData(radarData);
    
    // Create pie chart data
    const pieData = [
      { name: 'Good', value: 65 },
      { name: 'Average', value: 25 },
      { name: 'Poor', value: 10 },
    ];
    setPieData(pieData);
    
    // Animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [predictedYield]);

  // Format crop type to capitalize first letter
  const formatCropType = (crop: string) => {
    return crop.charAt(0).toUpperCase() + crop.slice(1);
  };

  return (
    <Card className={cn(
      "glass-card border-0 overflow-hidden transition-all duration-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Data Visualization Dashboard</CardTitle>
        <CardDescription>
          Multiple visual representations of {formatCropType(cropType)} quality prediction data
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Bar Chart */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2 text-yellow-800">Yield Comparison</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={40}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false}
                    unit=" t/ha"
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(0, 0, 0, 0.05)'}}
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                  <Bar 
                    dataKey="yield" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Radar Chart */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2 text-yellow-800">Parameter Analysis</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#ca8a04" />
                  <PolarAngleAxis dataKey="subject" stroke="#854d0e" />
                  <Radar name="Values" dataKey="A" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Pie Chart */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2 text-yellow-800">Quality Distribution</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Stacked Bar Chart */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2 text-yellow-800">Confidence Levels</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {name: 'Size', confidence: 85, uncertainty: 15},
                    {name: 'Weight', confidence: 90, uncertainty: 10},
                    {name: 'Sweetness', confidence: 65, uncertainty: 35},
                    {name: 'Ripeness', confidence: 70, uncertainty: 30}
                  ]}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                  <XAxis type="number" tickLine={false} axisLine={false} domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="confidence" stackId="a" fill="#eab308" name="Confidence" />
                  <Bar dataKey="uncertainty" stackId="a" fill="#e5e7eb" name="Uncertainty" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YieldChart;
