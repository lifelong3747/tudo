import { useState } from "react";
import { useCreateTask } from "@/hooks/use-tasks";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function TaskInput() {
  const [text, setText] = useState("");
  const { mutate: createTask, isPending } = useCreateTask();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    createTask(
      { text, completed: false },
      {
        onSuccess: () => {
          setText("");
          toast({
            title: "Task Added",
            description: "Let's get this done!",
            duration: 2000,
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to add task. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new study task..."
        className="w-full px-6 py-4 pr-16 text-lg rounded-2xl bg-white shadow-lg shadow-black/[0.03] border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none placeholder:text-muted-foreground/60 font-medium"
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={!text.trim() || isPending}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Plus className="w-5 h-5 stroke-[3]" />
        )}
      </button>
      
      {/* Decorative background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10" />
    </form>
  );
}
