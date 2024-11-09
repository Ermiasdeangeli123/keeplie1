import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ComposeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (text: string) => void;
}

const MAX_CHARS = 280;

export function ComposeDialog({ open, onOpenChange, onSubmit }: ComposeDialogProps) {
  const [text, setText] = useState('');
  const { toast } = useToast();
  const charCount = text.length;

  const handleSubmit = () => {
    if (charCount > 0 && charCount <= MAX_CHARS) {
      onSubmit(text);
      setText('');
      onOpenChange(false);
      toast({
        title: 'Confession shared!',
        description: 'Your secret is now out in the world.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share your confession</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="What's your secret?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex items-center justify-between">
            <span
              className={`text-sm ${
                charCount > MAX_CHARS ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              {charCount}/{MAX_CHARS}
            </span>
            <Button
              onClick={handleSubmit}
              disabled={charCount === 0 || charCount > MAX_CHARS}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}