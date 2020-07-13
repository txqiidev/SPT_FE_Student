import React from "react";
import Button from "../components/button";

const NotFound = () => {
  return (
    <div>
      <h1>Error 404 - Not Found</h1>
      <Button
        variant="contained"
        color="primary"
        label={"GO BACK"}
        onClick={() => (window.location = "/")}
      />
    </div>
  );
};

export default NotFound;
