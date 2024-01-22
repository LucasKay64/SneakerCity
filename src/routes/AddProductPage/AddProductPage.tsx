import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import FormTextField from "../../components/FormTextField/FormTextField";
import {
  productManagementSchema,
  productManagementFormDataType,
} from "../../schemas/validationSchemas";

import { fetchData } from "../../utils/dataUtils";

const AddProductPage = () => {
  const handleSubmit = async (data: productManagementFormDataType) => {
    const dataToSend = {
      ...data,
      image_url:
        "https://ycwumwfnjelxvcwzllib.supabase.co/storage/v1/object/public/sneakers/Nike/nike-air-force-1-white.png",
    };

    try {
      await fetchData(
        `${import.meta.env.VITE_SUPABASE_API_URL}/Products`,
        {
          method: "POST",
          body: JSON.stringify(dataToSend),
        },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Prefer: "return=minimal",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BoxContainer className="px-3 sm:px-5 lg:px-10 py-5 w-full max-w-lg">
      <h1 className="text-xl text-center lg:text-left font-bold">
        Add product
      </h1>

      <Form<productManagementFormDataType, typeof productManagementSchema>
        onSubmit={handleSubmit}
        schema={productManagementSchema}
        className="flex flex-col gap-4"
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

export default AddProductPage;
