import React from "react";
import "./index.css";

import Routes from "./components/Routes";

import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    dynamicPage: {
      height: "100%",
      width: "100%",
    },
  })
);

export default function App() {
  console.log("App component rendering...");
  const classes = useStyles();

  try {
    return (
      <div className="App">
        <div className={classes.dynamicPage}>
          <Routes />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in App component:", error);
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>Error in App</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
