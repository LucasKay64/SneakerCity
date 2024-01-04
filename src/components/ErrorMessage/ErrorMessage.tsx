import ErrorIcon from "../../assets/icons/error-icon-red.svg";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={ErrorIcon} alt="error icon" className="h-20 w-20" />
      <p className="text-2xl font-bold text-red-500 mt-4">{message}</p>
    </div>
  );
};

export default ErrorMessage;
