import { useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Users, User, Shield, Cpu, Code, Wrench, Brain, Zap, Globe, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ENV = {
  BASE_URL: import.meta.env.VITE_URL || "http://localhost:5000",
};
type UserRole = 'student' | 'mentor' | 'admin';
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', 
    // role: 'student' as UserRole,
    // age: '',
    // country: '',
    email: '',
    password: '',
    // interests: [] as string[],
    // customInterest: '',
    // handsOnPractice: false,
    // remoteLabAccess: false,
  });

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Japan', 'Australia', 
    'India', 'China', 'Brazil', 'Other'
  ];

  // const interestOptions = [
  //   { id: 'robotics', label: 'Robotics Fundamentals', icon: Wrench },
  //   { id: 'ai', label: 'AI & Machine Learning', icon: Brain },
  //   { id: 'programming', label: 'C/C++ Programming', icon: Code },
  //   { id: 'electronics', label: 'Electronics & Circuits', icon: Zap },
  //   { id: '3d-printing', label: '3D Printing & Design', icon: Cpu },
  // ];

  // const handleInterestChange = (interestId: string, checked: boolean) => {
  //   if (checked) {
  //     setFormData(prev => ({
  //       ...prev,
  //       interests: [...prev.interests, interestId]
  //     }));
  //   } else {
  //     setFormData(prev => ({
  //       ...prev,
  //       interests: prev.interests.filter(id => id !== interestId)
  //     }));
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Signup data:', formData);
  //   // Handle signup logic here
  // };

//   const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   console.log('Signup data:', formData);

//   // Save email and password to localStorage
//   localStorage.setItem('email', formData.email);
//   localStorage.setItem('password', formData.password);

//   alert('Signup successful! Now you can log in.');
// };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Signup data:', formData);

  try {
    const response = await axios.post(`${ENV.BASE_URL}/api/users`, formData);

    // Save email and password to localStorage (optional)
    localStorage.setItem('email', formData.email);
    localStorage.setItem('password', formData.password);

    navigate('/login');
    console.log('Backend response:', response.data);
        setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  } catch (error) {
    console.error('Error sending data to backend:', error);
    alert('Signup Failed! Please try again.');
  }
};
  const isPasswordStrong = (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[^A-Za-z0-9]/.test(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forthtech-red via-purple-600 to-blue-600 relative overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Robotics Parts */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20 animate-bounce">
          <Cpu className="w-full h-full text-white" />
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 opacity-15 animate-pulse delay-300">
          <Wrench className="w-full h-full text-blue-200" />
        </div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 opacity-10 animate-bounce delay-700">
          <Brain className="w-full h-full text-purple-200" />
        </div>
        <div className="absolute top-1/3 left-1/2 w-14 h-14 opacity-20 animate-pulse delay-1000">
          <Code className="w-full h-full text-white" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-18 h-18 opacity-15 animate-bounce delay-500">
          <Zap className="w-full h-full text-yellow-200" />
        </div>
        
        {/* Circuit Patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <path d="M100,100 L200,100 L200,200 L300,200 L300,300" stroke="white" strokeWidth="2" fill="none" className="animate-pulse" />
          <circle cx="200" cy="100" r="4" fill="white" className="animate-pulse delay-200" />
          <path d="M800,150 L700,150 L700,250 L600,250 L600,350" stroke="white" strokeWidth="2" fill="none" className="animate-pulse delay-300" />
          <circle cx="700" cy="150" r="4" fill="white" className="animate-pulse delay-500" />
          <path d="M150,800 L250,800 L250,700 L350,700 L350,600" stroke="white" strokeWidth="2" fill="none" className="animate-pulse delay-700" />
          <circle cx="250" cy="800" r="4" fill="white" className="animate-pulse delay-900" />
        </svg>
        
        {/* Floating Code Snippets */}
        <div className="absolute top-60 left-1/5 text-white/10 text-xs font-mono animate-pulse delay-1500">
          int main() {'{'}
          <br />
          &nbsp;&nbsp;return 0;
          <br />
          {'}'}
        </div>
        <div className="absolute bottom-60 right-1/5 text-white/10 text-xs font-mono animate-pulse delay-2000">
          void setup() {'{'}
          <br />
          &nbsp;&nbsp;Serial.begin();
          <br />
          {'}'}
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/43686a65-c0b6-4a4a-9cb3-528d13a6f8bb.png" 
                alt="ForthTech Logo" 
                className="h-16"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">Join ForthTech</h1>
              <p className="text-white/90 text-lg">Create Your Account</p>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                Centralized Educational Robotics Platform
              </Badge>
            </div>
          </div>

          {/* Glassmorphism Card */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl text-center text-forthtech-dark">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-center">
                Join thousands of learners in the robotics community
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                {/* <div className="space-y-3">
                  <Label className="text-base font-medium">Select Your Role</Label>
                  <RadioGroup 
                    value={formData.role} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}
                  >
                    {[
                      { role: 'student' as UserRole, icon: User, label: 'Student', desc: 'Learn and explore robotics' },
                      { role: 'mentor' as UserRole, icon: Users, label: 'Mentor', desc: 'Guide and teach students' },
                      { role: 'admin' as UserRole, icon: Shield, label: 'Admin', desc: 'Manage platform and users' }
                    ].map(({ role, icon: Icon, label, desc }) => (
                      <div key={role} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={role} id={role} />
                        <Icon className={`h-5 w-5 ${formData.role === role ? 'text-forthtech-red' : 'text-gray-500'}`} />
                        <Label htmlFor={role} className="flex-1 cursor-pointer">
                          <div className="font-medium">{label}</div>
                          <div className="text-sm text-gray-500">{desc}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div> */}

                {/* Age and Country */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      min="13"
                      max="100"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2" />
                              {country}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}

                {/* Email and Password */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Create a strong password"
                      required
                    />
                    <div className="flex items-center space-x-2 text-sm">
                      {isPasswordStrong(formData.password) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={isPasswordStrong(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                        Strong password (8+ chars, uppercase, lowercase, number, symbol)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interest Section */}
                <div className="space-y-3">
                  {/* <Label className="text-base font-medium">Areas of Interest</Label> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* {interestOptions.map(({ id, label, icon: Icon }) => (
                      <div key={id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <Checkbox
                          id={id}
                          checked={formData.interests.includes(id)}
                          onCheckedChange={(checked) => handleInterestChange(id, checked as boolean)}
                        />
                        <Icon className="h-5 w-5 text-forthtech-red" />
                        <Label htmlFor={id} className="flex-1 cursor-pointer">{label}</Label>
                      </div>
                    ))} */}
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="customInterest">Other Interests (Optional)</Label>
                    <Textarea
                      id="customInterest"
                      placeholder="Tell us about your other interests in robotics..."
                      value={formData.customInterest}
                      onChange={(e) => setFormData(prev => ({ ...prev, customInterest: e.target.value }))}
                      rows={3}
                    />
                  </div> */}
                </div>

                {/* Hands-on Practice Options */}
                {/* <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <Label className="text-base font-medium">Practical Learning Options</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="handsOnPractice"
                        checked={formData.handsOnPractice}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, handsOnPractice: checked as boolean }))}
                      />
                      <Label htmlFor="handsOnPractice" className="cursor-pointer">
                        I'm interested in hands-on practice with physical robots
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="remoteLabAccess"
                        checked={formData.remoteLabAccess}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, remoteLabAccess: checked as boolean }))}
                      />
                      <Label htmlFor="remoteLabAccess" className="cursor-pointer">
                        I want access to remote lab facilities
                      </Label>
                    </div>
                  </div>
                </div> */}

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full bg-forthtech-red hover:bg-red-700 text-white"
                  size="lg"
                >
                  Create Account
                </Button>
              </form>

              {/* Footer Links */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-forthtech-red hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center">
            <Link to="/" className="text-white/80 hover:text-white text-sm underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
