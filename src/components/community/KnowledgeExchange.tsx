
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, MessageSquareText, ThumbsUp, Award, BookOpen, Clock } from 'lucide-react';

const KnowledgeExchange = () => {
  // Mock data for questions
  const questions = [
    {
      id: 1,
      title: 'How to calibrate ultrasonic sensors for better accuracy?',
      body: 'I\'m working on an obstacle detection system and my HC-SR04 ultrasonic sensors are giving inconsistent readings...',
      user: 'Alex Chen',
      userAvatar: 'https://github.com/shadcn.png',
      tags: ['Sensors', 'Arduino', 'Calibration'],
      votes: 12,
      answers: 5,
      views: 143,
      date: '2 days ago',
      verified: true
    },
    {
      id: 2,
      title: 'Best practices for motor control with high torque loads',
      body: 'I\'m building a robotic arm that needs to lift objects weighing up to 2kg. I\'m using stepper motors but experiencing...',
      user: 'Maria Rodriguez',
      userAvatar: 'https://github.com/shadcn.png',
      tags: ['Motors', 'Robotics', 'Hardware'],
      votes: 8,
      answers: 3,
      views: 97,
      date: '5 days ago',
      verified: false
    },
    {
      id: 3,
      title: 'Implementing PID control for balancing robot',
      body: 'I\'m working on a self-balancing robot using an Arduino Mega and MPU6050. Having trouble tuning the PID constants...',
      user: 'David Kwon',
      userAvatar: 'https://github.com/shadcn.png',
      tags: ['PID', 'Control Systems', 'Arduino'],
      votes: 15,
      answers: 7,
      views: 210,
      date: '1 week ago',
      verified: true
    }
  ];

  // Mock data for knowledge base articles
  const knowledgeBaseArticles = [
    {
      id: 1,
      title: 'Comprehensive Guide to Robot Sensor Selection',
      description: 'Learn how to choose the right sensors for different robotics applications',
      author: 'Dr. Sarah Kim',
      authorAvatar: 'https://github.com/shadcn.png',
      readTime: '15 min read',
      tags: ['Sensors', 'Design', 'Guide'],
      lastUpdated: '2 weeks ago'
    },
    {
      id: 2,
      title: 'Motor Control Algorithms: A Practical Approach',
      description: 'Implementation details for common motor control algorithms',
      author: 'Prof. Michael Chen',
      authorAvatar: 'https://github.com/shadcn.png',
      readTime: '25 min read',
      tags: ['Motors', 'Algorithms', 'Control'],
      lastUpdated: '1 month ago'
    },
    {
      id: 3,
      title: 'Troubleshooting Common Arduino Errors',
      description: 'Solutions for the most common Arduino programming and hardware issues',
      author: 'ForthTech Team',
      authorAvatar: 'https://github.com/shadcn.png',
      readTime: '20 min read',
      tags: ['Arduino', 'Debugging', 'Troubleshooting'],
      lastUpdated: '3 weeks ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Knowledge Exchange</h2>
          <p className="text-muted-foreground">Ask questions, share knowledge, and learn from the community</p>
        </div>
        <Button>
          <MessageSquareText className="mr-2 h-4 w-4" />
          Ask Question
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search questions, articles, and tutorials..." className="pl-10 py-6" />
      </div>
      
      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Q&A Forum</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="experts">Expert Connect</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Showing 1-3 of 254 questions</div>
            <div className="flex space-x-2 items-center">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border rounded p-1">
                <option>Most Recent</option>
                <option>Most Votes</option>
                <option>Most Answers</option>
              </select>
            </div>
          </div>
          
          {questions.map(q => (
            <Card key={q.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      {q.title} 
                      {q.verified && (
                        <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Verified Answer
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">{q.body}</CardDescription>
                  </div>
                  <div className="flex flex-col items-center">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{q.votes}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {q.tags.map((tag, i) => (
                    <Badge key={i} variant="outline">{tag}</Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={q.userAvatar} />
                      <AvatarFallback>{q.user[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Asked by <span className="font-medium">{q.user}</span> {q.date}</span>
                  </div>
                  
                  <div className="flex space-x-3 text-sm">
                    <div className="text-muted-foreground">{q.answers} answers</div>
                    <div className="text-muted-foreground">{q.views} views</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button variant="outline" className="w-full">Load More Questions</Button>
        </TabsContent>
        
        <TabsContent value="knowledge" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeBaseArticles.map(article => (
              <Card key={article.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, i) => (
                      <Badge key={i} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <div className="px-6 pb-6 pt-2 border-t flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={article.authorAvatar} />
                      <AvatarFallback>{article.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{article.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="p-12 text-center border rounded-md bg-muted/50">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Contribute to the Knowledge Base</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-4">
              Share your expertise with the community by writing articles on topics you're knowledgeable about.
            </p>
            <Button>Write an Article</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="tutorials">
          <div className="p-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Tutorials Coming Soon</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-4">
              We're working on a comprehensive tutorial system. Check back soon!
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="experts">
          <div className="p-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Award className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Expert Connect Coming Soon</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-4">
              Soon you'll be able to schedule one-on-one sessions with robotics experts.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Top Contributors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(id => (
            <Card key={id} className="flex flex-col items-center p-4">
              <Avatar className="h-16 w-16 mb-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center text-base">Dr. Robert Chen</CardTitle>
              <CardDescription className="text-center">Robotics Professor</CardDescription>
              <div className="flex items-center justify-center mt-2">
                <Award className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium">Top Contributor</span>
              </div>
              <div className="w-full mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-medium">248</div>
                  <div className="text-xs text-muted-foreground">Answers</div>
                </div>
                <div>
                  <div className="text-sm font-medium">54</div>
                  <div className="text-xs text-muted-foreground">Articles</div>
                </div>
                <div>
                  <div className="text-sm font-medium">1.2k</div>
                  <div className="text-xs text-muted-foreground">Upvotes</div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">View Profile</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeExchange;
