import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/layout/main-layout";
import About from "@/pages/about";
import Projects from "@/pages/projects";
import AIWithAI from "@/pages/ai-with-ai";
import AIWithAIPost from "@/pages/ai-with-ai-post";
import Notes from "@/pages/notes";
import NotesPost from "@/pages/notes-post";
import Contact from "@/pages/contact";

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={About} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/ai-with-ai" component={AIWithAI} />
        <Route path="/ai-with-ai/:id" component={AIWithAIPost} />
        <Route path="/notes" component={Notes} />
        <Route path="/notes/:id" component={NotesPost} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
