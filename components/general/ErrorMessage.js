const ErrorMessage = ({ text, className }) => {
  return (
    <div
      className={`${className} bg-opacity-10 bg-red text-red py-2 px-4 text-sm w-full flex items-center`}
    >
      <div className="bg-red flex justify-center items-center text-white w-4 h-4 rounded-full font-bold text-xs">
        !
      </div>
      <span className="ml-2">{text}</span>
    </div>
  );
};

export default ErrorMessage;
