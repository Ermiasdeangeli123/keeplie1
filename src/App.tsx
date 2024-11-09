import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { ComposeDialog } from '@/components/ComposeDialog';
import { ConfessionCard } from '@/components/ConfessionCard';
import { NewPostsIndicator } from '@/components/NewPostsIndicator';
import { Toaster } from '@/components/ui/toaster';
import type { Confession } from '@/types/confession';

// Initialize QueryClient
const queryClient = new QueryClient();

// Mock data for demonstration
const mockConfessions: Confession[] = [
  {
    id: '1',
    text: "I've been pretending to know how to code for the past 2 years at work. ChatGPT is my real senior developer.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 42,
    comments: [
      {
        id: 'c1',
        text: "You're not alone! 😅",
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      },
    ],
  },
  {
    id: '2',
    text: "I tell everyone I'm busy with meetings when I'm actually taking naps during work from home days.",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 28,
    comments: [],
  },
];

function App() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [confessions, setConfessions] = useState<Confession[]>(mockConfessions);
  const [newPostsCount, setNewPostsCount] = useState(0);

  const handleSubmitConfession = (text: string) => {
    const newConfession: Confession = {
      id: Date.now().toString(),
      text,
      createdAt: new Date(),
      likes: 0,
      comments: [],
    };
    setConfessions((prev) => [newConfession, ...prev]);
  };

  const handleLike = (id: string) => {
    setConfessions((prev) =>
      prev.map((confession) =>
        confession.id === id
          ? {
              ...confession,
              likes: confession.hasLiked
                ? confession.likes - 1
                : confession.likes + 1,
              hasLiked: !confession.hasLiked,
            }
          : confession
      )
    );
  };

  const handleComment = (id: string, text: string) => {
    setConfessions((prev) =>
      prev.map((confession) =>
        confession.id === id
          ? {
              ...confession,
              comments: [
                ...confession.comments,
                {
                  id: Date.now().toString(),
                  text,
                  createdAt: new Date(),
                },
              ],
            }
          : confession
      )
    );
  };

  const handleShowNewPosts = () => {
    setNewPostsCount(0);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header onComposeClick={() => setIsComposeOpen(true)} />
        
        <main className="max-w-2xl mx-auto px-4 pt-24 pb-12">
          <NewPostsIndicator count={newPostsCount} onClick={handleShowNewPosts} />
          
          <div className="space-y-4">
            {confessions.map((confession) => (
              <ConfessionCard
                key={confession.id}
                confession={confession}
                onLike={handleLike}
                onComment={handleComment}
              />
            ))}
          </div>
        </main>

        <ComposeDialog
          open={isComposeOpen}
          onOpenChange={setIsComposeOpen}
          onSubmit={handleSubmitConfession}
        />
        
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;