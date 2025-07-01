
import React from "react";
import { Code, Cpu, Settings, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type TrackKey = "software" | "electronics" | "mechanical";

export interface Module {
  id: string;
  title: string;
  description?: string;
}

export interface Track {
  key: TrackKey;
  icon: React.ReactNode;
  title: string;
  modules: Module[];
}

const tracks: Track[] = [
  {
    key: "software",
    icon: <Code className="h-6 w-6 text-forthtech-red" />,
    title: "Software Track",
    modules: [
      { id: "programming-fundamentals", title: "Programming Fundamentals", description: "Variables, data types, operators, logic" },
      { id: "robotics-programming", title: "Robotics Programming", description: "Sensor data, control architectures, motion planning" },
      { id: "advanced-programming", title: "Advanced Programming", description: "OOP, patterns, concurrency, memory management" },
      { id: "specialized-software", title: "Specialized Topics", description: "Computer Vision, ROS, ML, Human-Robot Interaction" }
    ]
  },
  {
    key: "electronics",
    icon: <Cpu className="h-6 w-6 text-blue-600" />,
    title: "Electronics Track",
    modules: [
      { id: "active-passive-elements", title: "Active and Passive Elements" },
      { id: "diodes-voltage-regulators", title: "Diodes & Voltage Regulators" },
      { id: "pullup-pulldown-reset", title: "Pull-up & Pull-down Circuits, Reset Circuits" },
      { id: "switches-transistors", title: "Switches & Transistors" },
      { id: "measurement-construction", title: "Measurement & Construction" },
      { id: "pcb-design", title: "PCB Design & Fabrication" },
      { id: "microcontroller-programming", title: "Microcontroller Programming" },
      { id: "programming-electronics", title: "Programming for Electronics" },
      { id: "advanced-applications", title: "Advanced Applications" }
    ]
  },
  {
    key: "mechanical",
    icon: <Settings className="h-6 w-6 text-green-600" />,
    title: "Mechanical Track",
    modules: [
      { id: "robotics-mechanics", title: "Fundamentals of Robotics Mechanics" },
      { id: "materials-components", title: "Materials and Components" },
      { id: "design-modeling", title: "Design and Modeling" },
      { id: "advanced-mechanical-systems", title: "Advanced Mechanical Systems" },
      { id: "industrial-applications", title: "Industrial Applications" },
      { id: "fabrication-prototyping", title: "Fabrication & Prototyping" }
    ]
  }
];

interface CurriculumTracksProps {
  onSelectModule: (moduleId: string) => void;
}

const CurriculumTracks: React.FC<CurriculumTracksProps> = ({ onSelectModule }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-extrabold mb-4">Curriculum Tracks & Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <Card className="hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-900/60" key={track.key}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">{track.icon}
                <CardTitle className="ml-2">{track.title}</CardTitle>
              </div>
              <CardDescription>
                {track.title === 'Software Track' && 'Learn programming fundamentals, robotics code, and advanced software for robots.'}
                {track.title === 'Electronics Track' && 'Understand and build the circuits, PCBs, and control systems at the heart of robotics.'}
                {track.title === 'Mechanical Track' && 'Master mechanics—from robot frames to transmission and fabrication.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {track.modules.map(module => (
                  <li key={module.id} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium">{module.title}</div>
                      {module.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">{module.description}</div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="ml-2"
                      aria-label={`Open ${module.title}`}
                      onClick={() => onSelectModule(module.id)}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CurriculumTracks;

