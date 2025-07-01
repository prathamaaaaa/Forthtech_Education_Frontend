
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommunitySection from '@/components/CommunitySection';
import ChatSystem from '@/components/community/ChatSystem';
import StudyGroups from '@/components/community/StudyGroups';
import ProjectCollaboration from '@/components/community/ProjectCollaboration';
import KnowledgeExchange from '@/components/community/KnowledgeExchange';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ForthTech Community</h1>
          <p className="text-muted-foreground">
            Connect, collaborate, and learn with fellow robotics enthusiasts
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 mb-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="study">Study Groups</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-4">
              <CommunitySection />
            </TabsContent>
            
            <TabsContent value="chat" className="p-4">
              <ChatSystem />
            </TabsContent>
            
            <TabsContent value="study" className="p-4">
              <StudyGroups />
            </TabsContent>
            
            <TabsContent value="projects" className="p-4">
              <ProjectCollaboration />
            </TabsContent>
            
            <TabsContent value="knowledge" className="p-4">
              <KnowledgeExchange />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
