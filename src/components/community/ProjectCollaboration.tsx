
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Rocket, GitBranch, Star, AlertCircle, CheckCircle2, Clock, Users } from 'lucide-react';

const ProjectCollaboration = () => {
  // Mock data for projects
  const featuredProjects = [
    {
      id: 1,
      name: 'Autonomous Delivery Robot',
      description: 'A small-scale delivery robot capable of navigating indoor environments',
      category: 'Hardware & Software',
      difficulty: 'Advanced',
      contributors: 8,
      progress: 72,
      openIssues: 5,
      stars: 34,
      forks: 12,
      lastUpdated: '2 days ago',
      image: 'https://github.com/shadcn.png'
    },
    {
      id: 2,
      name: 'Plant Monitoring System',
      description: 'IoT system for monitoring plant health and automating care',
      category: 'IoT',
      difficulty: 'Intermediate',
      contributors: 5,
      progress: 90,
      openIssues: 2,
      stars: 28,
      forks: 8,
      lastUpdated: '5 days ago',
      image: 'https://github.com/shadcn.png'
    },
    {
      id: 3,
      name: 'Robotic Arm Controller',
      description: '6-axis robotic arm with custom control software',
      category: 'Mechanical & Software',
      difficulty: 'Advanced',
      contributors: 6,
      progress: 45,
      openIssues: 8,
      stars: 41,
      forks: 15,
      lastUpdated: '1 day ago',
      image: 'https://github.com/shadcn.png'
    }
  ];

  const yourProjects = [
    {
      id: 1,
      name: 'Weather Station',
      description: 'DIY weather monitoring station with web dashboard',
      role: 'Contributor',
      tasks: 3,
      completion: 60,
      lastActivity: 'Yesterday',
      image: 'https://github.com/shadcn.png'
    },
    {
      id: 2,
      name: 'Line Following Robot',
      description: 'Educational robot that follows a line using PID control',
      role: 'Owner',
      tasks: 0,
      completion: 100,
      lastActivity: '1 week ago',
      image: 'https://github.com/shadcn.png'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Collaboration</h2>
          <p className="text-muted-foreground">Work together on robotics projects with the community</p>
        </div>
        <Button>
          <Rocket className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      
      <Tabs defaultValue="featured" className="space-y-4">
        <TabsList>
          <TabsTrigger value="featured">Featured Projects</TabsTrigger>
          <TabsTrigger value="your">Your Projects</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <Card key={project.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Badge variant="outline">{project.difficulty}</Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pb-2">
                  <Badge className="mb-4">{project.category}</Badge>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{project.contributors}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                    <div className="flex items-center">
                      <GitBranch className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{project.forks}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{project.openIssues} issues</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Last updated {project.lastUpdated}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <Avatar key={i} className="border-2 border-background h-7 w-7">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.contributors > 3 && (
                      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-muted-foreground text-xs font-medium border-2 border-background">
                        +{project.contributors - 3}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">View Project</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="your" className="space-y-4">
          {yourProjects.length === 0 ? (
            <div className="text-center p-12">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <Rocket className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-4">
                Start a new project or join an existing one to collaborate with the community.
              </p>
              <Button>Create Your First Project</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {yourProjects.map(project => (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <Badge variant="outline">{project.role}</Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow pb-2">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">
                          {project.completion === 100 ? 'Complete' : `${project.completion}% complete`}
                        </span>
                      </div>
                      {project.tasks > 0 && (
                        <Badge variant="secondary">{project.tasks} tasks assigned</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Last activity {project.lastActivity}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full">Continue Working</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium mb-2">Popular projects coming soon</h3>
            <p className="text-muted-foreground">
              We're compiling the most starred and forked projects from the community.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium mb-2">Recently updated projects coming soon</h3>
            <p className="text-muted-foreground">
              We're gathering the most recently active projects for you.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Project Activity Feed</h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Michael Kim</span> 
                    <span className="text-muted-foreground"> completed task </span>
                    <span className="font-medium">Fix navigation algorithm</span>
                    <span className="text-muted-foreground"> in </span>
                    <span className="font-medium">Autonomous Delivery Robot</span>
                  </p>
                  <p className="text-sm text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Sarah Lee</span> 
                    <span className="text-muted-foreground"> opened issue </span>
                    <span className="font-medium">Sensor calibration error</span>
                    <span className="text-muted-foreground"> in </span>
                    <span className="font-medium">Plant Monitoring System</span>
                  </p>
                  <p className="text-sm text-muted-foreground">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p>
                    <span className="font-medium">James Park</span> 
                    <span className="text-muted-foreground"> forked </span>
                    <span className="font-medium">Robotic Arm Controller</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">Show More Activity</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectCollaboration;
