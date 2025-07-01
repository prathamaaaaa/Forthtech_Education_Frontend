
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Package, Filter, Grid2X2, List, Search, Star, Tag } from 'lucide-react';

// Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  inStock: boolean;
  featured?: boolean;
  sale?: boolean;
}

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: 'QuadBot Pro',
    description: 'Advanced quadruped robot with programmable features',
    price: 299,
    image: '/lovable-uploads/9f22c1e6-ef79-40c9-a39a-724d62b32063.png',
    category: 'Robots',
    skillLevel: 'Advanced',
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'BipedalBot X1',
    description: 'Two-legged robot perfect for beginners',
    price: 149,
    image: '/lovable-uploads/2ce50d6c-0dc5-459e-9211-44af1a5bb4f4.png',
    category: 'Kits',
    skillLevel: 'Beginner',
    rating: 4.5,
    inStock: true
  },
  {
    id: 3,
    name: 'RoboArm Advanced',
    description: 'Professional-grade robotic arm for learning',
    price: 499,
    image: '/lovable-uploads/04cd8487-52d8-4d37-b93e-aa9fca4f1883.png',
    category: 'Robots',
    skillLevel: 'Advanced',
    rating: 4.9,
    inStock: true
  },
  {
    id: 4,
    name: 'Sensor Pack Basic',
    description: 'Collection of fundamental sensors for robotics projects',
    price: 79,
    image: '/placeholder.svg',
    category: 'Components',
    skillLevel: 'Beginner',
    rating: 4.2,
    inStock: true,
    sale: true
  },
  {
    id: 5,
    name: 'Vision System Pro',
    description: 'Advanced camera and vision processing module',
    price: 199,
    image: '/placeholder.svg',
    category: 'Components',
    skillLevel: 'Intermediate',
    rating: 4.7,
    inStock: false
  },
  {
    id: 6,
    name: 'Micro Controller Kit',
    description: 'Programmable controllers with accessories',
    price: 129,
    image: '/placeholder.svg',
    category: 'Kits',
    skillLevel: 'Intermediate',
    rating: 4.6,
    inStock: true
  },
  {
    id: 7,
    name: 'Robotics Toolkit Advanced',
    description: 'Complete set of tools for robotics assembly',
    price: 89,
    image: '/placeholder.svg',
    category: 'Tools',
    skillLevel: 'Advanced',
    rating: 4.4,
    inStock: true
  },
  {
    id: 8,
    name: 'TriBot Colorful Pack',
    description: 'Set of three colorful programmable robots',
    price: 599,
    image: '/lovable-uploads/cf22f7e3-a17e-42cb-94d5-d7815a34ebbb.png',
    category: 'Robots',
    skillLevel: 'Intermediate',
    rating: 4.3,
    inStock: true,
    featured: true
  },
  {
    id: 9,
    name: 'Robotic Arm Starter',
    description: 'Beginner-friendly robotic arm',
    price: 259,
    image: '/lovable-uploads/02a8d5b3-b8dc-4f60-ad70-1e023f4994dd.png',
    category: 'Robots',
    skillLevel: 'Beginner',
    rating: 4.5,
    inStock: true
  }
];

// Categories
const categories = ['All', 'Robots', 'Kits', 'Components', 'Tools'];

// Skill levels
const skillLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Marketplace = () => {
  // State for filters and display options
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtered products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSkillLevel = selectedSkillLevel === 'All' || product.skillLevel === selectedSkillLevel;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSkillLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Marketplace</h1>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : ''}
            >
              <Grid2X2 className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-700' : ''}
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Filters and search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex flex-1 relative">
            <Input 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex gap-2 flex-wrap items-center">
            <span className="flex items-center gap-1 text-sm">
              <Filter className="h-4 w-4" /> Filters:
            </span>
            
            <Tabs 
              defaultValue="All" 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
              className="w-auto"
            >
              <TabsList>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <Tabs 
              defaultValue="All" 
              value={selectedSkillLevel} 
              onValueChange={setSelectedSkillLevel}
              className="w-auto"
            >
              <TabsList>
                {skillLevels.map(level => (
                  <TabsTrigger key={level} value={level} className="text-xs">
                    {level}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Results summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredProducts.length} products
          </p>
        </div>
        
        {/* Product grid or list */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6 mb-8`}>
          {filteredProducts.map((product) => (
            <Card key={product.id} className={`overflow-hidden ${!product.inStock ? 'opacity-70' : ''}`}>
              <div className={`relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
                {product.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-forthtech-red">Featured</Badge>
                  </div>
                )}
                {product.sale && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-green-500 text-white border-0">Sale</Badge>
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Badge variant="outline" className="bg-gray-800 text-white border-white">Out of Stock</Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-xs ml-1">{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.skillLevel}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
              </CardContent>
              
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <div className="text-lg font-bold text-forthtech-red">
                  ${product.price}
                </div>
                <Button 
                  className="bg-forthtech-red hover:bg-red-600"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Pagination */}
        <Pagination className="mb-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
