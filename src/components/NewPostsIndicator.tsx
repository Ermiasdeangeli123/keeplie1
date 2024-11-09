import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

interface NewPostsIndicatorProps {
  count: number;
  onClick: () => void;
}

export function NewPostsIndicator({ count, onClick }: NewPostsIndicatorProps) {
  if (count === 0) return null;

  return (
    <div className="sticky top-20 z-40 flex justify-center">
      <Button
        onClick={onClick}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg group"
      >
        <ChevronUp className="h-4 w-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
        {count} new {count === 1 ? 'confession' : 'confessions'}
      </Button>
    </div>
  );
}