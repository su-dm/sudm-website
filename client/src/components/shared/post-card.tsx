import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, truncateText, getReadingTime } from "@/lib/utils";
import { CalendarIcon, Clock, ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";

interface PostCardProps {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  type: "ai" | "notes";
}

export function PostCard({ id, title, date, excerpt, content, tags, type }: PostCardProps) {
  const readingTime = getReadingTime(content);
  const formattedDate = formatDate(date);
  const baseUrl = type === "ai" ? "/ai-with-ai" : "/notes";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6 hover:shadow-md transition-shadow overflow-hidden border-border/50 bg-card/50">
        <CardContent className="p-6">
          <div className="flex items-center text-sm text-muted-foreground mb-3 font-mono">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{formattedDate}</span>
            <span className="mx-3">•</span>
            <Clock className="h-4 w-4 mr-2" />
            <span>{readingTime}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 font-mono">{title}</h3>
          
          <p className="text-muted-foreground mb-4 font-mono text-sm">
            {truncateText(excerpt, 150)}
          </p>
          
          <Link href={`${baseUrl}/${id}`}>
            <div className="inline-flex items-center text-primary hover:text-primary/80 font-medium cursor-pointer font-mono">
              Read More 
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </div>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
