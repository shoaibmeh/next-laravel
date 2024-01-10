const MessageModal = ({ type, message, onClose }) => {
    const getTypeStyles = () => {
      switch (type) {
        case 'error':
          return 'bg-red-500';
        case 'success':
          return 'bg-green-500';
        default:
          return 'bg-gray-500';
      }
    };
  
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className={`p-4 ${getTypeStyles()}`}>
              <h2 className="text-white font-bold">{type === 'error' ? 'Error' : 'Success'}</h2>
              <p className="text-white">{message}</p>
              <button onClick={onClose} className="mt-4 bg-white text-gray-800 py-2 px-4 rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MessageModal;
  