import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="min-h-screen p-6 md:p-12">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-b border-border pb-4 mb-8">
          <h2 className="text-3xl font-bold font-mono">About</h2>
          <div className="w-16 h-1 bg-primary mt-2"></div>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none font-mono">
          <p>
            Hello, I'm John—an engineer with a passion for the intersection of hardware and software. 
            I specialize in creating technical solutions that bridge the gap between the physical and digital worlds.
          </p>
          
          <p>
            My technical interests include embedded systems, hardware design, machine learning, and web development. 
            I enjoy working on projects that challenge me to think across traditional boundaries and combine different 
            technologies in innovative ways.
          </p>
          
          <p>
            Whether I'm designing circuits, writing firmware, or developing web applications, my goal is always to build 
            elegant, efficient solutions that solve real problems.
          </p>
          
          <p>
            This site houses my thoughts on technology, project showcases, and a collection of technical notes 
            I've compiled while working on various challenges.
          </p>
          
          <p>
            Feel free to explore my projects or reach out via the contact form if you'd like to discuss potential 
            collaborations or just chat about technology.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
