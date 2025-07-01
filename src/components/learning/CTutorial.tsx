import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Code, Play, CheckCircle, Clock, BookOpen, FileText, Trophy, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CTutorialProps {
  onBack: () => void;
}

const CTutorial: React.FC<CTutorialProps> = ({ onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState('introduction');
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  const topics = [
    { id: 'introduction', title: 'Introduction to C', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'setup', title: 'Setup & Installation', icon: <Code className="h-4 w-4" /> },
    { id: 'variables', title: 'Variables & Data Types', icon: <FileText className="h-4 w-4" /> },
    { id: 'operators', title: 'Operators', icon: <Code className="h-4 w-4" /> },
    { id: 'conditionals', title: 'Conditional Statements', icon: <FileText className="h-4 w-4" /> },
    { id: 'loops', title: 'Loops', icon: <Code className="h-4 w-4" /> },
    { id: 'while-loops', title: 'Do/While Loop', icon: <Code className="h-4 w-4" /> },
    { id: 'while-examples', title: 'While Loop Examples', icon: <Play className="h-4 w-4" /> },
    { id: 'for-loops', title: 'For Loop', icon: <Code className="h-4 w-4" /> },
    { id: 'nested-loops', title: 'Nested Loops', icon: <Code className="h-4 w-4" /> },
    { id: 'for-examples', title: 'For Loop Examples', icon: <Play className="h-4 w-4" /> },
    { id: 'break-continue', title: 'Break and Continue', icon: <Code className="h-4 w-4" /> },
    { id: 'arrays', title: 'Arrays', icon: <FileText className="h-4 w-4" /> },
    { id: 'array-size', title: 'Array Size', icon: <FileText className="h-4 w-4" /> },
    { id: 'array-examples', title: 'Array Examples', icon: <Play className="h-4 w-4" /> },
    { id: 'multidimensional', title: 'Multidimensional Arrays', icon: <FileText className="h-4 w-4" /> },
    { id: 'strings', title: 'Strings', icon: <FileText className="h-4 w-4" /> },
    { id: 'special-characters', title: 'Special Characters', icon: <Code className="h-4 w-4" /> },
    { id: 'string-functions', title: 'String Functions', icon: <Code className="h-4 w-4" /> },
    { id: 'user-input', title: 'User Input', icon: <FileText className="h-4 w-4" /> },
    { id: 'memory-address', title: 'Memory Address', icon: <Code className="h-4 w-4" /> },
    { id: 'pointers', title: 'Pointers', icon: <Code className="h-4 w-4" /> },
    { id: 'pointers-arrays', title: 'Pointers and Arrays', icon: <Code className="h-4 w-4" /> },
  ];

  const markTopicComplete = (topicId: string) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const getTopicContent = () => {
    switch (selectedTopic) {
      case 'introduction':
        return {
          title: 'Introduction to C',
          content: (
            <div className="space-y-6">
              <div className="bg-forthtech-red/10 border border-forthtech-red/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-forthtech-red">What is C?</h3>
                <p className="mb-4">
                  C is a general-purpose programming language created by Dennis Ritchie at Bell Labs between 1969 and 1973.
                  It is a very popular language, despite being old.
                </p>
                <p className="mb-4">
                  C is strongly associated with UNIX, as it was developed to write the UNIX operating system.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-forthtech-red">Why Learn C?</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>It is one of the most popular programming languages in the world</li>
                  <li>If you know C, you will have no problem learning other popular programming languages</li>
                  <li>It is very fast, compared to other programming languages, like Java and Python</li>
                  <li>It is very versatile; it can be used in both applications and technologies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-forthtech-red">Difference between C and C++</h4>
                <p className="mb-4">
                  C++ was developed as an extension of C, and both languages have almost the same syntax.
                  The main difference between C and C++ is that C++ supports classes and objects, while C does not.
                </p>
              </div>
            </div>
          )
        };

      case 'while-loops':
        return {
          title: 'C Do/While Loop',
          content: (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">The Do/While Loop</h3>
                <p className="mb-4">
                  The do/while loop is a variant of the while loop. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Syntax</h4>
                <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
                  <pre>{`do {
  // code block to be executed
}
while (condition);`}</pre>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  The example below uses a do/while loop. The loop will always be executed at least once, even if the condition is false, because the code block is executed before the condition is tested.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Example</h4>
                <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
                  <pre>{`int i = 0;

do {
  printf("%d\\n", i);
  i++;
}
while (i < 5);`}</pre>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Try it Yourself
                </Button>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">
                  Do not forget to increase the variable used in the condition, otherwise the loop will never end!
                </p>
              </div>

              <div className="bg-gray-800 text-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 text-white">Exercise</h4>
                <p className="mb-4 text-gray-300">What is the main difference between a do/while loop and a while loop?</p>
                <div className="space-y-2">
                  <div className="bg-gray-700 hover:bg-gray-600 p-3 rounded cursor-pointer transition-colors">
                    The do/while loop checks the condition first
                  </div>
                  <div className="bg-gray-700 hover:bg-gray-600 p-3 rounded cursor-pointer transition-colors">
                    The do/while loop executes the code block at least once before checking the condition
                  </div>
                  <div className="bg-gray-700 hover:bg-gray-600 p-3 rounded cursor-pointer transition-colors">
                    The do/while loop cannot use conditions
                  </div>
                  <div className="bg-gray-700 hover:bg-gray-600 p-3 rounded cursor-pointer transition-colors">
                    The do/while loop is faster than while loops
                  </div>
                </div>
                <Button className="bg-forthtech-red hover:bg-red-600 text-white mt-4">
                  Submit Answer
                </Button>
              </div>
            </div>
          )
        };

      case 'while-examples':
        return {
          title: 'C While Loop Examples',
          content: (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">Real-Life Examples</h3>
                <p className="mb-4">
                  To demonstrate a practical example of the while loop, let's create a simple "countdown" program.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Example</h4>
                <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
                  <pre>{`int countdown = 3;

while (countdown > 0) {
  printf("%d\\n", countdown);
  countdown--;
}

printf("Happy New Year!!\\n");`}</pre>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Try it Yourself
                </Button>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                In this example, we create a program that only print even numbers between 1 and 10 (inclusive):
              </p>

              <div>
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Example</h4>
                <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
                  <pre>{`int i = 2;

while (i <= 10) {
  printf("%d\\n", i);
  i += 2;
}`}</pre>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Try it Yourself
                </Button>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                In this example we use a while loop to reverse some numbers:
              </p>

              <div>
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Example</h4>
                <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
                  <pre>{`int numbers = 12345;

while (numbers > 0) {
  printf("%d\\n", numbers % 10);
  numbers = numbers / 10;
}`}</pre>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Try it Yourself
                </Button>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                To demonstrate a practical example of the while loop combined with if else statement, let's say we play a game of Yatzy:
              </p>

              <div>
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Example</h4>
                <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
                  <pre>{`int dice = 1;

while (dice <= 6) {
  if (dice < 6) {
    printf("No Yatzy\\n");
  } else {
    printf("Yatzy!\\n");
  }
  dice = dice + 1;
}`}</pre>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Try it Yourself
                </Button>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                If the loop prints the values ranging from 1 to 6, it prints "No Yatzy" otherwise it prints the value is 6, prints "Yatzy!".
              </p>
            </div>
          )
        };

      default:
        return {
          title: 'Coming Soon',
          content: (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">This content is under development. Check back soon!</p>
            </div>
          )
        };
    }
  };

  const topic = getTopicContent();
  const currentTopicIndex = topics.findIndex(t => t.id === selectedTopic);
  const progress = Math.round(((currentTopicIndex + 1) / topics.length) * 100);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Learning Hub
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg text-forthtech-red">C Programming</CardTitle>
              <CardDescription>Complete C Tutorial</CardDescription>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="text-forthtech-red">{progress}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {topics.map((topicItem) => (
                  <button
                    key={topicItem.id}
                    onClick={() => setSelectedTopic(topicItem.id)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      selectedTopic === topicItem.id 
                        ? 'bg-forthtech-red text-white' 
                        : completedTopics.includes(topicItem.id)
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {topicItem.icon}
                    <span className="flex-1">{topicItem.title}</span>
                    {completedTopics.includes(topicItem.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="tutorial" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tutorial" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Tutorial
              </TabsTrigger>
              <TabsTrigger value="exercise" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Exercise
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="reference" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Reference
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tutorial">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-forthtech-red">{topic.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        Learn the fundamentals of C programming
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="h-5 w-5" />
                      <span className="text-sm">Est. 15 min</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {topic.content}
                  
                  <div className="mt-8 flex gap-3">
                    <Button 
                      className="bg-forthtech-red hover:bg-red-600 text-white"
                      onClick={() => markTopicComplete(selectedTopic)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </Button>
                    {currentTopicIndex < topics.length - 1 && (
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedTopic(topics[currentTopicIndex + 1].id)}
                        className="border-forthtech-red text-forthtech-red hover:bg-forthtech-red hover:text-white"
                      >
                        Next Topic
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exercise">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-forthtech-red">Practice Exercise</CardTitle>
                  <CardDescription>Test your understanding with hands-on coding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Exercise: {topic.title}</h4>
                      <p className="text-blue-600 dark:text-blue-400">
                        Write a C program that demonstrates the concepts learned in this topic.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900 text-white p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">main.c</span>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">Run Code</Button>
                      </div>
                      <textarea 
                        className="w-full h-32 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
                        placeholder="// Write your C code here..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="bg-forthtech-red hover:bg-red-600 text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Run Exercise
                      </Button>
                      <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                        View Solution
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-forthtech-red">Knowledge Quiz</CardTitle>
                  <CardDescription>Test your understanding of {topic.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">Question 1 of 3</h4>
                      <p className="mb-4 text-green-600 dark:text-green-400">
                        What is the correct syntax for a while loop in C?
                      </p>
                      <div className="space-y-2">
                        <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 p-3 rounded cursor-pointer hover:bg-green-50 dark:hover:bg-gray-700 transition-colors">
                          while (condition) { }
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 p-3 rounded cursor-pointer hover:bg-green-50 dark:hover:bg-gray-700 transition-colors">
                          while condition { }
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 p-3 rounded cursor-pointer hover:bg-green-50 dark:hover:bg-gray-700 transition-colors">
                          while (condition);
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 p-3 rounded cursor-pointer hover:bg-green-50 dark:hover:bg-gray-700 transition-colors">
                          while [condition] { }
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="bg-forthtech-red hover:bg-red-600 text-white">
                        <Trophy className="h-4 w-4 mr-2" />
                        Submit Answer
                      </Button>
                      <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                        Next Question
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reference">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-forthtech-red">C Reference</CardTitle>
                  <CardDescription>Quick reference for C programming concepts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Basic Syntax</h4>
                        <div className="bg-gray-900 text-white p-3 rounded text-sm">
                          <pre>{`#include <stdio.h>
int main() {
    printf("Hello World!");
    return 0;
}`}</pre>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Data Types</h4>
                        <ul className="text-sm space-y-1 text-green-600 dark:text-green-400">
                          <li><code>int</code> - Integer numbers</li>
                          <li><code>float</code> - Floating point numbers</li>
                          <li><code>char</code> - Single characters</li>
                          <li><code>double</code> - Double precision floats</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Control Structures</h4>
                        <ul className="text-sm space-y-1 text-purple-600 dark:text-purple-400">
                          <li><code>if/else</code> - Conditional statements</li>
                          <li><code>while</code> - While loops</li>
                          <li><code>for</code> - For loops</li>
                          <li><code>switch</code> - Switch statements</li>
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">Common Functions</h4>
                        <ul className="text-sm space-y-1 text-amber-600 dark:text-amber-400">
                          <li><code>printf()</code> - Print output</li>
                          <li><code>scanf()</code> - Read input</li>
                          <li><code>strlen()</code> - String length</li>
                          <li><code>strcpy()</code> - String copy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" className="border-forthtech-red text-forthtech-red hover:bg-forthtech-red hover:text-white">
                      <FileText className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                      <Code className="h-4 w-4 mr-2" />
                      Code Examples
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CTutorial;
