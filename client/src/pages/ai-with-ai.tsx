import { useQuery } from "@tanstack/react-query";
import { Post } from "@shared/schema";
import { PostCard } from "@/components/shared/post-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AIWithAI() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts/ai'],
  });

  return (
    <section className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="border-b border-border pb-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">AI with AI</h2>
          <div className="w-24 h-1 bg-primary mt-2"></div>
          <p className="mt-4 text-muted-foreground">
            Exploring the intersection of artificial intelligence and its applications in engineering.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-40 mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            {posts?.map(post => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                content={post.content}
                tags={post.tags}
                type="ai"
              />
            ))}
            
            {posts?.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No posts yet</h3>
                <p className="text-muted-foreground">Check back soon for new content!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
