import { Link } from "react-router-dom";
import {
  signUpSchema,
  signUpFormDataType,
} from "../../../schemas/validationSchemas";
import {
  signUpWithPasswordAsync,
  selectUser,
} from "../../../store/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";

import { BoxContainer } from "../../../components/BoxContainer/BoxContainer";
import { Button } from "../../../components/Button/Button";
import { Form } from "../../../components/Form/Form";
import FormTextField from "../../../components/FormTextField/FormTextField";

import Logo from "../../../assets/images/logo.svg";

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectUser);

  const onSubmit = async (data: signUpFormDataType) => {
    const { email, password } = data;

    dispatch(signUpWithPasswordAsync({ email, password }));
  };

  return (
    <BoxContainer className="px-3 sm:px-5 lg:px-10 py-5 w-full max-w-lg">
      <div className="relative py-4">
        <h1 className="text-xl text-center lg:text-left font-bold">
          Create an account
        </h1>
        <img
          src={Logo}
          alt="logo"
          className="hidden lg:block lg:absolute lg:top-0 lg:right-0"
        />
      </div>

      <Form<signUpFormDataType, typeof signUpSchema>
        onSubmit={onSubmit}
        schema={signUpSchema}
        className="flex flex-col gap-4"
      >
        {({ register, formState: { errors } }) => (
          <>
            <FormTextField
              label="Your email"
              name="email"
              id="email"
              placeholder="name@company.com"
              registration={register("email")}
              error={errors.email}
              disabled={isLoading}
            />

            <FormTextField
              label="Password"
              name="password"
              id="password"
              placeholder="••••••••"
              type="password"
              registration={register("password")}
              error={errors.password}
              disabled={isLoading}
            />

            <FormTextField
              label="Confirm password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              registration={register("confirmPassword")}
              error={errors.confirmPassword}
              disabled={isLoading}
            />

            <Button
              variant={isLoading ? "disabled" : "default"}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating an acccount..." : "Create an account"}
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <p className="text-sm font-light text-gray-500">
              Already have an account?{" "}
              <Link className="font-medium hover:underline" to="/auth/sign-in">
                Login here
              </Link>
            </p>
          </>
        )}
      </Form>
    </BoxContainer>
  );
};

export default SignUpPage;
