import React, { Fragment } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

const Checkout = (props) => {
  // const [ingredients, setIngredients] = useState({});
  // const [price, setPrice] = useState(0);

  // useEffect(() => {
  //   const query = new URLSearchParams(props.location.search);
  //   let burgerIngredients = {};

  //   for (let instance of query.entries()) {
  //     if (instance[0] === "totalPrice") {
  //       setPrice(instance[1]);
  //     } else {
  //       burgerIngredients[instance[0]] = Number(instance[1]);
  //     }
  //   }
  //   setIngredients(burgerIngredients);
  //   console.log(burgerIngredients);
  // }, []);

  const onCheckoutCancel = () => {
    props.history.goBack();
  };

  const onCheckoutPurchase = () => {
    props.history.replace("/checkout/contact-data");
  };

  return (
    <Fragment>
      <CheckoutSummary
        onCheckoutCancel={onCheckoutCancel}
        onCheckoutPurchase={onCheckoutPurchase}
        ingredients={props.ingredients}
      ></CheckoutSummary>
      <Route
        path={props.match.path + "/contact-data"}
        render={(props) => (
          <ContactData
            ingredients={props.ingredients}
            totalPrice={props.totalPrice}
            {...props}
          />
        )}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    method: () => dispatch({ type: "Test", value: "test" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
