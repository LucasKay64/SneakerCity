const LoadingSpinner = () => {
  return (
    <div>
      <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-blue-600"></div>
      <p className="text-2xl mt-4">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
