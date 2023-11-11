import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

const NewsletterSection = () => {
  return (
    <section className="py-12 px-2">
      <p className="text-center text-2xl font-bold tracking-tight text-gray-900">
        Subscribe to our newsletter
      </p>
      <form className="flex flex-col justify-center items-center gap-2 mt-4">
        <Input type="email" placeholder="Enter your email" />
        <div>
          <Button className="font-bold">Subscribe</Button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterSection;
