import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BananaImageProps {
  color: string;
  spotting: string;
  shape: string;
  className?: string;
}

const BananaImage: React.FC<BananaImageProps> = ({ color, spotting, shape, className }) => {
  // Function to determine the image URL based on banana characteristics
  const getBananaImageUrl = () => {
    // Select different banana images based on characteristics
    if (color === "green") {
      return "/uploads/fc75f0d9-e503-4d40-8f09-7cfa71776850.png";
    } else if (color === "yellow-brown" || spotting === "significant") {
      return "https://images.unsplash.com/photo-1543218024-57a70143c369?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    }

    // Default banana image
    return "/uploads/default-banana.png";
  };

  // Get appropriate CSS classes based on banana characteristics
  const getImageFilters = () => {
    let filters = "";

    if (color === "green-yellow") {
      filters += "hue-rotate(10deg) saturate(1.2) ";
    } else if (color === "yellow-brown") {
      filters += "sepia(30%) saturate(1.1) ";
    }

    if (spotting === "minimal") {
      filters += "contrast(1.05) ";
    } else if (spotting === "significant") {
      filters += "contrast(1.1) brightness(0.95) ";
    }

    return filters.trim();
  };

  const getRipeningData = () => {
    return [
      { day: 1, ripeness: 10, sweetness: 5 },
      { day: 2, ripeness: 20, sweetness: 15 },
      { day: 3, ripeness: 35, sweetness: 25 },
      { day: 4, ripeness: 55, sweetness: 40 },
      { day: 5, ripeness: 70, sweetness: 60 },
      { day: 6, ripeness: 85, sweetness: 75 },
      { day: 7, ripeness: 95, sweetness: 85 },
    ];
  };

  return (
    <Card className={cn("overflow-hidden animate-fade-in", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="relative w-full h-48 overflow-hidden rounded-lg mb-6 bg-yellow-100">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-200/20 z-10 rounded-lg"></div>
            <img 
              src={getBananaImageUrl()} 
              alt="Predicted Banana Appearance" 
              className="w-full h-full object-contain"
              style={{ 
                filter: getImageFilters(),
                transform: shape === "short and thick" ? "scale(0.9)" : 
                          shape === "long and thin" ? "scale(1.1) rotate(5deg)" : "rotate(0deg)"
              }}
            />
          </div>

          <div className="w-full mb-6">
            <h3 className="text-lg font-medium mb-3 text-yellow-800">Visual Prediction</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <p className="text-xs text-yellow-700">Color</p>
                <p className="font-medium text-sm">{color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <p className="text-xs text-yellow-700">Spotting</p>
                <p className="font-medium text-sm">{spotting.charAt(0).toUpperCase() + spotting.slice(1)}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <p className="text-xs text-yellow-700">Shape</p>
                <p className="font-medium text-sm">{shape.charAt(0).toUpperCase() + shape.slice(1)}</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-sm font-medium mb-2 text-yellow-800">Ripening Timeline</h3>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getRipeningData()}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="day" label={{ value: 'Days', position: 'bottom', offset: -5 }} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    labelFormatter={(label) => `Day ${label}`}
                  />
                  <Line type="monotone" dataKey="ripeness" stroke="#eab308" strokeWidth={2} dot={{ strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="sweetness" stroke="#22c55e" strokeWidth={2} dot={{ strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 text-xs">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                  <span>Ripeness</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                  <span>Sweetness</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BananaImage;
