import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .max(255, "Email must not exceed 255 characters")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must not exceed 255 characters")
    .trim(),
});
export type signInFormDataType = yup.InferType<typeof signInSchema>;

export const signUpSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .max(255, "Email must not exceed 255 characters")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must not exceed 255 characters")
    .trim(),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match")
    .trim(),
});
export type signUpFormDataType = yup.InferType<typeof signUpSchema>;

export const addProductToCartSchema = yup.object({
  quantity: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .max(100, "Quantity must not exceed 100"),
});
export type addProductToCartFormDataType = yup.InferType<
  typeof addProductToCartSchema
>;

export const productManagementSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(255, "Name must not exceed 255 characters")
    .trim(),
  description: yup
    .string()
    .required("Description is required")
    .max(255, "Description must not exceed 255 characters")
    .trim(),
  brand: yup
    .string()
    .required("Brand is required")
    .max(255, "Brand must not exceed 255 characters")
    .trim(),
  price: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required("Price is required")
    .min(1, "Price must be at least 1")
    .max(1000000, "Price must not exceed 1,000,000"),
  color: yup
    .string()
    .required("Color is required")
    .max(255, "Color must not exceed 255 characters")
    .trim(),
  collection: yup
    .string()
    .required("Collection is required")
    .max(255, "Collection must not exceed 255 characters")
    .trim(),
  // image_url: yup
  //   .string()
  //   .required("Image URL is required")
  //   .max(255, "Image URL must not exceed 255 characters")
  //   .trim(),
});
export type productManagementFormDataType = yup.InferType<
  typeof productManagementSchema
>;
