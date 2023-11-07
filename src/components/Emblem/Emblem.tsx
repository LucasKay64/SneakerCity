interface EmblemProps {
  icon: string;
  title: string;
  subtext: string;
  alt: string;
}

const Emblem = ({ icon, title, subtext, alt }: EmblemProps) => {
  return (
    <div className="flex items-center gap-2 w-64">
      <img
        src={icon}
        className="w-14 bg-blue-primary p-1 rounded-xl"
        alt={alt}
        draggable="false"
      />
      <div>
        <p className="text-xl">{title}</p>
        <p className="text-sm">{subtext}</p>
      </div>
    </div>
  );
};

export default Emblem;
