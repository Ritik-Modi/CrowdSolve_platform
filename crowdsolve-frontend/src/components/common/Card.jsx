const Card = ({ children, className = '', onClick, hover = false }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-md border border-gray-200/50 p-4 sm:p-6 
        transition-all duration-300
        ${hover ? 'hover:shadow-xl hover:-translate-y-1 hover:border-blue-200' : ''}
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;