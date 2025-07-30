import { Download, Moon, Sun, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/components/ui/theme-provider";
import { useState, useEffect } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleExport = async (format: 'json' | 'csv') => {
    try {
      const response = await fetch(`/api/export?format=${format}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-export.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <div className="flex items-center space-x-4">
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your campaigns.</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Activity className="animate-pulse text-green-500" size={14} />
              <span>Live • {lastUpdated}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Select defaultValue="7days" data-testid="date-range-select">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            data-testid="theme-toggle"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button onClick={() => handleExport('json')} data-testid="export-json">
              <Download size={16} className="mr-2" />
              Export JSON
            </Button>
            <Button variant="outline" onClick={() => handleExport('csv')} data-testid="export-csv">
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
