import ProblemCard from './ProblemCard';

const ProblemList = ({ problems }) => {
  if (!problems || problems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No problems found.</p>
        <p className="text-gray-500 mt-2">Be the first to post a problem!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {problems.map((problem) => (
        <ProblemCard key={problem._id} problem={problem} />
      ))}
    </div>
  );
};

export default ProblemList;