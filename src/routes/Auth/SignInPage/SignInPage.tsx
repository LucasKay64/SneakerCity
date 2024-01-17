import { Link } from "react-router-dom";
import {
  signInSchema,
  signInFormDataType,
} from "../../../schemas/validationSchemas";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectUser } from "../../../store/userSlice/userSlice";
import { signInWithPasswordAsync } from "../../../store/userSlice/userSlice";

import { BoxContainer } from "../../../components/BoxContainer/BoxContainer";
import { Button } from "../../../components/Button/Button";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Form } from "../../../components/Form/Form";
import FormTextField from "../../../components/FormTextField/FormTextField";

import Logo from "../../../assets/images/logo.svg";

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectUser);

  const onSubmit = async (data: signInFormDataType) => {
    const { email, password } = data;

    dispatch(signInWithPasswordAsync({ email, password }));
  };

  return (
    <BoxContainer className="px-3 sm:px-5 lg:px-10 py-5 w-full max-w-lg">
      <div className="relative py-4">
        <h1 className="text-xl text-center lg:text-left font-bold">
          Sign in to your account
        </h1>
        <img
          src={Logo}
          alt="logo"
          className="hidden lg:block lg:absolute lg:top-0 lg:right-0"
        />
      </div>

      <Form<signInFormDataType, typeof signInSchema>
        onSubmit={onSubmit}
        schema={signInSchema}
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

            <div className="flex justify-between">
              <Checkbox id="remember-me">Remember me</Checkbox>
              <a href="#" className="text-sm font-medium hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              variant={isLoading ? "disabled" : "default"}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <p className="text-sm font-light text-gray-500">
              Don't have an account yet?{" "}
              <Link className="font-medium hover:underline" to="/auth/sign-up">
                Sign up
              </Link>
            </p>
          </>
        )}
      </Form>
    </BoxContainer>
  );
};

export default SignInPage;
