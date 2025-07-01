
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">About ForthTech</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Empowering the next generation of robotics engineers
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-sm text-gray-600 dark:text-gray-400 hover:text-forthtech-red">Marketplace</Link></li>
              <li><Link to="/learning-hub" className="text-sm text-gray-600 dark:text-gray-400 hover:text-forthtech-red">Learning Hub</Link></li>
              <li><Link to="/community" className="text-sm text-gray-600 dark:text-gray-400 hover:text-forthtech-red">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-sm text-gray-600 dark:text-gray-400 hover:text-forthtech-red">Help Center</Link></li>
              <li><Link to="/docs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-forthtech-red">Documentation</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-forthtech-red">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-forthtech-red">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-forthtech-red">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-forthtech-red">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ForthTech Robotics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
