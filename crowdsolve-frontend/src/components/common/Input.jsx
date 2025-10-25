const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base ${
          error 
            ? 'border-red-500 focus:ring-red-500 bg-red-50/30' 
            : 'border-gray-300 focus:border-blue-500'
        } ${
          disabled 
            ? 'bg-gray-100 cursor-not-allowed opacity-60' 
            : 'bg-white'
        }`}
        {...props}
      />
      {error && (
        <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-start gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;