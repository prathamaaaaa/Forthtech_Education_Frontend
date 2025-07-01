
import React from "react";
import { Brain } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AILearningAdvisorCard: React.FC = () => {
  const navigate = useNavigate();

  const handleGetRecommendations = () => {
    navigate('/ai-advisor');
  };

  return (
    <Card className="bg-gradient-to-r from-forthtech-red/80 to-purple-600/80 text-white mb-8 border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <span className="bg-white/20 rounded-full p-2">
          <Brain className="h-8 w-8 text-white" />
        </span>
        <div>
          <CardTitle className="text-xl font-bold">AI Learning Advisor</CardTitle>
          <CardDescription className="text-white/90 text-base">
            Get personalized robotics learning recommendations powered by AI.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col items-start gap-4">
        <div>
          <p className="text-white">
            Unlock a custom learning path based on your skills, goals, and progress.
          </p>
        </div>
        <Button 
          variant="secondary" 
          className="bg-white/80 text-forthtech-red font-semibold hover:bg-white"
          onClick={handleGetRecommendations}
        >
          Get Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default AILearningAdvisorCard;
