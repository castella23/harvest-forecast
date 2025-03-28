
import React, { useEffect, useRef } from 'react';
import { CheckCircle, Droplets, MapPin, Sun, Thermometer, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const cardElement = cardRef.current;
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-700 opacity-0 translate-y-10",
        `delay-[${delay}ms]`
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-display font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Location Analysis",
      description: "Precise geographical data to understand local growing conditions and soil characteristics.",
      icon: <MapPin />,
      delay: 100
    },
    {
      title: "Weather Patterns",
      description: "Historical and forecasted weather patterns that affect plant growth and development.",
      icon: <Sun />,
      delay: 200
    },
    {
      title: "Rainfall Prediction",
      description: "Accurate rainfall predictions to optimize irrigation planning and water management.",
      icon: <Droplets />,
      delay: 300
    },
    {
      title: "Temperature Analysis",
      description: "Temperature variation analysis to determine optimal growing conditions for different crops.",
      icon: <Thermometer />,
      delay: 400
    },
    {
      title: "Consumption Metrics",
      description: "Population consumption data to balance production with local and regional demand.",
      icon: <BarChart2 />,
      delay: 500
    },
    {
      title: "Yield Optimization",
      description: "Intelligent recommendations to maximize yield while minimizing resource usage.",
      icon: <CheckCircle />,
      delay: 600
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Key Features</h2>
          <p className="section-subtitle">
            Our platform analyzes multiple data points to provide accurate yield predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
