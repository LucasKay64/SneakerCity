import useTailwindBreakpoints from "../../hooks/useTailwindBreakpoints";

import { Link } from "react-router-dom";

import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import { Input } from "../../components/Input/Input";
import { Label } from "../../components/Label/Label";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";

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

        <form className="flex flex-col gap-4">
          <div className="">
            <Label htmlFor="email">Your email</Label>
            <Input
              inputSize="lg"
              type="email"
              id="email"
              placeholder="name@company.com"
              className="mt-1"
            />
          </div>

          <div className="">
            <Label htmlFor="password">Password</Label>
            <Input
              inputSize="lg"
              type="password"
              id="password"
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

          <div className="flex justify-between">
            <Checkbox id="remember-me">Remember me</Checkbox>
            <a href="#" className="text-sm font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          <Button className="">Sign in</Button>

          <p className="text-sm font-light text-gray-500">
            Don't have an account yet?{" "}
            <Link
              className="font-medium hover:underline"
              to="/sign-up"
              reloadDocument
            >
              Sign up
            </Link>
          </p>
        </form>
      </BoxContainer>
    </section>
  );
};

export default SignInPage;
