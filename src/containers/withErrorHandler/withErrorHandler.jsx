import React, { Fragment, useEffect, useState } from "react";
import Modal from "../../components/UI/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    useEffect(() => {
      axios.interceptors.request.use((request) => {
        setError(null);
        return request;
      });
      axios.interceptors.response.use(
        (res) => res,
        (err) => {
          setError(err);
        }
      );
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Fragment>
        <Modal clicked={errorConfirmedHandler} show={error}>
          <p style={{ textAlign: "center" }}>{error ? error.message : null}</p>
        </Modal>
        <WrappedComponent {...props} />;
      </Fragment>
    );
  };
};

export default withErrorHandler;
