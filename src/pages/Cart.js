import React, { useContext, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../App";
import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "../components/Popup";
import paymentImg from "../images/payment.gif";
import axios from "axios";
import { transactionRoute } from "../utils/APIRoutes";
import { USER_KEY } from "../utils/secretkeys";

const Cart = () => {
  const deliver = 40;
  const [isOpen, setIsOpen] = useState(false);
  const { cart, total, totalCount } = useContext(ThemeContext);
  const [payment, setPayment] = useState({
    name: "",
    phone: "",
    ac: "",
    ifsc: "",
    amount: "",
    pincode: "",
    address: "",
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const validateForm = () => {
    if (payment.phone.length !== 10) {
      toast.error("Phone number should have 10 digits", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (payment.ac.length !== 12) {
      toast.error("Account number should have 12 digits", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (payment.pincode.length !== 6) {
      toast.error("Pincode should have 6 digits", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    return true;
  };

  const paymentHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post(transactionRoute, {
          accountholder: payment.name,
          phone: payment.phone,
          accountnumber: payment.ac,
          ifsc: payment.ifsc,
          amount:
            total -
            0.1 * total +
            totalCount +
            parseInt(`${totalCount > 0 ? deliver : 0}`),
          pincode: payment.pincode,
          address: payment.address,
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_KEY)).accessToken}`
          }
        })
        .then((res) => {
          if(res.data.status) {
            toast.success("Ordered Successfully", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            togglePopup();
            window.location.reload();
          }
          else{
            toast.error("Order Unsuccessful", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            togglePopup();
          }
        })
        .catch((err) => {
          if(err.response.status === 401 || err.response.status === 403) {
            toast.error("Unauthorized Access", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            togglePopup();
          }
          else{
            toast.error("Something Went Wrong", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            togglePopup();
          }
      });
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/medicines">
            <TopButton>CONTINUE ORDERING</TopButton>
          </Link>
          <TopTexts>
            <TopText style={{ textDecoration: "none" }}>
              ORDERS BAG ({totalCount})
            </TopText>
          </TopTexts>
          <TopButton
            type="filled"
            onClick={() => {
              togglePopup();
            }}
          >
            CHECKOUT NOW
          </TopButton>
        </Top>
        {isOpen && (
          <Popup
            content={
              <>
                <div>
                  <img
                    src={paymentImg}
                    height="70"
                    width="70"
                    alt="404 Error"
                  />
                  <Title style={{ color: "green" }}>PAYMENT DETAILS</Title>
                </div>
                <form onSubmit={paymentHandler}>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Account Holder Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Account Holder Name"
                      value={payment.name}
                      onChange={(e) => {
                        setPayment({ ...payment, name: e.target.value });
                      }}
                      required
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share this information with anyone else.
                    </small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Your Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Phone number"
                      value={payment.phone}
                      onChange={(e) => {
                        setPayment({ ...payment, phone: e.target.value });
                      }}
                      required
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share this information with anyone else.
                    </small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">
                      Your Account Number
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="A/C XXXXX XXXXX XXXXX"
                      value={payment.ac}
                      onChange={(e) => {
                        setPayment({ ...payment, ac: e.target.value });
                      }}
                      required
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share this information with anyone else.
                    </small>
                  </div>
                  <label for="exampleInputPassword1">IFSC Code</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="IFSC Code"
                    value={payment.ifsc}
                    onChange={(e) => {
                      setPayment({ ...payment, ifsc: e.target.value });
                    }}
                    required
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share this information with anyone else.
                  </small>
                  <div class="form-group">
                    <label for="exampleInputPassword1">
                      Total Amount (in &#8377;)
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      value={
                        total -
                        0.1 * total +
                        totalCount +
                        parseInt(`${totalCount > 0 ? deliver : 0}`)
                      }
                      required
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share this information with anyone else.
                    </small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Your Pin code</label>
                    <input
                      type="text"
                      min={6}
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter pincode"
                      value={payment.pincode}
                      onChange={(e) => {
                        setPayment({ ...payment, pincode: e.target.value });
                      }}
                      required
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share this information with anyone else.
                    </small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Your Address</label>
                    <textarea
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Suggestions"
                      value={payment.address}
                      onChange={(e) => {
                        setPayment({ ...payment, address: e.target.value });
                      }}
                      required
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share this information with anyone else.
                    </small>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    PAY NOW
                  </button>
                </form>
              </>
            }
            handleClose={togglePopup}
          />
        )}
        <Bottom>
          <Info>
            {cart.map((c) => {
              return <CartProduct key={c.id} c={c} />;
            })}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>SubTotal</SummaryItemText>
              <SummaryItemPrice>Rs. {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping (minimum)</SummaryItemText>
              <SummaryItemPrice>
                Rs. {totalCount + parseInt(`${totalCount > 0 ? deliver : 0}`)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>(10 %) Discount</SummaryItemText>
              <SummaryItemPrice>Rs. {0.1 * total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                Rs.
                {total -
                  0.1 * total +
                  totalCount +
                  parseInt(`${totalCount > 0 ? deliver : 0}`)}
              </SummaryItemPrice>
            </SummaryItem>
            <Button
              onClick={() => {
                togglePopup();
              }}
            >
              ORDER NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <ToastContainer />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 500;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  font-weight: 600;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 63vh;
  background-color: black;
`;

const SummaryTitle = styled.h1`
  font-size: 35px;
  font-weight: 400;
  color: white;
`;

const SummaryItem = styled.div`
  margin: 35px 0px;
  display: flex;
  color: white;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  color: black;
  font-weight: 600;
`;

export default Cart;
