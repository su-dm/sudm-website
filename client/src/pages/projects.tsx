import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  return (
    <section className="min-h-screen p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="border-b border-border pb-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold font-mono">Projects</h2>
          <div className="w-16 h-1 bg-primary mt-2"></div>
        </motion.div>
        
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {projects?.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface ProjectItemProps {
  project: Project;
  index: number;
}

function ProjectItem({ project, index }: ProjectItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="pb-6"
    >
      <div className="mb-2">
        <h3 className="text-xl font-bold font-mono">{project.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2 font-mono">
          <span>{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-3 font-mono text-sm">
        {project.description}
      </p>
      
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary hover:underline font-mono text-sm"
      >
        {project.link} <ExternalLink className="ml-1 h-3 w-3" />
      </a>
      
      {index < project.id - 1 && <Separator className="mt-6" />}
    </motion.div>
  );
}
