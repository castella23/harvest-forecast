
import React from 'react';
import Navbar from '@/components/Navbar';
import InputForm from '@/components/InputForm';

const PredictionForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-4 animate-fade-in">
            Crop Yield Prediction Tool
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Enter your field details below to get an accurate prediction of your potential crop yield
            based on environmental conditions and agricultural best practices.
          </p>
        </div>
        
        <InputForm />
      </div>
    </div>
  );
};

export default PredictionForm;
