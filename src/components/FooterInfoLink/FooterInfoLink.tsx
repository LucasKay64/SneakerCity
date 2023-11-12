interface FooterInfoLinkProps {
  title: string;
  links: string[];
}

const FooterInfoLink = ({ title, links }: FooterInfoLinkProps) => {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
      <ul className="mt-1 text-base">
        {links.map((link, index) => (
          <li key={index}>
            <p
              className="
                relative
                cursor-pointer
                
                before:content-['']
                before:absolute
                before:left-0
                before:bottom-0
                before:w-0
                before:h-1
                before:ease-in-out
                before:duration-300
                before:bg-white
                hover:before:w-full"
            >
              {link}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterInfoLink;
