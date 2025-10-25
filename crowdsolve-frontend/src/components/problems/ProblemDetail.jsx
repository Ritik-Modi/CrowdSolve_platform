import { User, Calendar, Tag, Eye, MessageSquare } from 'lucide-react';
import Card from '../common/Card';
import { formatDate } from '../../utils/helpers';

const ProblemDetail = ({ problem }) => {
  if (!problem) return null;

  const statusColor = problem.status === 'solved' 
    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
    : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200';

  return (
    <Card>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex-1">
            {problem.title}
          </h1>
          <span className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold ${statusColor} shadow-sm self-start`}>
            {problem.status || 'open'}
          </span>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <User className="w-4 h-4 text-blue-600" />
            <span>
              <span className="text-gray-500">by</span>{' '}
              <span className="font-semibold text-gray-900">
                {problem.user?.username || 'Anonymous'}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="font-medium">{formatDate(problem.createdAt)}</span>
          </div>
          {problem.category && (
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
              <Tag className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-700">{problem.category}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
          Description
        </h3>
        <p className="text-gray-700 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
          {problem.description}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl text-center border border-blue-100">
          <MessageSquare className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-bold text-blue-600">
            {problem.solutionCount || 0}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
            Solutions
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl text-center border border-purple-100">
          <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-bold text-purple-600">
            {problem.views || 0}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
            Views
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProblemDetail;