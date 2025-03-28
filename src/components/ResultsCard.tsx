
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsCardProps {
  quality: string;
  confidence: number;
  recommendations: string[];
  visualDescription: string;
  className?: string;
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  quality,
  confidence,
  recommendations,
  visualDescription,
  className,
}) => {
  // Determine status color based on quality
  const getQualityStatusColor = (quality: string) => {
    return quality === 'Good' ? 'text-green-600' : 'text-red-500';
  };

  return (
    <Card className={cn("overflow-hidden animate-fade-in", className)}>
      <CardHeader className="pb-4 bg-yellow-50/50">
        <div className="flex items-center">
          <BarChart2 className="h-6 w-6 text-yellow-600 mr-2" />
          <CardTitle className="text-2xl text-yellow-800">ML Prediction Results</CardTitle>
        </div>
        <CardDescription className="text-yellow-700">
          Machine learning model prediction based on input parameters visualization
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center p-4 bg-yellow-100/50 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-yellow-700">Predicted Quality</h4>
            <p className={cn("text-3xl font-display font-medium", getQualityStatusColor(quality))}>
              {quality}
            </p>
            <p className="text-sm text-yellow-700 mt-1">{visualDescription}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <h4 className="text-sm font-medium text-yellow-700">Confidence</h4>
              <p className="text-xl font-medium">{confidence}%</p>
            </div>
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center" 
              style={{
                background: `conic-gradient(#eab308 ${confidence}%, transparent 0)`,
              }}
            >
              <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-sm font-medium">
                {confidence}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-yellow-800">Model Insights</h3>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-800 flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-yellow-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-4 flex-wrap bg-yellow-50/50">
        <Button variant="outline" asChild className="button-hover bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border-yellow-300">
          <Link to="/predict" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Parameters
          </Link>
        </Button>
        <Button variant="outline" className="button-hover bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border-yellow-300">
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsCard;
