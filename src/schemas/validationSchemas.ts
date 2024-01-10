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
    .min(4, "Password must be at least 4 characters")
    .max(255, "Password must not exceed 255 characters")
    .trim(),
});
export type signInFormDataType = yup.InferType<typeof signInSchema>;
