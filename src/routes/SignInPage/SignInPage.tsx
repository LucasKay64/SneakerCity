import useTailwindBreakpoints from "../../hooks/useTailwindBreakpoints";

import { Link } from "react-router-dom";
import {
  signInSchema,
  signInFormDataType,
} from "../../schemas/validationSchemas";

import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Form } from "../../components/Form/Form";
import FormTextField from "../../components/FormTextField/FormTextField";

import Logo from "../../assets/images/logo.svg";

const SignInPage = () => {
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

  const onSubmit = (data: signInFormDataType) => console.log(data);

  return (
    <section
      className="flex justify-center items-center bg-blob-scatter bg-cover"
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
              />

              <FormTextField
                label="Password"
                name="password"
                id="password"
                placeholder="••••••••"
                type="password"
                registration={register("password")}
                error={errors.password}
              />

              <div className="flex justify-between">
                <Checkbox id="remember-me">Remember me</Checkbox>
                <a href="#" className="text-sm font-medium hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button className="" type="submit">
                Sign in
              </Button>

              <p className="text-sm font-light text-gray-500">
                Don't have an account yet?{" "}
                <Link className="font-medium hover:underline" to="/sign-up">
                  Sign up
                </Link>
              </p>
            </>
          )}
        </Form>
      </BoxContainer>
    </section>
  );
};

export default SignInPage;
