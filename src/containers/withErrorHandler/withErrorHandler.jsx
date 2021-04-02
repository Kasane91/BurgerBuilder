import React, { Fragment, useEffect, useState } from "react";
import Modal from "../../components/UI/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    useEffect(() => {
      const reqInterceptor = axios.interceptors.request.use((request) => {
        setError(null);
        return request;
      });

      const resInterceptor = axios.interceptors.response.use(
        (res) => {
          console.log("Working");
          return res;
        },
        (err) => {
          setError(err);
        }
      );
      return function cleanup() {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
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
