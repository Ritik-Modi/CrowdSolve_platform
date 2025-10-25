import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Edit2, Trash2, Send } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { solutionsAPI } from '../../api/solutions';
import Button from '../common/Button';
import { formatDate } from '../../utils/helpers';

const SolutionItem = ({ solution, onUpdate }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(solution.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = solution.postedBy === user?.id || solution.postedBy?._id === user?.id;
  const hasUpvoted = solution.upvotes?.includes(user?.id);

  const handleUpvote = async () => {
    try {
      await solutionsAPI.upvote(solution._id);
      onUpdate();
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await solutionsAPI.addComment(solution._id, commentText);
      setCommentText('');
      onUpdate();
    } catch (error) {
      console.error('Error commenting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editContent.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await solutionsAPI.update(solution._id, editContent);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this solution?')) return;

    try {
      await solutionsAPI.delete(solution._id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleUpdate} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(solution.content);
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">{solution.content}</p>
          )}
        </div>

        {isOwner && !isEditing && (
          <div className="flex gap-2 ml-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700 transition"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm mb-2">
        <button
          onClick={handleUpvote}
          className={`flex items-center gap-1 transition ${
            hasUpvoted ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <ThumbsUp size={16} fill={hasUpvoted ? 'currentColor' : 'none'} />
          <span className="font-medium">{solution.upvotes?.length || 0}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
        >
          <MessageSquare size={16} />
          <span className="font-medium">{solution.comments?.length || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-3 border-t border-gray-200 pt-3">
          {solution.comments && solution.comments.length > 0 && (
            <div className="space-y-2 mb-3">
              {solution.comments.map((comment) => (
                <div key={comment._id} className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{comment.text}</p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={isSubmitting}
            />
            <button
              onClick={handleComment}
              disabled={isSubmitting || !commentText.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionItem;