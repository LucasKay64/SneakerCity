interface InfoMessageProps {
  icon: string;
  message: string;
}

const InfoMessage = ({ icon, message }: InfoMessageProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={icon} alt="not found icon" className="h-20 w-20" />
      <p className="text-2xl font-semibold text-gray-800 mt-4">{message}</p>
    </div>
  );
};

export default InfoMessage;
