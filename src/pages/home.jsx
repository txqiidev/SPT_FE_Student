import React from "react";

const Home = () => {
  return <div style={styles.root}></div>;
};

export default Home;

const styles = {
  root: {
    minHeight: "100vh",
    width: "80%",
    margin: "auto",
    maxWidth: 1000,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
};
