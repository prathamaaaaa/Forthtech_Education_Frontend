import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarTrigger, 
  SidebarContent,
  SidebarHeader, 
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { 
  Book, 
  BookOpen, 
  Code, 
  Cpu, 
  Component, 
  Layers, 
  GraduationCap,
  Search,
  Clock,
  Layout,
  Settings,
  CheckCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LearningContent from '@/components/learning/LearningContent';
import TopicProgress from '@/components/learning/TopicProgress';
import RecommendedCourses from '@/components/learning/RecommendedCourses';
import CurriculumTracks from '@/components/learning/CurriculumTracks';

const LearningHub = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 container">
        <SidebarProvider>
          <div className="flex h-full">
            <Sidebar>
              <SidebarHeader>
                <div className="flex items-center justify-between px-4 py-2">
                  <h2 className="text-lg font-bold">Learning Hub</h2>
                  <SidebarTrigger />
                </div>
                <div className="px-4 pb-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      placeholder="Search topics..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Continue Learning</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        className="flex justify-between"
                        onClick={() => setSelectedTopic('programming-variables')}
                      >
                        <div className="flex items-center">
                          <Code className="mr-2" />
                          <span>Variables & Data Types</span>
                        </div>
                        <span className="text-xs bg-forthtech-red text-white px-2 py-0.5 rounded-full">
                          75%
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        className="flex justify-between"
                        onClick={() => setSelectedTopic('electronics-circuits')}
                      >
                        <div className="flex items-center">
                          <Cpu className="mr-2" />
                          <span>Basic Circuit Theory</span>
                        </div>
                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                          42%
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Software Track</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('programming-fundamentals')}
                      >
                        <Code className="mr-2" />
                        <span>Programming Fundamentals</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('robotics-programming')}
                      >
                        <Component className="mr-2" />
                        <span>Robotics Programming</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('advanced-programming')}
                      >
                        <Layers className="mr-2" />
                        <span>Advanced Programming</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Electronics Track</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('electronics-fundamentals')}
                      >
                        <Cpu className="mr-2" />
                        <span>Electronics Fundamentals</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('circuit-design')}
                      >
                        <Component className="mr-2" />
                        <span>Circuit Design</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Mechanical Track</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('mechanical-fundamentals')}
                      >
                        <Settings className="mr-2" />
                        <span>Mechanical Fundamentals</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('design-basics')}
                      >
                        <Layout className="mr-2" />
                        <span>Design Basics</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Learning Pathways</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('robotics-generalist')}
                      >
                        <GraduationCap className="mr-2" />
                        <span>Robotics Generalist</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('software-specialist')}
                      >
                        <Code className="mr-2" />
                        <span>Software Specialist</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setSelectedTopic('hardware-engineer')}
                      >
                        <Cpu className="mr-2" />
                        <span>Hardware Engineer</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <SidebarInset className="p-6">
              {!selectedTopic ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Welcome to the Learning Hub</h1>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-500">Last visit: Today, 10:30 AM</span>
                    </div>
                  </div>

                  {/* Curriculum Tracks and Modules: */}
                  <CurriculumTracks onSelectModule={(moduleId) => setSelectedTopic(moduleId)} />

                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Your Learning Progress</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <TopicProgress 
                        title="Software Track" 
                        progress={48} 
                        color="bg-forthtech-red" 
                        icon={<Code className="h-5 w-5" />} 
                      />
                      <TopicProgress 
                        title="Electronics Track" 
                        progress={32} 
                        color="bg-blue-600" 
                        icon={<Cpu className="h-5 w-5" />} 
                      />
                      <TopicProgress 
                        title="Mechanical Track" 
                        progress={15} 
                        color="bg-green-600" 
                        icon={<Settings className="h-5 w-5" />} 
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Variables & Data Types</CardTitle>
                            <Code className="h-5 w-5 text-forthtech-red" />
                          </div>
                          <CardDescription>Programming Fundamentals</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Progress value={75} className="h-2 mb-2" />
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">75% complete</span>
                            <Button 
                              variant="default" 
                              className="bg-forthtech-red hover:bg-red-600"
                              onClick={() => setSelectedTopic('programming-variables')}
                            >
                              Continue
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Basic Circuit Theory</CardTitle>
                            <Cpu className="h-5 w-5 text-blue-600" />
                          </div>
                          <CardDescription>Electronics Fundamentals</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Progress value={42} className="h-2 mb-2" />
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">42% complete</span>
                            <Button 
                              variant="default" 
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => setSelectedTopic('electronics-circuits')}
                            >
                              Continue
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Learning Pathways</h2>
                    <Tabs defaultValue="robotics" className="w-full">
                      <TabsList className="mb-6">
                        <TabsTrigger value="robotics">Robotics Generalist</TabsTrigger>
                        <TabsTrigger value="software">Software Specialist</TabsTrigger>
                        <TabsTrigger value="hardware">Hardware Engineer</TabsTrigger>
                        <TabsTrigger value="mechanical">Mechanical Designer</TabsTrigger>
                      </TabsList>
                      <TabsContent value="robotics">
                        <div className="mb-4">
                          <h3 className="font-bold mb-2">Robotics Generalist Path</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Learn across all three domains to become a well-rounded robotics engineer.
                            Estimated completion time: 6-12 months.
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-1" />
                              <span className="text-sm">4 modules completed</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-blue-600 mr-1" />
                              <span className="text-sm">12 modules remaining</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-amber-600 mr-1" />
                              <span className="text-sm">Est. 6-12 months</span>
                            </div>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <Card className="bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-md">Programming Fundamentals</CardTitle>
                                <Code className="h-4 w-4 text-forthtech-red" />
                              </div>
                              <CardDescription>Software Track - Beginner</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Progress value={75} className="h-2 mb-2" />
                              <Button variant="link" className="text-forthtech-red p-0 h-auto" 
                                onClick={() => setSelectedTopic('programming-fundamentals')}>
                                Continue Learning
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-md">Electronics Fundamentals</CardTitle>
                                <Cpu className="h-4 w-4 text-blue-600" />
                              </div>
                              <CardDescription>Electronics Track - Beginner</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Progress value={42} className="h-2 mb-2" />
                              <Button variant="link" className="text-blue-600 p-0 h-auto"
                                onClick={() => setSelectedTopic('electronics-fundamentals')}>
                                Continue Learning
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-md">Mechanical Fundamentals</CardTitle>
                                <Settings className="h-4 w-4 text-green-600" />
                              </div>
                              <CardDescription>Mechanical Track - Beginner</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Progress value={15} className="h-2 mb-2" />
                              <Button variant="link" className="text-green-600 p-0 h-auto"
                                onClick={() => setSelectedTopic('mechanical-fundamentals')}>
                                Continue Learning
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="software">
                        <div className="mb-4">
                          <h3 className="font-bold mb-2">Software Specialist Path</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Focus primarily on programming and algorithms with some electronics interfaces.
                            Estimated completion time: 4-8 months.
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-1" />
                              <span className="text-sm">2 modules completed</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-blue-600 mr-1" />
                              <span className="text-sm">8 modules remaining</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-amber-600 mr-1" />
                              <span className="text-sm">Est. 4-8 months</span>
                            </div>
                          </div>
                          <Progress value={20} className="h-2" />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="hardware">
                        <div className="mb-4">
                          <h3 className="font-bold mb-2">Hardware Engineer Path</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Focus on electronics and circuit design with mechanical interfaces.
                            Estimated completion time: 4-8 months.
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-1" />
                              <span className="text-sm">1 module completed</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-blue-600 mr-1" />
                              <span className="text-sm">9 modules remaining</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-amber-600 mr-1" />
                              <span className="text-sm">Est. 4-8 months</span>
                            </div>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="mechanical">
                        <div className="mb-4">
                          <h3 className="font-bold mb-2">Mechanical Designer Path</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Focus on mechanical design with basic electronics knowledge.
                            Estimated completion time: 4-8 months.
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-1" />
                              <span className="text-sm">1 module completed</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-blue-600 mr-1" />
                              <span className="text-sm">7 modules remaining</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-amber-600 mr-1" />
                              <span className="text-sm">Est. 4-8 months</span>
                            </div>
                          </div>
                          <Progress value={12} className="h-2" />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <RecommendedCourses />
                </div>
              ) : (
                <LearningContent topicId={selectedTopic} onBack={() => setSelectedTopic(null)} />
              )}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearningHub;
