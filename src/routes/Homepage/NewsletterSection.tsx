import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

const NewsletterSection = () => {
  return (
    <section className="py-12 px-2">
      <p className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Subscribe to our newsletter
      </p>
      <form className="flex flex-col justify-center items-center gap-2 mt-4 md:flex-row">
        <div className="md:w-96">
          <Input inputSize="lg" type="email" placeholder="Enter your email" />
        </div>
        <Button size="lg" className="font-bold">
          Subscribe
        </Button>
      </form>
    </section>
  );
};

export default NewsletterSection;
