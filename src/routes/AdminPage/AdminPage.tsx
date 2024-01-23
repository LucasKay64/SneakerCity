import { useEffect, useState } from "react";
import { fetchData } from "../../utils/dataUtils";
import { ProductDetails } from "../../types/dataTypes";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import InfoMessage from "../../components/InfoMessage/InfoMessage";
import NotFoundIcon from "../../assets/icons/not-found-icon.svg";
import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table/Table";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError("");

      try {
        const { data } = await fetchData<ProductDetails[]>(
          `${
            import.meta.env.VITE_SUPABASE_API_URL
          }/Products?select=id,name,description,brand,price,color,collection,image_url`
        );

        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setError(
          "Something went wrong with loading the products. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <InfoMessage icon={NotFoundIcon} message="No product found." />
      </div>
    );
  }

  return (
    <BoxContainer className="py-5 px-10 overflow-x-auto lg:min-w-[30rem]">
      <Table>
        <TableCaption className="text-2xl text-center font-bold py-2">
          Admin
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[2rem]">ID</TableHead>
            <TableHead className="min-w-[10rem]">Item</TableHead>
            <TableHead className="min-w-[10rem]">Image</TableHead>
            <TableHead className="min-w-[10rem]">Description</TableHead>
            <TableHead className="min-w-[5rem]">Brand</TableHead>
            <TableHead className="min-w-[5rem]">Price</TableHead>
            <TableHead className="min-w-[5rem]">Color</TableHead>
            <TableHead className="min-w-[10rem]">Collection</TableHead>
            <TableHead className="min-w-[3rem]">Edit</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map(
            ({
              id,
              image_url,
              name,
              description,
              brand,
              price,
              color,
              collection,
            }) => (
              <TableRow key={id} className="border-b">
                <TableCell>{id}</TableCell>
                <TableCell>
                  <p>{name}</p>
                </TableCell>
                <TableCell>
                  <img src={image_url} className="w-32 h-24" />
                </TableCell>
                <TableCell className="pr-3">{description}</TableCell>
                <TableCell>{brand}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell className="pr-3">{color}</TableCell>
                <TableCell className="pr-3">{collection}</TableCell>
                <TableCell className="text-center">
                  <Button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate(`editProduct/${id}`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <div className="text-center pt-5">
        <Button onClick={() => navigate(`addProduct`)}>Add product</Button>
      </div>
    </BoxContainer>
  );
};

export default AdminPage;
