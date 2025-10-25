import { useState, useEffect } from 'react';
import { User, FileText, CheckCircle, Award } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/common/Card';
import ProblemCard from '../components/problems/ProblemCard';
import { useAuth } from '../hooks/useAuth';
import axiosInstance from '../api/axios';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const Profile = () => {
  const { user } = useAuth();
  const [userProblems, setUserProblems] = useState([]);
  const [userSolutions, setUserSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('problems');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [problemsRes, solutionsRes] = await Promise.all([
        axiosInstance.get(`/users/${user.id}/problems`),
        axiosInstance.get(`/users/${user.id}/solutions`)
      ]);
      setUserProblems(problemsRes.data);
      setUserSolutions(solutionsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const totalUpvotes = userSolutions.reduce((sum, sol) => sum + (sol.upvotes?.length || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Header */}
        <Card className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {user?.username}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{user?.email}</p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-100">
                  <FileText className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">
                    {userProblems.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Problems</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {userSolutions.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Solutions</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4 rounded-xl border border-purple-100">
                  <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">
                    {totalUpvotes}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Upvotes</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-4 sm:px-6 py-3 font-semibold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 text-sm sm:text-base ${
              activeTab === 'problems'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            My Problems
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            className={`px-4 sm:px-6 py-3 font-semibold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 text-sm sm:text-base ${
              activeTab === 'solutions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            My Solutions
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <Loading text="Loading your data..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div>
            {activeTab === 'problems' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {userProblems.length > 0 ? (
                  userProblems.map(problem => (
                    <ProblemCard key={problem._id} problem={problem} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 sm:py-16">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg font-medium">
                      You haven't posted any problems yet
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Share a problem with the community to get started!
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'solutions' && (
              <div className="space-y-3 sm:space-y-4">
                {userSolutions.length > 0 ? (
                  userSolutions.map(solution => (
                    <Card key={solution._id} hover>
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                        {solution.problem?.title || 'Problem'}
                      </h3>
                      <p className="text-gray-700 text-sm sm:text-base mb-4">
                        {solution.description}
                      </p>
                      <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-medium">
                          <span>👍</span>
                          {solution.upvotes?.length || 0} upvotes
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium">
                          <span>💬</span>
                          {solution.comments?.length || 0} comments
                        </span>a
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 sm:py-16">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg font-medium">
                      You haven't posted any solutions yet
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Help solve community problems to earn recognition!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;