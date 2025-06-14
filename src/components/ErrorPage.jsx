import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return <div>Something Went Wrong {error.status}</div>;
};

export default ErrorPage;
