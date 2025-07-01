
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, User, Shield, BookOpen, Cpu, Clock, Zap, Brain, Code, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

type UserRole = 'student' | 'mentor' | 'admin';
type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [showAssessment, setShowAssessment] = useState(false);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('beginner');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState('');
  const [isFreeTrial, setIsFreeTrial] = useState(false);

  const topics = [
    { id: 'arduino', label: 'Arduino Programming', icon: Cpu },
    { id: 'robotics', label: 'Robotics Fundamentals', icon: Wrench },
    { id: 'ai', label: 'AI & Machine Learning', icon: Brain },
    { id: 'programming', label: 'C/C++ Programming', icon: Code },
    { id: 'electronics', label: 'Electronics & Circuits', icon: Zap },
    { id: 'automation', label: 'Industrial Automation', icon: BookOpen },
  ];

  const handleTopicChange = (topicId: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics([...selectedTopics, topicId]);
    } else {
      setSelectedTopics(selectedTopics.filter(id => id !== topicId));
    }
  };

  const handleLogin = () => {
    if (selectedRole === 'student' && !showAssessment) {
      setShowAssessment(true);
      return;
    }
    // Handle actual login logic here
    console.log('Login attempt:', { selectedRole, skillLevel, selectedTopics, isFreeTrial });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forthtech-red via-purple-600 to-blue-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-purple-400/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-1/2 w-8 h-8 bg-white/15 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-red-400/20 rounded-full animate-pulse delay-500"></div>
        
        {/* Circuit-like lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <path d="M100,100 L200,100 L200,200 L300,200" stroke="white" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M800,150 L700,150 L700,250 L600,250" stroke="white" strokeWidth="2" fill="none" className="animate-pulse delay-300" />
          <path d="M150,800 L250,800 L250,700 L350,700" stroke="white" strokeWidth="2" fill="none" className="animate-pulse delay-700" />
        </svg>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/43686a65-c0b6-4a4a-9cb3-528d13a6f8bb.png" 
                alt="ForthTech Logo" 
                className="h-16"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">Welcome to ForthTech</h1>
              <p className="text-white/90 text-lg">Centralized Educational Robotics Platform</p>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                Empowering Tomorrow's Engineers
              </Badge>
            </div>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl text-center text-forthtech-dark">
                {showAssessment ? 'Complete Your Profile' : 'Sign In to Continue'}
              </CardTitle>
              <CardDescription className="text-center">
                {showAssessment 
                  ? 'Help us personalize your learning experience'
                  : 'Choose your role and access your dashboard'
                }
              </CardDescription>
              
              {/* Free Trial Banner */}
              <div className="bg-gradient-to-r from-forthtech-red to-purple-600 text-white p-3 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">Free 14-Day Trial Available!</span>
                </div>
                <p className="text-sm opacity-90">Full access to all educational resources</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {!showAssessment ? (
                <>
                  {/* Role Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Select Your Role</Label>
                    <div className="grid gap-3">
                      {[
                        { role: 'student' as UserRole, icon: User, label: 'Student', desc: 'Learn and explore robotics' },
                        { role: 'mentor' as UserRole, icon: Users, label: 'Mentor', desc: 'Guide and teach students' },
                        { role: 'admin' as UserRole, icon: Shield, label: 'Admin', desc: 'Manage platform and users' }
                      ].map(({ role, icon: Icon, label, desc }) => (
                        <div
                          key={role}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedRole === role
                              ? 'border-forthtech-red bg-red-50 dark:bg-red-950/20'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedRole(role)}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`h-6 w-6 ${selectedRole === role ? 'text-forthtech-red' : 'text-gray-500'}`} />
                            <div>
                              <div className="font-medium">{label}</div>
                              <div className="text-sm text-gray-500">{desc}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Login Form */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter your password" />
                    </div>
                  </div>

                  {/* Free Trial Option */}
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Checkbox 
                      id="free-trial" 
                      checked={isFreeTrial}
                      onCheckedChange={(checked) => setIsFreeTrial(checked as boolean)}
                    />
                    <Label htmlFor="free-trial" className="text-sm cursor-pointer">
                      Start with 14-day free trial (No credit card required)
                    </Label>
                  </div>
                </>
              ) : (
                <>
                  {/* Student Assessment */}
                  <div className="space-y-6">
                    {/* Skill Level Assessment */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">What's your current skill level?</Label>
                      <RadioGroup value={skillLevel} onValueChange={(value) => setSkillLevel(value as SkillLevel)}>
                        {[
                          { level: 'beginner' as SkillLevel, label: 'Beginner', desc: 'New to robotics and programming' },
                          { level: 'intermediate' as SkillLevel, label: 'Intermediate', desc: 'Some experience with basic concepts' },
                          { level: 'advanced' as SkillLevel, label: 'Advanced', desc: 'Experienced with complex projects' }
                        ].map(({ level, label, desc }) => (
                          <div key={level} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value={level} id={level} />
                            <Label htmlFor={level} className="flex-1 cursor-pointer">
                              <div className="font-medium">{label}</div>
                              <div className="text-sm text-gray-500">{desc}</div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Topic Interests */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Which topics interest you? (Select all that apply)</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {topics.map(({ id, label, icon: Icon }) => (
                          <div key={id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                            <Checkbox
                              id={id}
                              checked={selectedTopics.includes(id)}
                              onCheckedChange={(checked) => handleTopicChange(id, checked as boolean)}
                            />
                            <Icon className="h-5 w-5 text-forthtech-red" />
                            <Label htmlFor={id} className="flex-1 cursor-pointer">{label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Custom Topic */}
                    <div className="space-y-2">
                      <Label htmlFor="custom-topic">Other interests (optional)</Label>
                      <Input
                        id="custom-topic"
                        placeholder="Type your specific interests..."
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleLogin} 
                  className="w-full bg-forthtech-red hover:bg-red-700 text-white"
                  size="lg"
                >
                  {showAssessment ? 'Complete Setup' : 'Continue'}
                </Button>
                
                {showAssessment && (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAssessment(false)}
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                )}
              </div>

              {/* Footer Links */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-forthtech-red hover:underline font-medium">
                    Sign up here
                  </Link>
                </p>
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center">
            <Link to="/" className="text-white/80 hover:text-white text-sm underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
