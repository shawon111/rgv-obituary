'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Comment {
  _id: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

interface CommentSectionProps {
  obituaryId: string;
}

export default function CommentSection({ obituaryId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    content: '',
    author: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [obituaryId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/obituaries/${obituaryId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.content.trim() || !newComment.author.firstName || !newComment.author.lastName || !newComment.author.email) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/obituaries/${obituaryId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        setNewComment({
          content: '',
          author: {
            firstName: '',
            lastName: '',
            email: '',
          },
        });
        // Show success message
        alert('Your comment has been submitted for approval.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading comments...</div>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Leave a Memory</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                value={newComment.author.firstName}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    author: { ...newComment.author, firstName: e.target.value },
                  })
                }
                required
              />
              <Input
                placeholder="Last Name"
                value={newComment.author.lastName}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    author: { ...newComment.author, lastName: e.target.value },
                  })
                }
                required
              />
            </div>
            <Input
              type="email"
              placeholder="Email Address"
              value={newComment.author.email}
              onChange={(e) =>
                setNewComment({
                  ...newComment,
                  author: { ...newComment.author, email: e.target.value },
                })
              }
              required
            />
            <Textarea
              placeholder="Share your memory or condolences..."
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              rows={4}
              required
            />
            <Button type="submit" disabled={isSubmitting} className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Comment'}</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share a memory.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment._id}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">
                      {comment.author.firstName} {comment.author.lastName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}