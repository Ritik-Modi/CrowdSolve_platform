import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Edit2, Trash2, Send, X, Check } from 'lucide-react';
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-4 sm:p-6">
        {/* Header with actions */}
        <div className="flex justify-between items-start gap-3 mb-4">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition resize-none"
                  rows={4}
                />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={handleUpdate} disabled={isSubmitting} icon={Check}>
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
                    icon={X}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {solution.content}
              </p>
            )}
          </div>

          {isOwner && !isEditing && (
            <div className="flex gap-1.5">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Interaction bar */}
        <div className="flex items-center gap-3 sm:gap-4 text-sm border-t border-gray-100 pt-4">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              hasUpvoted 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ThumbsUp size={16} fill={hasUpvoted ? 'currentColor' : 'none'} />
            <span className="font-semibold">{solution.upvotes?.length || 0}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              showComments 
                ? 'bg-gray-100 text-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare size={16} />
            <span className="font-semibold">{solution.comments?.length || 0}</span>
          </button>
        </div>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 bg-gray-50 border-t border-gray-200">
          {solution.comments && solution.comments.length > 0 && (
            <div className="space-y-2 pt-4">
              {solution.comments.map((comment) => (
                <div key={comment._id} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                  <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Add comment */}
          <div className="flex gap-2 pt-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition text-sm"
              disabled={isSubmitting}
            />
            <button
              onClick={handleComment}
              disabled={isSubmitting || !commentText.trim()}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
              title="Send comment"
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