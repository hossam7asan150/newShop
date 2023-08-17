import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
// import { useState, useEffect } from "react";
// import axios from "axios";

const HomeScreen = () => {
   const { data: products, isLoading, isError } = useGetProductsQuery();
   // const [products, setProducts] = useState([]);
   // useEffect(() => {
   //    const fetchProducts = async () => {
   //       const { data } = await axios.get("/api/products");
   //       setProducts(data);
   //    };
   //    fetchProducts();
   // }, []);

   return (
      <>
         {isLoading ? (
            <h2>Loading ...</h2>
         ) : isError ? (
            <div>{isError?.data?.message || isError?.error}</div>
         ) : (
            <>
               <h1>Latest Products</h1>
               <Row>
                  {products.map((product) => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                     </Col>
                  ))}
               </Row>
            </>
         )}
      </>
   );
};
export default HomeScreen;
