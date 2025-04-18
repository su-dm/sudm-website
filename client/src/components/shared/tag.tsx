import { cn } from "@/lib/utils";

interface TagProps {
  text: string;
  className?: string;
}

// Define a consistent color palette for tags
const tagColors: Record<string, string> = {
  // Hardware related
  "PCB Design": "bg-red-100 text-red-800",
  "Embedded": "bg-orange-100 text-orange-800",
  "ESP32": "bg-amber-100 text-amber-800",
  "STM32": "bg-yellow-100 text-yellow-800",
  "Thermal Management": "bg-red-100 text-red-800",
  "Serial Protocols": "bg-purple-100 text-purple-800",
  "Embedded C": "bg-orange-100 text-orange-800",
  "Bluetooth LE": "bg-blue-100 text-blue-800",
  "MQTT": "bg-green-100 text-green-800",
  "IoT": "bg-emerald-100 text-emerald-800",
  
  // Software related
  "React": "bg-blue-100 text-blue-800",
  "Web Performance": "bg-indigo-100 text-indigo-800",
  "Node.js": "bg-green-100 text-green-800",
  "Python": "bg-blue-100 text-blue-800",
  "JavaScript": "bg-yellow-100 text-yellow-800",
  "TypeScript": "bg-blue-100 text-blue-800",
  "CSS": "bg-indigo-100 text-indigo-800",
  "API": "bg-emerald-100 text-emerald-800",
  "WebSockets": "bg-teal-100 text-teal-800",
  "D3.js": "bg-violet-100 text-violet-800",
  
  // AI/ML related
  "Neural Networks": "bg-purple-100 text-purple-800",
  "TensorFlow": "bg-orange-100 text-orange-800",
  "Machine Learning": "bg-fuchsia-100 text-fuchsia-800",
  "LSTM": "bg-purple-100 text-purple-800",
  "Time-Series": "bg-amber-100 text-amber-800",
  "Hardware Optimization": "bg-blue-100 text-blue-800",
  "Power Efficiency": "bg-green-100 text-green-800",
  "ML/AI": "bg-fuchsia-100 text-fuchsia-800",
  "Time-Series Analysis": "bg-rose-100 text-rose-800",
  
  // Default
  "default": "bg-gray-100 text-gray-800",
};

export function Tag({ text, className }: TagProps) {
  const colorClass = tagColors[text] || tagColors.default;
  
  return (
    <span className={cn(
      "px-2 py-1 rounded text-xs font-medium",
      colorClass,
      className
    )}>
      {text}
    </span>
  );
}
