export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Electronics':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Software':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Mechanical':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'AI/ML':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};
