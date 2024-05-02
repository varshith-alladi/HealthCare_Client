import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productRoute } from "../utils/APIRoutes"; 
import { USER_KEY } from "../utils/secretkeys";

const ProductPage = () => {
  const { cart, setCart, totalCount, total, setTotal, setTotalCount } =
    useContext(ThemeContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .post(`${productRoute}/${id}`)
      .then((res) => {
          setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cartHandler = () => {
    if (!localStorage.getItem(USER_KEY)) {
      navigate("/register");
    } else {
      let flag = true;
      for (let i = 0; i < cart.length; i++) {
        if (product.productname === cart[i].productname) {
          flag = false;
          break;
        }
      }
      if (flag) {
        setCart((prevState) => {
          setTotalCount(totalCount + 1);
          setTotal(total + parseInt(product.price));
          return [...prevState, product];
        });
        toast.success("Food item added to cart", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.warning("Food item already exists in cart", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.productname}</Title>
          <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            fugiat quam similique nobis voluptatem dignissimos, incidunt et
            voluptates illo, laudantium minima velit laboriosam eligendi aut
            natus veritatis atque reiciendis deleniti?
          </Desc>
          <Price>Rs.{product.price}</Price>
          <AddContainer>
            <Button onClick={cartHandler}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <ToastContainer />
      <Newsletter />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 500;
`;

const Desc = styled.p`
  font-weight: 400;
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 300;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: white;
    background-color: black;
  }
`;

export default ProductPage;
