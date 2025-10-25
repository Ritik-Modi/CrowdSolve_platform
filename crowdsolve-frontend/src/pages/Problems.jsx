import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import CreateProblem from '../components/problems/CreateProblem';
import Card from '../components/common/Card';

const CreateProblemPage = () => {
  const navigate = useNavigate();

  const handleSuccess = (problemId) => {
    navigate(`/problems/${problemId}`);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Post a Problem
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-600 ml-0 sm:ml-15">
            Share your problem with the community and crowdsource innovative solutions
          </p>
        </div>

        <Card>
          <CreateProblem onSuccess={handleSuccess} />
        </Card>

        {/* Tips Section */}
        <div className="mt-6 p-4 sm:p-6 bg-blue-50 border border-blue-200 rounded-2xl">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-blue-600">💡</span>
            Tips for posting a great problem
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Be specific and clear about what the problem is</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Provide context and background information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Explain why this problem matters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Choose the most relevant category</span>
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateProblemPage;