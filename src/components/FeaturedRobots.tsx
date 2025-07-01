
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface RobotProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const robotProducts: RobotProduct[] = [
  {
    id: 1,
    name: 'EduBot Pro',
    description: 'Advanced educational robot with programmable features',
    price: 299,
    image: '/lovable-uploads/2ce50d6c-0dc5-459e-9211-44af1a5bb4f4.png',
  },
  {
    id: 2,
    name: 'Starter Kit X1',
    description: 'Perfect for beginners with basic components',
    price: 149,
    image: '/lovable-uploads/40f67270-3047-4835-9fd5-919de07d2603.png',
  },
  {
    id: 3,
    name: 'RoboArm Advanced',
    description: 'Professional-grade robotic arm for learning',
    price: 499,
    image: '/lovable-uploads/04cd8487-52d8-4d37-b93e-aa9fca4f1883.png',
  },
];

const FeaturedRobots = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Featured Robots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {robotProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <div className="text-lg font-bold text-forthtech-red">
                ${product.price}
              </div>
              <Button className="bg-forthtech-red hover:bg-red-600">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRobots;
