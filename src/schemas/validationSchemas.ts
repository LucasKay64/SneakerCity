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
