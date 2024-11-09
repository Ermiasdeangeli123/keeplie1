import { useState } from 'react';
import { format } from 'timeago.js';
import { Heart, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import type { Confession } from '@/types/confession';

interface ConfessionCardProps {
  confession: Confession;
  onLike: (id: string) => void;
  onComment: (id: string, text: string) => void;
}

export function ConfessionCard({ confession, onLike, onComment }: ConfessionCardProps) {
  const [comment, setComment] = useState('');

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(confession.text);
    const url = encodeURIComponent(window.location.href);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const handleComment = () => {
    if (comment.trim()) {
      onComment(confession.id, comment);
      setComment('');
    }
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="pt-6">
        <p className="text-lg">{confession.text}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {format(confession.createdAt)}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${confession.hasLiked ? 'text-purple-600' : ''}`}
              onClick={() => onLike(confession.id)}
            >
              <Heart className="h-4 w-4" />
              {confession.likes}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {confession.comments.length}
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleShare('twitter')}>
                Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('facebook')}>
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                WhatsApp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {confession.comments.length > 0 && (
          <>
            <Separator />
            <div className="w-full space-y-2">
              {confession.comments.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <p>{comment.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(comment.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        
        <div className="w-full flex gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none"
          />
          <Button
            onClick={handleComment}
            disabled={!comment.trim()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}