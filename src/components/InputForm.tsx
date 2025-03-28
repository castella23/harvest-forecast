
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { ArrowRight, Loader2, Banana } from 'lucide-react';

interface FormData {
  size: number;
  weight: number;
  sweetness: number;
  softness: number;
  harvestTime: number;
  ripeness: number;
  acidity: number;
}

const InputForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    size: 0,
    weight: 1.5,
    sweetness: 2.0,
    softness: -1.5,
    harvestTime: -0.5,
    ripeness: 2.0,
    acidity: 1.0
  });

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);

    // Store form data in sessionStorage to access in the results page
    sessionStorage.setItem('bananaQualityData', JSON.stringify(formData));
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Prediction complete!",
      });
      navigate('/results');
    }, 1500);
  };

  // Range limits for sliders (based on dataset ranges)
  const sliderRanges = {
    size: [-3, 3],
    weight: [0, 4],
    sweetness: [-3, 5],
    softness: [-3, 3],
    harvestTime: [-3, 3],
    ripeness: [0, 4],
    acidity: [0, 5]
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <Card className="glass-card border-0 overflow-hidden transition-all duration-300 animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Banana className="w-6 h-6 text-yellow-500" />
            <CardTitle className="text-2xl">Banana Quality Prediction</CardTitle>
          </div>
          <CardDescription>
            Enter your banana parameters to predict its quality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Size (normalized)</Label>
                <span className="text-sm text-muted-foreground">{formData.size.toFixed(2)}</span>
              </div>
              <Slider 
                value={[formData.size]} 
                min={sliderRanges.size[0]} 
                max={sliderRanges.size[1]} 
                step={0.1}
                onValueChange={(value) => handleSliderChange('size', value)} 
              />
              <p className="text-xs text-muted-foreground">Range from small (-3) to large (3)</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Weight (normalized)</Label>
                <span className="text-sm text-muted-foreground">{formData.weight.toFixed(2)}</span>
              </div>
              <Slider 
                value={[formData.weight]} 
                min={sliderRanges.weight[0]} 
                max={sliderRanges.weight[1]} 
                step={0.1}
                onValueChange={(value) => handleSliderChange('weight', value)} 
              />
              <p className="text-xs text-muted-foreground">Range from light (0) to heavy (4)</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Sweetness (normalized)</Label>
                <span className="text-sm text-muted-foreground">{formData.sweetness.toFixed(2)}</span>
              </div>
              <Slider 
                value={[formData.sweetness]} 
                min={sliderRanges.sweetness[0]} 
                max={sliderRanges.sweetness[1]} 
                step={0.1}
                onValueChange={(value) => handleSliderChange('sweetness', value)} 
              />
              <p className="text-xs text-muted-foreground">Range from not sweet (-3) to very sweet (5)</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Softness (normalized)</Label>
                <span className="text-sm text-muted-foreground">{formData.softness.toFixed(2)}</span>
              </div>
              <Slider 
                value={[formData.softness]} 
                min={sliderRanges.softness[0]} 
                max={sliderRanges.softness[1]} 
                step={0.1}
                onValueChange={(value) => handleSliderChange('softness', value)} 
              />
              <p className="text-xs text-muted-foreground">Range from firm (-3) to soft (3)</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Harvest Time (normalized)</Label>
                <span className="text-sm text-muted-foreground">{formData.harvestTime.toFixed(2)}</span>
              </div>
              <Slider 
                value={[formData.harvestTime]} 
                min={sliderRanges.harvestTime[0]} 
                max={sliderRanges.harvestTime[1]} 
                step={0.1}
                onValueChange={(value) => handleSliderChange('harvestTime', value)} 
              />
              <p className="text-xs text-muted-foreground">Range from early (-3) to late (3)</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Ripeness (normalized)</Label>
                <span className="text-sm text-muted-foreground">{formData.ripeness.toFixed(2)}</span>
              </div>
              <Slider 
                value={[formData.ripeness]} 
                min={sliderRanges.ripeness[0]} 
                max={sliderRanges.ripeness[1]} 
                step={0.1}
                onValueChange={(value) => handleSliderChange('ripeness', value)} 
              />
              <p className="text-xs text-muted-foreground">Range from unripe (0) to very ripe (4)</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Acidity (normalized)</Label>
                <span className="text-sm text-muted-foreground">{formData.acidity.toFixed(2)}</span>
              </div>
              <Slider 
                value={[formData.acidity]} 
                min={sliderRanges.acidity[0]} 
                max={sliderRanges.acidity[1]} 
                step={0.1}
                onValueChange={(value) => handleSliderChange('acidity', value)} 
              />
              <p className="text-xs text-muted-foreground">Range from low acidity (0) to high acidity (5)</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" size="lg" className="w-full button-hover" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Predict Banana Quality <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default InputForm;
