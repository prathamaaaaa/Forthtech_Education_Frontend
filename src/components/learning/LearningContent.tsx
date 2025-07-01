import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Code, Play, CheckCircle, Clock } from 'lucide-react';
import CTutorial from './CTutorial';

interface LearningContentProps {
  topicId: string;
  onBack: () => void;
}

const LearningContent: React.FC<LearningContentProps> = ({ topicId, onBack }) => {
  // Handle C Tutorial specifically
  if (topicId === 'programming-fundamentals') {
    return <CTutorial onBack={onBack} />;
  }

  const getTopicContent = () => {
    switch (topicId) {
      case 'programming-variables':
        return {
          title: 'Variables & Data Types',
          description: 'Learn about variables, data types, and memory management in programming.',
          content: (
            <div>
              <h3 className="text-lg font-semibold mb-3">What are Variables?</h3>
              <p className="mb-4">
                Variables are containers for storing data values. In most programming languages, 
                you must declare a variable before you can use it.
              </p>
              
              <h4 className="font-semibold mb-2">Common Data Types:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Integer:</strong> Whole numbers (1, 2, 3)</li>
                <li><strong>Float:</strong> Decimal numbers (1.5, 2.7)</li>
                <li><strong>String:</strong> Text ("Hello World")</li>
                <li><strong>Boolean:</strong> True or False values</li>
              </ul>

              <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
                <pre>{`// Example in C++
int age = 25;           // Integer
float height = 5.9;     // Float
string name = "John";   // String
bool isStudent = true;  // Boolean`}</pre>
              </div>
            </div>
          ),
          progress: 75
        };

      case 'electronics-circuits':
        return {
          title: 'Basic Circuit Theory',
          description: 'Understanding electrical circuits, current, voltage, and resistance.',
          content: (
            <div>
              <h3 className="text-lg font-semibold mb-3">Ohm's Law</h3>
              <p className="mb-4">
                Ohm's Law states that the current through a conductor between two points is directly 
                proportional to the voltage across the two points.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Formula: V = I × R</h4>
                <ul className="list-disc pl-6">
                  <li><strong>V:</strong> Voltage (Volts)</li>
                  <li><strong>I:</strong> Current (Amperes)</li>
                  <li><strong>R:</strong> Resistance (Ohms)</li>
                </ul>
              </div>
            </div>
          ),
          progress: 42
        };

      case 'robotics-programming':
        return {
          title: 'Robotics Programming',
          description: 'Learn to program robots with sensors, actuators, and control systems.',
          content: (
            <div>
              <h3 className="text-lg font-semibold mb-3">Robot Control Systems</h3>
              <p className="mb-4">
                Robotics programming involves controlling hardware components like motors, 
                sensors, and actuators through software.
              </p>
              
              <h4 className="font-semibold mb-2">Key Concepts:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>Sensor data processing</li>
                <li>Motor control and PWM</li>
                <li>Real-time systems</li>
                <li>Communication protocols (I2C, SPI, UART)</li>
              </ul>
            </div>
          ),
          progress: 0
        };

      default:
        return {
          title: 'Coming Soon',
          description: 'This content is under development.',
          content: (
            <div>
              <p>This learning module is currently being developed. Check back soon for comprehensive content!</p>
            </div>
          ),
          progress: 0
        };
    }
  };

  const topic = getTopicContent();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Learning Hub
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{topic.title}</CardTitle>
              <CardDescription className="text-base mt-2">{topic.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">Est. 30 min</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{topic.progress}% complete</span>
            </div>
            <Progress value={topic.progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Lesson Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              {topic.content}
              
              <div className="mt-6 flex gap-3">
                <Button className="bg-forthtech-red hover:bg-red-600">
                  <Play className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
                <Button variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Code className="h-4 w-4 mr-2" />
                Practice Exercises
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Play className="h-4 w-4 mr-2" />
                Interactive Demo
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Take Quiz
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href="#" className="block text-sm text-blue-600 hover:underline">
                📄 Download Notes
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:underline">
                🎥 Video Tutorial
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:underline">
                💻 Code Examples
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:underline">
                📚 Additional Reading
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningContent;
