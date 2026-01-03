import { Task } from "@shared/schema";
import { useClearTasks } from "@/hooks/use-tasks";
import { RotateCcw, Award } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface FooterProps {
  tasks: Task[];
}

export function Footer({ tasks }: FooterProps) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const { mutate: clearTasks, isPending } = useClearTasks();

  if (totalCount === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-dashed border-border/60">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
             <div 
              className="absolute inset-0 rounded-full border-2 border-primary/20"
              style={{
                clipPath: `inset(0 ${100 - percentage}% 0 0)` // simple circular progress approximation
              }} 
             />
             <Award className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {completedCount} of {totalCount} completed
            </p>
            <div className="w-32 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Day
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-display">Start Fresh?</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear all your tasks. Are you ready to reset for tomorrow?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl border-0 shadow-none hover:bg-muted">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => clearTasks()} 
                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isPending ? "Clearing..." : "Reset All Tasks"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
