import { useState, useEffect } from "react";
import { Plus, Trash2, Check } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("study-todos");
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse todos", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("study-todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 p-4 sm:p-8 font-sans">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 tracking-tight text-white">Study Flow</h1>
          <p className="text-gray-400 text-sm italic">Finish today, win tomorrow.</p>
          
          {totalCount > 0 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="h-1 flex-1 bg-[#2a2a2a] rounded-full overflow-hidden max-w-[200px]">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-500">
                {completedCount} / {totalCount}
              </span>
            </div>
          )}
        </header>

        {/* Input area */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a study task..."
            className="flex-1 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600 text-white"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white p-3 rounded-xl transition-all flex items-center justify-center"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {todos.length === 0 && isLoaded && (
            <div className="text-center py-12 border-2 border-dashed border-[#2a2a2a] rounded-2xl">
              <p className="text-gray-600">No tasks for today. Start fresh!</p>
            </div>
          )}
          
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`group flex items-center gap-4 bg-[#1f1f1f] border border-[#2a2a2a] p-4 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer`}
              onClick={() => toggleTodo(todo.id)}
            >
              {/* Checkbox */}
              <div 
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  todo.completed 
                    ? "bg-blue-500 border-blue-500" 
                    : "border-[#3a3a3a] bg-transparent"
                }`}
              >
                {todo.completed && <Check size={16} className="text-white" />}
              </div>

              {/* Text */}
              <span 
                className={`flex-1 text-[16px] sm:text-[17px] transition-all duration-200 ${
                  todo.completed ? "line-through text-gray-600" : "text-gray-200"
                }`}
              >
                {todo.text}
              </span>

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(todo.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-600 hover:text-red-400 transition-all rounded-lg hover:bg-[#2a2a2a]"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Reset Button */}
        {todos.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Clear all tasks?")) {
                setTodos([]);
              }
            }}
            className="w-full mt-12 text-gray-600 hover:text-gray-400 text-xs font-medium uppercase tracking-widest transition-colors py-4"
          >
            Reset Day
          </button>
        )}
      </div>
    </div>
  );
}
