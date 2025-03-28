
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroElement = heroRef.current;
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div 
        ref={heroRef}
        className="container mx-auto px-4 pt-10 pb-20 md:pt-20 md:pb-32 text-center transition-all duration-1000 transform opacity-0 translate-y-10"
      >
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
          Harnessing AI for Sustainable Agriculture
        </div>
        <h1 className="section-title mb-6 animate-fade-in animate-delay-100">
          Predict Crop Yields with <br className="hidden md:inline" />
          <span className="text-primary">Precision and Confidence</span>
        </h1>
        <p className="section-subtitle max-w-3xl mx-auto mb-10 animate-fade-in animate-delay-200">
          CropSense uses advanced machine learning to analyze environmental conditions and predict agricultural yields, 
          helping farmers make data-driven decisions for sustainable food production.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-300">
          <Button asChild size="lg" className="button-hover">
            <Link to="/predict" className="flex items-center gap-2">
              Try Prediction Tool <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="button-hover">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
