
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="section-title mb-6">Start Your Prediction Now</h2>
            <p className="section-subtitle mb-8">
              Get accurate crop yield predictions based on your specific environmental conditions
            </p>
            <Button asChild size="lg" className="button-hover">
              <Link to="/predict" className="flex items-center gap-2">
                Try Our Prediction Tool <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="inline-block w-8 h-8 bg-primary rounded-full"></span>
              <span className="text-xl font-display font-semibold">CropSense</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/predict" className="text-muted-foreground hover:text-primary transition-colors">Predict</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CropSense. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
