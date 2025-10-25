import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { solutionsAPI } from '../../api/solutions';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import { validateSolutionDescription } from '../../utils/validators';

const CreateSolution = ({ problemId, onSuccess }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setError(null);

    const validationError = validateSolutionDescription(description);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await solutionsAPI.create({
        problem: problemId,
        description
      });
      setDescription('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to create solution');
      console.error('Error creating solution:', err);
    } finally {
      setLoading(false);
    }
  };

  const charCount = description.length;
  const charLimit = 3000;
  const charPercentage = (charCount / charLimit) * 100;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          Post Your Solution
        </h3>
      </div>
      
      {apiError && <ErrorMessage message={apiError} className="mb-4" />}

      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Share your innovative solution to this problem..."
          rows={6}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-sm sm:text-base ${
            error ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-gray-300'
          }`}
        />
        {error && (
          <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-start gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></span>
            {error}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <p className={`text-xs sm:text-sm ${charPercentage > 90 ? 'text-red-600' : 'text-gray-500'}`}>
            {charCount} / {charLimit} characters
          </p>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                charPercentage > 90 ? 'bg-red-500' : charPercentage > 70 ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(charPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="mt-4">
          <Button type="submit" disabled={loading} fullWidth>
            {loading ? 'Posting...' : 'Post Solution'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSolution;