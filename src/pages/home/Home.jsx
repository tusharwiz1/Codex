import React from "react";
import { useHistory } from "react-router-dom";

import brandingLogo from "../../components/codexlogo.png";
import "./home.css";

import {
  Button,
  Backdrop,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme } from "../../components/MaterialTheming";

import firebase from "../../components/firebase.js";

import CodeBlocks from "./components/CodeBlocks";

const useStyles = makeStyles((theme) =>
  createStyles({
    homePage: {
      height: "100%",
      width: "100%",
    },
    header: {
      width: "100%",
      display: "grid",
      gridGap: "20px 0",
      gridTemplateColumns: "auto 1fr",
      textAlign: "center",
      "& > *": {
        margin: "auto 0",
      },
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "unset",
        gridTemplateRows: "repeat(2, auto)",
      },
    },
    brandingLogo: {
      cursor: "pointer",
    },
    button: {
      margin: "auto",
      "& span": {
        textTransform: "none",
        color: "#fff",
      },
      [theme.breakpoints.down("sm")]: {
        margin: 0,
      },
    },
    codeblocks: {
      width: "100%",
      marginTop: "10px",
      height: "calc(100% - 65px)",
      [theme.breakpoints.down("sm")]: {
        height: "calc(100% - 115px)",
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    createClassModal: {
      height: "fit-content",
      width: "90%",
      maxHeight: 300,
      maxWidth: 400,
      background: "#19202b",
      borderRadius: "5px",
      padding: 15,
      textAlign: "left",
      "& span": {
        display: "block",
      },
    },
    modalTitle: {
      fontSize: "20px",
    },
    modalDesc: {
      color: "#2196F3",
      fontSize: "13px",
    },
    modalInput: {
      width: "100%",
      marginTop: "10px",
    },
    modalSelect: {
      width: "100%",
      marginTop: "20px",
    },
    modalButton: {
      margin: "20px 10px 4px 0",
    },
  })
);

function Home() {
  const classes = useStyles();
  const history = useHistory();

  const [theme, setTheme] = React.useState(darkTheme),
    [modalOpen, setModalOpen] = React.useState(false),
    [classCodes, setClassCodes] = React.useState([]);

  React.useEffect(() => {
    try {
      const storedCodes = localStorage.getItem("codex-codes");
      if (storedCodes) {
        setClassCodes(JSON.parse(storedCodes));
      }
    } catch (error) {
      console.error("Error loading codes from localStorage:", error);
    }
  }, []);
  React.useEffect(() => {
    try {
      localStorage.setItem("codex-codes", JSON.stringify(classCodes));
    } catch (error) {
      console.error("Error saving codes to localStorage:", error);
    }
  }, [classCodes]);

  function CreateClass() {
    const [inputClassName, setInputClassName] = React.useState("");
    const [lang, selectlang] = React.useState("cpp");

    function createNewClass() {
      console.log("Creating new class...");
      firebase
        .database()
        .ref("CodeX")
        .push({
          className: inputClassName,
          language: lang,
          code: ``,
        })
        .then((snap) => {
          console.log(classCodes);
          setClassCodes([
            ...classCodes,
            { name: inputClassName, key: snap.key, lang: lang },
          ]);
          history.push("/" + classCodes.length + "/" + snap.key);
        });
      setModalOpen(false);
    }

    function SelectCode() {
      return (
        <FormControl variant="filled" className={classes.modalSelect}>
          <InputLabel id="demo-simple-select-filled-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={lang}
            onChange={(e) => {
              selectlang(e.target.value);
            }}
          >
            <MenuItem value={"py"}>Python3</MenuItem>
            <MenuItem value={"c"}>C</MenuItem>
            <MenuItem value={"cpp"}>C++</MenuItem>
            <MenuItem value={"java"}>Java</MenuItem>
            <MenuItem value={"cs"}>C#</MenuItem>
            <MenuItem value={"go"}>Golang</MenuItem>
            <MenuItem value={"js"}>NodeJS</MenuItem>
          </Select>
        </FormControl>
      );
    }

    return (
      <Backdrop
        className={classes.backdrop}
        open={modalOpen}
        onClick={() => {
          setModalOpen(false);
        }}
      >
        <div
          className={classes.createClassModal}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className={classes.modalTitle}>Create New Class</span>
          <span className={classes.modalDesc}>
            Please enter a proper class name and choose language
          </span>
          <TextField
            id="outlined-basic"
            label="Class Name"
            variant="filled"
            className={classes.modalInput}
            value={inputClassName}
            onChange={(e) => {
              setInputClassName(e.target.value);
            }}
          />
          <SelectCode />
          <Button
            variant="contained"
            color="primary"
            className={classes.modalButton}
            onClick={createNewClass}
          >
            Create New Class
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.modalButton}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Backdrop>
    );
  }

  return (
    <div className={classes.homePage}>
      <ThemeProvider theme={theme}>
        <div className={classes.header}>
          <img
            src={brandingLogo}
            alt="branding-logo"
            className={classes.brandingLogo}
            onClick={() => {
              history.push("/");
            }}
          />
          <Button
            className={classes.button}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            New Class
          </Button>
        </div>
        <div className={classes.codeblocks}>
          <CodeBlocks classCodes={classCodes} />
        </div>
        <CreateClass />
      </ThemeProvider>
    </div>
  );
}

export default Home;
