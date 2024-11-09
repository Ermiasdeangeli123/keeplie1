import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onComposeClick: () => void;
}

export function Header({ onComposeClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Keeplie
            </h1>
            <p className="text-sm text-muted-foreground">Share your secret</p>
          </div>
          <Button
            onClick={onComposeClick}
            size="icon"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}