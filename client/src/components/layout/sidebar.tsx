import { BarChart3, Users, Target, PieChart, Settings } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3, current: true },
  { name: "Audience", href: "/audience", icon: Users, current: false },
  { name: "Campaigns", href: "/campaigns", icon: Target, current: false },
  { name: "Reports", href: "/reports", icon: PieChart, current: false },
  { name: "Settings", href: "/settings", icon: Settings, current: false },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white text-sm" size={16} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">ADmyBRAND</h1>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                data-testid={`nav-${item.name.toLowerCase()}`}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                  item.current
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
