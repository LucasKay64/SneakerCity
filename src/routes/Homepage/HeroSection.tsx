import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

import HeroImage from "../../assets/images/heroImage.png";
import BlobMobile from "../../assets/images/blob-mobile.svg";
import Blob from "../../assets/images/blob.svg";
import SecurePaymentIcon from "../../assets/icons/secure-payment-icon.svg";
import FastDeliveryIcon from "../../assets/icons/fast-delivery-icon.svg";
import WarrantyTermIcon from "../../assets/icons/warranty-term-icon.svg";
import ArrowDownSquareIcon from "../../assets/icons/arrow-down-square-icon.svg";

import { Button } from "../../components/Button/Button";
import Emblem from "../../components/Emblem/Emblem";

import { useState, useEffect } from "react";

const HeroSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //nested destructuring
  let {
    theme: {
      // eslint-disable-next-line prefer-const
      spacing: { "navbar-lg": navbarLg },
      screens: { xl: xlBreakpoint },
    },
  } = resolveConfig(tailwindConfig);

  xlBreakpoint = parseInt(xlBreakpoint.replace("px", ""), 10);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="px-2 sm:px-10 lg:px-24 flex flex-col items-center justify-around min-[1920px]:gap-10 min-[1920px]:mb-10"
      style={{
        minHeight:
          windowWidth >= xlBreakpoint && windowWidth < 1920
            ? `calc(100vh - ${navbarLg})`
            : "0",
      }}
    >
      <div className="xl:flex xl:items-center xl:w-full xl:justify-between">
        <div className="text-center sm:pt-2 xl:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Sneaker City: <br /> Your Ultimate Footwear Destination
          </h1>

          <h2 className="text-base md:text-lg leading-6 mt-2 text-gray-600 xl:mt-4">
            Find the perfect pair of sneakers to match your fresh fit.
            <br />
            Official Nike, Adidas and Jordan retailer.
          </h2>

          <Button className="mt-4 xl:mt-8">Explore Collections</Button>
        </div>

        <div className="relative">
          <img src={HeroImage} alt="Blue Nike Air Force 1 Sneakers" />

          <img
            src={BlobMobile}
            className="absolute top-0 opacity-60 -z-10 w-11/12 xl:hidden"
            draggable="false"
          />
        </div>

        <img
          src={Blob}
          className="w-1/4 xl:w-auto absolute top-0 right-0 opacity-60 -z-10"
          draggable="false"
        />
      </div>

      <div
        className="
        flex flex-col items-center gap-2 w-full
        lg:flex-row lg:gap-0 lg:justify-between
        "
      >
        <Emblem
          icon={SecurePaymentIcon}
          title="Secure Payment"
          subtext="Authorized payment gates"
          alt="Secure Payment Icon"
        />

        <Emblem
          icon={FastDeliveryIcon}
          title="Ultra Fast Delivery"
          subtext="Within 24 hours"
          alt="Fast Delivery Icon"
        />

        <Emblem
          icon={WarrantyTermIcon}
          title="Extended Warranty"
          subtext="Up to 3 years"
          alt="Warranty Term Icon"
        />
      </div>

      <div className="flex justify-center mt-5">
        <img src={ArrowDownSquareIcon} className="w-10 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
