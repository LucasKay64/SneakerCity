import { useState, useEffect } from "react";

import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import FormTextField from "../../components/FormTextField/FormTextField";

import {
  productManagementSchema,
  productManagementFormDataType,
} from "../../schemas/validationSchemas";
import { useParams } from "react-router-dom";
import { ProductDetails } from "../../types/dataTypes";
import { fetchData } from "../../utils/dataUtils";
import { useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (data: productManagementFormDataType) => {
    const dataToSend = {
      ...data,
      image_url:
        "https://ycwumwfnjelxvcwzllib.supabase.co/storage/v1/object/public/sneakers/Nike/nike-air-force-1-white.png",
    };

    try {
      setIsLoading(true);
      setError("");
      await fetchData(
        `${import.meta.env.VITE_SUPABASE_API_URL}/Products?id=eq.${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Prefer: "return=minimal",
          },
          method: "PATCH",
          body: JSON.stringify(dataToSend),
        }
      );

      navigate("/admin");
    } catch (error) {
      setError(
        "Something went wrong with editing the product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setError("");
      await fetchData(
        `${import.meta.env.VITE_SUPABASE_API_URL}/Products?id=eq.${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "DELETE",
        }
        // {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // }
      );

      navigate("/admin");
    } catch (error) {
      setError(
        "Something went wrong with deleting the product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError("");
        const { data } = await fetchData<ProductDetails[]>(
          `${
            import.meta.env.VITE_SUPABASE_API_URL
          }/Products?id=eq.${id}&select=id,name,description,brand,price,color,collection,image_url`
        );

        setProduct(data[0]);
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

  return (
    <BoxContainer className="px-3 sm:px-5 lg:px-10 py-5 w-full max-w-lg">
      <h1 className="text-xl text-center lg:text-left font-bold">
        Edit product
      </h1>

      <Form<productManagementFormDataType, typeof productManagementSchema>
        onSubmit={handleSubmit}
        schema={productManagementSchema}
        className="flex flex-col gap-4"
        defaultValues={
          product
            ? {
                name: product.name,
                description: product.description,
                brand: product.brand,
                price: product.price,
                color: product.color,
                collection: product.collection,
              }
            : undefined
        }
      >
        {({ register, formState: { errors } }) => (
          <>
            <FormTextField
              label="Name"
              name="name"
              id="name"
              placeholder="Name of product"
              registration={register("name")}
              error={errors.name}
              disabled={isLoading}
            />

            <FormTextField
              label="Description"
              name="description"
              id="description"
              placeholder="Description of product"
              registration={register("description")}
              error={errors.description}
              disabled={isLoading}
            />

            <FormTextField
              label="Brand"
              name="brand"
              id="brand"
              placeholder="Brand of product"
              registration={register("brand")}
              error={errors.brand}
              disabled={isLoading}
            />

            <FormTextField
              label="Price"
              name="price"
              id="price"
              placeholder="Price of product"
              registration={register("price")}
              error={errors.price}
              type="number"
              disabled={isLoading}
            />

            <FormTextField
              label="Color"
              name="color"
              id="color"
              placeholder="Color of product"
              registration={register("color")}
              error={errors.color}
              disabled={isLoading}
            />

            <FormTextField
              label="Collection"
              name="collection"
              id="collection"
              placeholder="Collection of product"
              registration={register("collection")}
              error={errors.collection}
              disabled={isLoading}
            />

            <Button
              className="w-full"
              type="submit"
              disabled={isLoading}
              variant={isLoading ? "disabled" : "default"}
            >
              Edit product
            </Button>

            <Button
              className="w-full"
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              variant={isLoading ? "disabled" : "danger"}
            >
              Delete product
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}
          </>
        )}
      </Form>
    </BoxContainer>
  );
};

export default EditProductPage;
