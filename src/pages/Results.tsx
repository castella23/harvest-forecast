
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ResultsCard from '@/components/ResultsCard';
import YieldChart from '@/components/YieldChart';
import BananaImage from '@/components/BananaImage';
import { toast } from '@/hooks/use-toast';
import { 
  predictBananaQuality, 
  generateRecommendations, 
  getBananaVisualCharacteristics,
  predictCropYield,
  BananaData 
} from '@/utils/mockData';
import { BarChart } from 'lucide-react';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BananaData | null>(null);
  const [results, setResults] = useState({
    quality: 'Good',
    confidence: 0,
    recommendations: [''],
    visualCharacteristics: {
      color: 'yellow',
      spotting: 'minimal',
      shape: 'classic curved',
      visualDescription: ''
    }
  });

  useEffect(() => {
    // Retrieve form data from sessionStorage
    const storedData = sessionStorage.getItem('bananaQualityData');
    
    if (!storedData) {
      toast({
        title: "Error",
        description: "No prediction data found. Please submit the form first.",
        variant: "destructive"
      });
      navigate('/predict');
      return;
    }
    
    const parsedData = JSON.parse(storedData) as BananaData;
    setFormData(parsedData);
    
    // Generate prediction using the banana data
    const prediction = predictBananaQuality(parsedData);
    
    // Generate recommendations
    const recommendations = generateRecommendations(parsedData);
    
    // Get visual characteristics
    const visualCharacteristics = getBananaVisualCharacteristics(parsedData);
    
    setResults({
      quality: prediction.quality,
      confidence: prediction.confidence,
      recommendations,
      visualCharacteristics
    });
  }, [navigate]);

  if (!formData) {
    return null; // Or a loading state
  }

  // Get yield prediction for chart
  const yieldPrediction = predictCropYield(formData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-4 animate-fade-in text-yellow-800">
            Banana Quality Data Visualization
          </h1>
          <p className="text-yellow-700 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Visual ML representations of banana quality predictions based on input parameters
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResultsCard
              quality={results.quality}
              confidence={results.confidence}
              recommendations={results.recommendations}
              visualDescription={results.visualCharacteristics.visualDescription}
              className="lg:col-span-2 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200"
            />
            
            {/* Banner image row */}
            <div className="lg:col-span-2 rounded-xl overflow-hidden h-48 md:h-64 mb-4">
              <div className="w-full h-full relative bg-yellow-200">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-yellow-100/30"></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col text-yellow-900">
                  <BarChart className="h-12 w-12 mb-4 opacity-80" />
                  <h2 className="text-2xl md:text-3xl font-display font-medium">ML Visualization Dashboard</h2>
                </div>
              </div>
            </div>
            
            <BananaImage
              color={results.visualCharacteristics.color}
              spotting={results.visualCharacteristics.spotting}
              shape={results.visualCharacteristics.shape}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200"
            />
            
            <div className="glass-card border-0 p-6 rounded-xl animate-fade-in animate-delay-200 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <h3 className="text-xl font-display font-medium mb-4 text-yellow-800">Input Parameters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-yellow-700">Size</p>
                  <p className="font-medium">{formData.size.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Weight</p>
                  <p className="font-medium">{formData.weight.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Sweetness</p>
                  <p className="font-medium">{formData.sweetness.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Softness</p>
                  <p className="font-medium">{formData.softness.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Harvest Time</p>
                  <p className="font-medium">{formData.harvestTime.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Ripeness</p>
                  <p className="font-medium">{formData.ripeness.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Acidity</p>
                  <p className="font-medium">{formData.acidity.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <YieldChart
              cropType="banana"
              predictedYield={yieldPrediction.yield}
              className="lg:col-span-2 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
