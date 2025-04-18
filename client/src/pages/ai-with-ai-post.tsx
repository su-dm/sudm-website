import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Post } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { formatDate, getReadingTime } from "@/lib/utils";
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function AIWithAIPost() {
  const [, params] = useRoute<{ id: string }>("/ai-with-ai/:id");
  const postId = params?.id || "";

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: [`/api/posts/ai/${postId}`],
  });

  if (isLoading) {
    return (
      <section className="min-h-screen p-6 md:p-12">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-40 mb-8" />
          
          <div className="mb-6">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="flex items-center gap-6 mb-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-screen p-6 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold font-mono mb-4">Post not found</h2>
          <Link href="/ai-with-ai">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI with AI
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  const readingTime = getReadingTime(post.content);
  const formattedDate = formatDate(post.date);

  return (
    <section className="min-h-screen p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/ai-with-ai">
            <Button variant="outline" className="mb-8 font-mono">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </Button>
          </Link>
        </motion.div>
        
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4 font-mono">{post.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mb-6 font-mono">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>{formattedDate}</span>
              <span className="mx-3">•</span>
              <Clock className="h-4 w-4 mr-2" />
              <span>{readingTime}</span>
            </div>
          </div>
          
          <Markdown content={post.content} />
        </motion.article>
      </div>
    </section>
  );
}
