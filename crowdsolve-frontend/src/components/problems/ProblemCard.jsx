import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Eye, MessageSquare, Tag } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatDate } from '../../utils/helpers';

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();

  const handleViewSolutions = () => {
    navigate(`/problems/${problem._id}`);
  };

  return (
    <Card hover className="flex flex-col h-full">
      {/* Header with category badge */}
      <div className="flex items-start justify-between mb-3 gap-3">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 flex-1">
          {problem.title}
        </h3>
        {problem.category && (
          <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full whitespace-nowrap font-medium">
            <Tag size={12} />
            <span className="hidden sm:inline">{problem.category}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 flex-grow">
        {problem.description}
      </p>

      {/* Image (if exists) */}
      {problem.image && (
        <div className="mb-4 -mx-4 sm:-mx-6">
          <img
            src={problem.image}
            alt={problem.title}
            className="w-full h-40 sm:h-48 object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-1.5">
          <MessageSquare size={16} className="text-blue-600" />
          <span className="font-medium">{problem.solutionCount || 0}</span>
          <span className="hidden sm:inline">solutions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Eye size={16} className="text-gray-500" />
          <span className="font-medium">{problem.views || 0}</span>
          <span className="hidden sm:inline">views</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto text-xs">
          <Calendar size={14} className="text-gray-400" />
          <span>{formatDate(problem.createdAt)}</span>
        </div>
      </div>

      {/* Action Button */}
      <Button onClick={handleViewSolutions} fullWidth size="md">
        <span>View Solutions</span>
      </Button>
    </Card>
  );
};

export default ProblemCard;