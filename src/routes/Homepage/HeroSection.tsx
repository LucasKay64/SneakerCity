import HeroImage from "../../assets/images/heroImage.png";
import BlobMobile from "../../assets/images/blob-mobile.svg";
import Blob from "../../assets/images/blob.svg";
import SecurePaymentIcon from "../../assets/icons/secure-payment-icon.svg";
import FastDeliveryIcon from "../../assets/icons/fast-delivery-icon.svg";
import WarrantyTermIcon from "../../assets/icons/warranty-term-icon.svg";
import ArrowDownSquareIcon from "../../assets/icons/arrow-down-square-icon.svg";

import { Button } from "../../components/Button/Button";
import Emblem from "../../components/Emblem/Emblem";

const HeroSection = () => {
  return (
    <section>
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sneaker City: <br /> Your Ultimate Footwear Destination
          </h1>

          <h2 className="text-base leading-6 mt-2 text-gray-600">
            Find the perfect pair of sneakers to match your fresh fit.
            <br />
            Official Nike, Adidas and Jordan retailer.
          </h2>

          <Button className="mt-4">Explore Collections</Button>
        </div>

        <div className="relative">
          <img src={HeroImage} alt="Blue Nike Air Force 1 Sneakers" />

          <img
            src={BlobMobile}
            className="absolute top-0 opacity-60 -z-10 w-11/12"
            draggable="false"
          />
        </div>

        <img
          src={Blob}
          className="w-1/4 absolute top-0 right-0 opacity-60 -z-10"
          draggable="false"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
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
