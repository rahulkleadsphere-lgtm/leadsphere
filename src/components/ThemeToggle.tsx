import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`theme-toggle-btn rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px] text-amber-400 transition-transform duration-500 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-slate-700 transition-transform duration-500 rotate-0 hover:-rotate-12" />
      )}
    </Button>
  );
}
