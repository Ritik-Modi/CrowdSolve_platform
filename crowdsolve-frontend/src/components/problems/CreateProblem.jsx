import { useState } from 'react';
import { problemsAPI } from '../../api/problems';
import Input from '../common/Input';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import { validateProblemTitle, validateProblemDescription } from '../../utils/validators';

const CreateProblem = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const categories = [
    'Technology',
    'Health',
    'Education',
    'Environment',
    'Business',
    'Social',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const titleError = validateProblemTitle(formData.title);
    if (titleError) newErrors.title = titleError;

    const descError = validateProblemDescription(formData.description);
    if (descError) newErrors.description = descError;

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    try {
      setLoading(true);
      const response = await problemsAPI.create(formData);
      if (onSuccess) {
        onSuccess(response._id);
      }
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to create problem');
      console.error('Error creating problem:', err);
    } finally {
      setLoading(false);
    }
  };

  const charCount = formData.description.length;
  const charLimit = 5000;
  const charPercentage = (charCount / charLimit) * 100;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && <ErrorMessage message={apiError} />}

      <Input
        label="Problem Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="What's the problem?"
        error={errors.title}
        required
      />

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base ${
            errors.category ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-gray-300'
          }`}
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-start gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></span>
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the problem in detail..."
          rows={8}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-sm sm:text-base ${
            errors.description ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-gray-300'
          }`}
          required
        />
        {errors.description && (
          <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-start gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></span>
            {errors.description}
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
      </div>

      <Button type="submit" disabled={loading} fullWidth>
        {loading ? 'Creating...' : 'Create Problem'}
      </Button>
    </form>
  );
};

export default CreateProblem;