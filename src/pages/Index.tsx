
import React from 'react';
import Header from '@/components/Header';
import ProgressMetrics from '@/components/ProgressMetrics';
import FeaturedRobots from '@/components/FeaturedRobots';
import LearningPathways from '@/components/LearningPathways';
import CommunitySection from '@/components/CommunitySection';
import Footer from '@/components/Footer';
import AILearningAdvisorCard from '@/components/AILearningAdvisorCard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        {/* AI Learning Advisor prominently shown on dashboard */}
        <AILearningAdvisorCard />

        <h1 className="sr-only">ForthTech Robotics Dashboard</h1>
        
        <ProgressMetrics />
        <LearningPathways />
        <CommunitySection />
        {/* Move Featured Robots to the very bottom of the page, just before the Footer */}
        <FeaturedRobots />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

