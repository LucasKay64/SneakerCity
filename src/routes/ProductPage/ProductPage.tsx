import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import HeroImage from "../../assets/images/heroImage.png";
import { Button } from "../../components/Button/Button";
import useTailwindBreakpoints from "../../hooks/useTailwindBreakpoints";

import {
  addProductToCartSchema,
  addProductToCartFormDataType,
} from "../../schemas/validationSchemas";
import { Form } from "../../components/Form/Form";
import FormTextField from "../../components/FormTextField/FormTextField";

import { useParams } from "react-router-dom";

const ProductPage = () => {
  const {
    windowWidth,
    lgBreakpoint,
    navbarLg,
    mdBreakpoint,
    navbar,
    navbarMd,
    navbarSm,
    smBreakpoint,
  } = useTailwindBreakpoints();

  const { id } = useParams();

  const handleSubmit = (data: addProductToCartFormDataType) => {
    const { quantity } = data;

    // TODO: add product to cart
  };

  // todo: fetch product data

  return (
    <section
      className="flex justify-center items-center"
      style={{
        minHeight: ((): string => {
          if (windowWidth >= lgBreakpoint) {
            return `calc(100vh - ${navbarLg})`;
          } else if (windowWidth >= mdBreakpoint) {
            return `calc(100vh - ${navbarMd})`;
          } else if (windowWidth >= smBreakpoint) {
            return `calc(100vh - ${navbarSm})`;
          } else {
            return `calc(100vh - ${navbar})`;
          }
        })(),
      }}
    >
      <div
        className="flex flex-col py-6 px-4 
        lg:flex-row lg:justify-center lg:gap-10 
        lg:px-24
        "
      >
        <BoxContainer className="block mb-5 lg:mb-0">
          <img src={HeroImage} alt="product image" className="border-inherit" />
        </BoxContainer>

        <div className="flex flex-col gap-2 justify-between">
          <p className="text-gray-400 text-lg  lg:text-xl">Nike</p>
          <div>
            <p className="text-3xl font-bold lg:text-4xl">Nike Air Max 1</p>
            <p className="text-base lg:text-lg">
              A collaboration of adidas and jordan with the iconic air max 1
              silhouette.
            </p>
          </div>
          <p className="text-lg lg:text-xl">Color: blue, white</p>
          <hr />
          <p className="text-xl font-bold lg:text-2xl">Price: $100</p>
          <hr />

          <Form<addProductToCartFormDataType, typeof addProductToCartSchema>
            onSubmit={handleSubmit}
            schema={addProductToCartSchema}
            className="flex flex-col gap-4"
          >
            {({ register, formState: { errors } }) => (
              <>
                <div>
                  <p className="text-lg lg:text-xl">How many to order</p>
                  <FormTextField
                    name="quantity"
                    inputSize="default"
                    id="quantity"
                    type="number"
                    registration={register("quantity")}
                    error={errors.quantity}
                    defaultValue={1}
                  />
                </div>
                <Button className="w-full" type="submit">
                  Add to cart
                </Button>
              </>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
