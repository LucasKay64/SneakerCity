import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import { Button } from "../../components/Button/Button";

import {
  addProductToCartSchema,
  addProductToCartFormDataType,
} from "../../schemas/validationSchemas";
import { Form } from "../../components/Form/Form";
import FormTextField from "../../components/FormTextField/FormTextField";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../../utils/dataUtils";
import { ProductDetails } from "../../types/dataTypes";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import InfoMessage from "../../components/InfoMessage/InfoMessage";
import NotFoundIcon from "../../assets/icons/not-found-icon.svg";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { addItemToCart } from "../../store/cartSlice/cartSlice";

const ProductPage = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const handleSubmit = (data: addProductToCartFormDataType) => {
    if (product === null) return;

    const { quantity } = data;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, ...productWithoutDescription } = product;

    const productToAdd = {
      ...productWithoutDescription,
      quantity,
    };

    dispatch(addItemToCart(productToAdd));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError("");

      try {
        const { data } = await fetchData<ProductDetails[]>(
          `${
            import.meta.env.VITE_SUPABASE_API_URL
          }/Products?id=eq.${id}&select=id,name,description,brand,price,color,collection,image_url`
        );

        if (data.length === 0) {
          setProduct(null);
        } else {
          setProduct(data[0]);
        }
      } catch (error) {
        setError(
          "Something went wrong with loading the product. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="flex justify-center items-center h-full">
        <InfoMessage icon={NotFoundIcon} message="No product found." />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col py-6 px-4 
        lg:flex-row lg:justify-center lg:gap-10 
        lg:px-24
        "
    >
      <BoxContainer className="block mb-5 lg:mb-0">
        <img
          src={product.image_url}
          alt="product image"
          className="border-inherit lg:h-[28rem] lg:w-[40rem]"
        />
      </BoxContainer>

      <div className="flex flex-col gap-2 justify-between">
        <p className="text-gray-400 text-lg  lg:text-xl">{product.brand}</p>
        <div>
          <p className="text-3xl font-bold lg:text-4xl">{product.name}</p>
          <p className="text-base lg:text-lg">{product.description}</p>
        </div>
        <p className="text-lg lg:text-xl">Color: {product.color}</p>
        <hr />
        <p className="text-xl font-bold lg:text-2xl">Price: ${product.price}</p>
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
  );
};

export default ProductPage;
