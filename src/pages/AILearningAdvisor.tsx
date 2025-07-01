
import React, { useState } from 'react';
import { Brain, MessageSquare, Sparkles, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AILearningAdvisor = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Learning Advisor. I can help you create personalized learning paths, recommend robotics projects, and answer questions about programming, electronics, and mechanical engineering. What would you like to learn about today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: inputMessage },
      { role: 'assistant', content: 'Thank you for your question! This is a demo interface. In a real implementation, this would connect to an AI service to provide personalized robotics learning recommendations based on your current skill level and goals.' }
    ];

    setMessages(newMessages);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <Card className="bg-gradient-to-r from-forthtech-red/80 to-purple-600/80 text-white mb-8 border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <span className="bg-white/20 rounded-full p-3">
                  <Brain className="h-8 w-8 text-white" />
                </span>
                <div>
                  <CardTitle className="text-2xl font-bold">AI Learning Advisor</CardTitle>
                  <CardDescription className="text-white/90 text-lg">
                    Your personalized robotics learning companion
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Chat Interface */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat with AI Advisor
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-forthtech-red text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about robotics learning paths, project ideas, or specific topics..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forthtech-red dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
                <Button onClick={handleSendMessage} className="bg-forthtech-red hover:bg-forthtech-red/90">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 text-forthtech-red mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Create Learning Path</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get a customized curriculum based on your goals
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Brain className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Skill Assessment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Evaluate your current knowledge level
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Project Ideas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Discover projects that match your skill level
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AILearningAdvisor;
