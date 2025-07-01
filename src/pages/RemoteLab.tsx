import React, { useState, useEffect } from "react";
import { FlaskConical, Play, Square, Wifi, WifiOff, Upload, Code, Monitor, Settings, Power, PowerOff, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const RemoteLab = () => {
  const [selectedRobot, setSelectedRobot] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [robotPower, setRobotPower] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [code, setCode] = useState("// Write your robot code here\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Your main code here\n}");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const robots = [
    {
      id: "dh-arm",
      name: "DH Parameters Robot Arm",
      description: "6-DOF robotic arm with configurable DH parameters",
      status: "available"
    },
    {
      id: "robotic-arm",
      name: "Industrial Robotic Arm",
      description: "High-precision industrial grade robotic arm",
      status: "available"
    },
    {
      id: "holonomic",
      name: "Holonomic Drive System",
      description: "Omnidirectional mobile robot platform",
      status: "occupied"
    },
    {
      id: "quadruped",
      name: "Quadruped Robot",
      description: "Four-legged walking robot with dynamic locomotion",
      status: "available"
    },
    {
      id: "line-follower",
      name: "Line Follower Robot",
      description: "Autonomous line following robot with sensors",
      status: "maintenance"
    }
  ];

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const handleRobotPower = () => {
    setRobotPower(!robotPower);
  };

  const handleStartStream = () => {
    setIsStreaming(!isStreaming);
  };

  const handleUploadCode = () => {
    // Simulate code upload
    console.log("Uploading code to robot:", code);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "occupied": return "bg-yellow-500";
      case "maintenance": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FlaskConical size={48} className="text-forthtech-red mr-3" />
            <h1 className="text-4xl font-bold">Remote Robot Laboratory</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Control and program real robots remotely. Select a robot, connect to the lab, and start experimenting with live robotics!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Robot Selection Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2" size={20} />
                  Robot Selection
                </CardTitle>
                <CardDescription>
                  Choose from our available robots
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select onValueChange={setSelectedRobot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a robot" />
                  </SelectTrigger>
                  <SelectContent>
                    {robots.map((robot) => (
                      <SelectItem 
                        key={robot.id} 
                        value={robot.id}
                        disabled={robot.status !== "available"}
                      >
                        {robot.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Robot Cards */}
                <div className="space-y-3">
                  {robots.map((robot) => (
                    <div 
                      key={robot.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedRobot === robot.id 
                          ? 'border-forthtech-red bg-red-50 dark:bg-red-900/10' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => robot.status === "available" && setSelectedRobot(robot.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{robot.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-white ${getStatusColor(robot.status)}`}
                        >
                          {robot.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{robot.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Stream and Controls Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="mr-2" size={20} />
                  Live Robot Stream & Controls
                </CardTitle>
                <CardDescription>
                  Connect to the lab and control your selected robot in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Connection Controls */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Button 
                      onClick={handleConnect}
                      variant={isConnected ? "destructive" : "default"}
                      className="flex items-center"
                    >
                      {isConnected ? <WifiOff className="mr-2" size={16} /> : <Wifi className="mr-2" size={16} />}
                      {isConnected ? "Disconnect" : "Connect to Server"}
                    </Button>
                    
                    <Button 
                      onClick={handleRobotPower}
                      variant={robotPower ? "destructive" : "secondary"}
                      disabled={!isConnected}
                      className="flex items-center"
                    >
                      {robotPower ? <PowerOff className="mr-2" size={16} /> : <Power className="mr-2" size={16} />}
                      Robot {robotPower ? "OFF" : "ON"}
                    </Button>

                    <Button 
                      onClick={handleStartStream}
                      variant={isStreaming ? "destructive" : "default"}
                      disabled={!isConnected}
                      className="flex items-center"
                    >
                      {isStreaming ? <Square className="mr-2" size={16} /> : <Play className="mr-2" size={16} />}
                      {isStreaming ? "Stop Stream" : "Start Stream"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium">
                      {isConnected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                </div>

                {/* Video Stream Area */}
                <div className="relative bg-black rounded-lg mb-6" style={{ aspectRatio: '16/9' }}>
                  {isStreaming ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Monitor size={48} className="mx-auto mb-2" />
                        <p>Live Robot Stream</p>
                        <p className="text-sm text-gray-300">
                          {selectedRobot ? robots.find(r => r.id === selectedRobot)?.name : "No robot selected"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <Monitor size={48} className="mx-auto mb-2 text-gray-500" />
                        <p className="text-gray-500">Stream not active</p>
                        <p className="text-sm text-gray-600">Click "Start Stream" to begin</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Real-time Data Display */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Battery</p>
                    <p className="text-lg font-bold text-blue-600">87%</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="text-lg font-bold text-green-600">42°C</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">CPU Usage</p>
                    <p className="text-lg font-bold text-yellow-600">23%</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="text-lg font-bold text-purple-600">2h 15m</p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock size={14} className="mr-1 text-orange-600" />
                      <p className="text-sm text-muted-foreground">Time</p>
                    </div>
                    <div className="text-xs font-bold text-orange-600">
                      <p>{currentTime.toLocaleTimeString()}</p>
                      <p>{currentTime.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Coding Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2" size={20} />
              Remote Coding Environment
            </CardTitle>
            <CardDescription>
              Write, test, and upload code to your selected robot from anywhere in the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Code Editor */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Code Editor</label>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="Write your robot code here..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleUploadCode}
                    disabled={!isConnected || !selectedRobot}
                    className="flex items-center"
                  >
                    <Upload className="mr-2" size={16} />
                    Upload to Robot
                  </Button>
                  <Button variant="outline">
                    Compile & Check
                  </Button>
                  <Button variant="outline">
                    Save Code
                  </Button>
                </div>
              </div>

              {/* Console/Output */}
              <div>
                <label className="block text-sm font-medium mb-2">Console Output</label>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[300px] overflow-y-auto">
                  <div className="mb-2">Robot Lab Console v1.0</div>
                  <div className="mb-2">Connecting to {selectedRobot || "no robot selected"}...</div>
                  {isConnected && (
                    <>
                      <div className="mb-2 text-blue-400">✓ Connection established</div>
                      <div className="mb-2">Ready for code upload</div>
                    </>
                  )}
                  {!isConnected && (
                    <div className="mb-2 text-red-400">✗ Not connected to lab server</div>
                  )}
                  <div className="text-gray-500">Waiting for commands...</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RemoteLab;
