import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import LearningHub from "./pages/LearningHub";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import RemoteLab from "./pages/RemoteLab";
import AILearningAdvisor from "./pages/AILearningAdvisor";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Login1 from "./pages/Login1";
import ChatWrapper from "./components/community/ChatSystemComponent/ChatWrapper";
// import { Toaster } from "sonner";
import { SocketProvider } from "@/SocketContext"; 


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/learning-hub" element={<LearningHub />} />
             <Route
  path="/community"
  element={
    <SocketProvider user={JSON.parse(localStorage.getItem("user") || "{}").user}>
      <Community />
    </SocketProvider>
  }
/>

            <Route path="/remote-lab" element={<RemoteLab />} />
            <Route path="/ai-advisor" element={<AILearningAdvisor />} />
            <Route path="/login" element={<Login1 />} />
            <Route path="/login1" element={<Login1 />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/invite" element={<ChatWrapper />} /> */}

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
