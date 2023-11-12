import LogoWithText from "../../../assets/images/logoWithText.svg";
import FooterInfoLink from "../../../components/FooterInfoLink/FooterInfoLink";

const Footer = () => {
  return (
    <div
      className="bg-gradient-to-r from-blue-primary to-blue-secondary
        text-white
        flex flex-col items-center gap-4 lg:flex-row lg:px-24 lg:justify-between
        px-2
        py-8"
    >
      <img src={LogoWithText} alt="Footer logo" />
      <div className="flex flex-col text-center gap-4 sm:flex-row sm:gap-10 sm:text-start xl:gap-32">
        <FooterInfoLink
          title="About"
          links={["About us", "Features", "News & Blog"]}
        />

        <FooterInfoLink
          title="Connect"
          links={["Facebook", "Twitter", "Instagram"]}
        />

        <FooterInfoLink
          title="Support"
          links={["Help center", "Contact us", "Privacy Policy"]}
        />
      </div>
    </div>
  );
};

export default Footer;
