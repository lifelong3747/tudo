import { useTasks } from "@/hooks/use-tasks";
import { TaskInput } from "@/components/TaskInput";
import { TaskItem } from "@/components/TaskItem";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

export default function Home() {
  const { data: tasks, isLoading, error } = useTasks();
  
  // Confetti effect when all tasks are done
  const prevCompletedRef = useRef(0);
  
  useEffect(() => {
    if (!tasks) return;
    
    const completedCount = tasks.filter(t => t.completed).length;
    const isAllDone = tasks.length > 0 && completedCount === tasks.length;
    
    // Only fire if we just reached 100% completion (simple check)
    if (isAllDone && completedCount > prevCompletedRef.current) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#A78BFA', '#EDE9FE']
      });
    }
    
    prevCompletedRef.current = completedCount;
  }, [tasks]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-destructive/5 p-6 rounded-2xl max-w-md text-center">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold text-destructive mb-2">Oops! Connection Lost</h2>
          <p className="text-muted-foreground">Unable to load your tasks. Please check your internet connection.</p>
        </div>
      </div>
    );
  }

  const sortedTasks = tasks ? [...tasks].sort((a, b) => a.id - b.id) : [];

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Daily Focus</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-display tracking-tight">
            Finish today, <br className="hidden sm:block" />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              win tomorrow.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Your minimalist space to track study goals and get things done.
          </p>
        </header>

        {/* Input Section */}
        <div className="relative z-10">
          <TaskInput />
        </div>

        {/* Tasks List */}
        <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl shadow-primary/5 border border-white/20 min-h-[300px]">
          {sortedTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center opacity-60">
              <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-lg font-medium text-foreground">No tasks yet</p>
              <p className="text-sm text-muted-foreground">Add a task above to start your day</p>
            </div>
          ) : (
            <motion.div layout className="space-y-3">
              <AnimatePresence mode="popLayout">
                {sortedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <Footer tasks={sortedTasks} />
        </div>
        
        {/* Motivational Tip - Hidden on small screens to save space */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground/50 font-medium">
            "Success is the sum of small efforts, repeated day in and day out."
          </p>
        </div>
      </div>
    </div>
  );
}
