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

const EditProductPage = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);

  const { id } = useParams();

  const handleSubmit = (data: productManagementFormDataType) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await fetchData<ProductDetails[]>(
          `${
            import.meta.env.VITE_SUPABASE_API_URL
          }/Products?id=eq.${id}&select=id,name,description,brand,price,color,collection,image_url`
        );

        setProduct(data[0]);
      } catch (error) {
        console.log(error);
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
            />

            <FormTextField
              label="Description"
              name="description"
              id="description"
              placeholder="Description of product"
              registration={register("description")}
              error={errors.description}
            />

            <FormTextField
              label="Brand"
              name="brand"
              id="brand"
              placeholder="Brand of product"
              registration={register("brand")}
              error={errors.brand}
            />

            <FormTextField
              label="Price"
              name="price"
              id="price"
              placeholder="Price of product"
              registration={register("price")}
              error={errors.price}
              type="number"
            />

            <FormTextField
              label="Color"
              name="color"
              id="color"
              placeholder="Color of product"
              registration={register("color")}
              error={errors.color}
            />

            <FormTextField
              label="Collection"
              name="collection"
              id="collection"
              placeholder="Collection of product"
              registration={register("collection")}
              error={errors.collection}
            />

            <Button className="w-full" type="submit">
              Add product
            </Button>
          </>
        )}
      </Form>
    </BoxContainer>
  );
};

export default EditProductPage;
