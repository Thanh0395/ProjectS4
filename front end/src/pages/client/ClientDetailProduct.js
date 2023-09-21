import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";

function ClientDetailProduct(props) {
  const [productA, setProductsA] = useState([]);
  // cach 1 su dung useLocation de get detail product
  //  const location = useLocation();
  //  const product = location.state.product;

  //cach 2 su dung UseParamsde get detail product
  const params = useParams();
  // console.log("params ben ngoai", params.id);
  useEffect(() => {
    // console.log("params ben trong",params)
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProductsA(data));
  }, [params]);
  // console.log("productA", productA);

  return (
    <div>
      <Card>
        <Card.Img
          variant="top"
          src={productA.image}
          alt={productA.title}
          style={{ maxWidth: "200px" }}
        />
        <Card.Body>
          <Card.Title>{productA.title}</Card.Title>
          <div className="d-flex justify-content-between">
            <Badge variant="success">
              Price: ${productA.price}
            </Badge>
          </div>
          <Card.Text>{productA.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ClientDetailProduct;
