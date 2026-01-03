import { Task } from "@shared/schema";
import { useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { Trash2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const toggleComplete = () => {
    updateTask({ id: task.id, completed: !task.completed });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className={cn(
        "group relative flex items-center gap-4 p-4 bg-white rounded-2xl border border-transparent shadow-sm hover:shadow-md transition-all duration-300",
        task.completed ? "bg-muted/30" : "hover:border-primary/10"
      )}
    >
      <button
        onClick={toggleComplete}
        className={cn(
          "relative flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center overflow-hidden",
          task.completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/30 hover:border-primary/50"
        )}
      >
        <AnimatePresence>
          {task.completed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-4 h-4 text-white stroke-[3]" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <span
        className={cn(
          "flex-1 text-base font-medium transition-all duration-300 select-none cursor-pointer",
          task.completed
            ? "text-muted-foreground line-through decoration-2 decoration-muted-foreground/50"
            : "text-foreground"
        )}
        onClick={toggleComplete}
      >
        {task.text}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        disabled={isDeleting}
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {/* Progress line animation for completion */}
      <div 
        className={cn(
          "absolute bottom-0 left-4 right-4 h-[2px] bg-primary/10 origin-left transition-transform duration-500",
          task.completed ? "scale-x-100" : "scale-x-0"
        )}
      />
    </motion.div>
  );
}
