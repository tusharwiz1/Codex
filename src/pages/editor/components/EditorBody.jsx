import React from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-swift";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  makeStyles,
  createStyles,
  Backdrop,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme } from "../../../components/MaterialTheming";

import firebase from "../../../components/firebase.js";
import axios from "axios";
import API_BASE_URL from "../../../config/api";

const useStyles = makeStyles((theme) =>
  createStyles({
    body: {
      display: "grid",
      gridGap: "0 20px",
      gridTemplateRows: "calc(100% - 200px) 200px",
      // "& .ace_selection": {
      //   background: "#ff711e36 !important"
      // },
      "& .ace_gutter": {
        backgroundColor: "#19202b",
      },
      "& .ace_editor": {
        backgroundColor: "#19202b",
      },
      "& .ace_support.ace_function": {
        color: "#2196F3",
      },
      [theme.breakpoints.up("sm")]: {
        gridTemplateRows: "unset",
        gridTemplateColumns: "calc(100% - 350px) 330px",
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    editor: {
      height: "100% !important",
      width: "100% !important",
      borderBottom: "2px solid #2196F3",
      "& *": {
        fontFamily: "monospace",
      },
      [theme.breakpoints.up("sm")]: {
        borderBottom: "none",
        borderRight: "2px solid #2196F3",
      },
    },
    output: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
    },
    selectlang: {
      height: "32px",
      margin: "7px 0",
      textAlign: "left !important",
    },
    runPanel: {
      textAlign: "left !important",
    },
    runBtn: {
      marginRight: 10,
    },
    inputModal: {
      height: "fit-content",
      width: "90%",
      maxHeight: 500,
      maxWidth: 400,
      background: "#19202b",
      borderRadius: "5px",
      padding: 15,
      textAlign: "left",
    },
    modalTitle: {
      display: "block",
      color: "#2196F3",
      fontSize: "20px",
      marginBottom: "10px",
    },
    modalDescription: {
      display: "block",
      fontSize: "14px",
      marginBottom: "10px",
    },
    modalInput: {
      width: "100%",
      marginTop: "10px",
    },
    runBtnOnModal: {
      marginTop: "20px",
    },
    buttonProgress: {
      color: "white",
      margin: "auto",
    },
    outputTitle: {
      color: "#2196F3",
      margin: "7px 0",
      textAlign: "left !important",
    },
    outputTerminal: {
      textAlign: "left",
      color: "white",
      overflow: "auto",
      whiteSpace: "pre-line",
      fontFamily: "monospace",
      fontSize: "17px",
    },
  })
);

function EditorBody({ storeAt, index }) {
  const classes = useStyles();
  const [codeFontSize, setCodeFontSize] = React.useState(16),
    [showLoader, setShowLoader] = React.useState(true),
    [lang, selectlang] = React.useState(""),
    [editorLanguage, setEditorLanguage] = React.useState("c_cpp"),
    [code, setCode] = React.useState(``),
    [outputValue, setOutputValue] = React.useState(""),
    [takeInput, setTakeInput] = React.useState(false),
    [executing, setExecuting] = React.useState(false),
    [input, setInput] = React.useState(""),
    [notOwner, setNotOwner] = React.useState(true);

  React.useEffect(() => {
    if (window.innerWidth > 600) setCodeFontSize(20);
    else setCodeFontSize(14);

    const handleResize = () => {
      if (window.innerWidth > 600) {
        setCodeFontSize(20);
      } else {
        setCodeFontSize(14);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check if user is owner
    try {
      const codexCodes = localStorage.getItem("codex-codes");
      if (codexCodes && index !== undefined) {
        const parsedCodes = JSON.parse(codexCodes);
        if (
          parsedCodes[index] &&
          parsedCodes[index].key === storeAt.substring(storeAt.indexOf("/") + 1)
        ) {
          setNotOwner(false);
        }
      }
    } catch (error) {
      console.error("Error checking ownership:", error);
    }

    firebase
      .database()
      .ref(storeAt)
      .once("value")
      .then((snap) => {
        setShowLoader(false);
        selectlang(snap.val().language);
        setCode(snap.val().code);
      })
      .catch((error) => {
        console.error("Error loading code:", error);
        setShowLoader(false);
      });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [storeAt, index]);

  React.useEffect(() => {
    if (lang !== "") {
      let langArray = {
        cpp: "c_cpp",
        java: "java",
        c: "c_cpp",
        cs: "csharp",
        rb: "ruby",
        py: "python",
        kt: "kotlin",
        swift: "swift",
      };
      console.log(langArray[lang]);
      setEditorLanguage(langArray[lang]);
    }
    if (lang !== "" && !notOwner) {
      firebase
        .database()
        .ref(storeAt + "/language")
        .set(lang);
      if (localStorage.getItem("codex-codes")) {
        let classNames = JSON.parse(localStorage.getItem("codex-codes"));
        classNames[index].lang = lang;
        localStorage.setItem("codex-codes", JSON.stringify(classNames));
      }
    }
  }, [lang]);

  React.useEffect(() => {
    if (code.trim() !== "" && !notOwner) {
      firebase
        .database()
        .ref(storeAt + "/code")
        .set(code);
    }
  }, [code]);

  const createExecutionRequest = () => {
    setTakeInput(false);
    setExecuting(true);
    var data = {
      code: code,
      language: lang,
      input: input,
    };

    var config = {
      method: "post",
      url: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setExecuting(false);
        if (response.data?.output) setOutputValue(response.data.output);
        if (response.data?.error) {
          setOutputValue((outputValue) => outputValue + response.data?.error);
        }
      })
      .catch(function (error) {
        setExecuting(false);
        if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          if (status === 503) {
            setOutputValue(
              "Service Unavailable: The CodeX API is temporarily down. Please try again later."
            );
          } else if (status === 429) {
            setOutputValue(
              "Rate Limit Exceeded: Too many requests. Please wait a moment and try again."
            );
          } else if (status >= 500) {
            setOutputValue(
              `Server Error (${status}): The API server encountered an error. Please try again later.`
            );
          } else if (status >= 400) {
            setOutputValue(
              `Client Error (${status}): ${
                error.response.data?.error || "Invalid request"
              }`
            );
          } else {
            setOutputValue(
              `Error (${status}): ${
                error.response.data?.error || "An error occurred"
              }`
            );
          }
        } else if (error.request) {
          // Request was made but no response received
          setOutputValue(
            "Network Error: Could not connect to the CodeX API. Please check your internet connection."
          );
        } else {
          // Something else happened
          setOutputValue(
            `Error: ${error.message || "An unexpected error occurred"}`
          );
        }
      });
  };

  function SelectLanguage() {
    return (
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={lang}
        onChange={(e) => {
          selectlang(e.target.value);
        }}
        variant="outlined"
        className={classes.selectlang}
        disabled={executing || notOwner}
      >
        <MenuItem value={"py"}>Python3</MenuItem>
        <MenuItem value={"c"}>C</MenuItem>
        <MenuItem value={"cpp"}>C++</MenuItem>
        <MenuItem value={"java"}>Java</MenuItem>
        <MenuItem value={"cs"}>C#</MenuItem>
        <MenuItem value={"go"}>Golang</MenuItem>
        <MenuItem value={"js"}>NodeJS</MenuItem>
      </Select>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Backdrop
        className={classes.backdrop}
        open={showLoader}
        onClick={() => {
          setShowLoader(false);
        }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <Backdrop
        className={classes.backdrop}
        open={takeInput}
        onClick={() => {
          setTakeInput(false);
          setExecuting(false);
        }}
      >
        <div
          className={classes.inputModal}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={classes.modalTitle}>Input</div>
          <div className={classes.modalDescription}>
            If your code requires an input, please type it down below otherwise
            leave it empty. For multiple inputs, type in all your inputs line by
            line.
          </div>
          <TextField
            id="outlined-basic"
            label="STD Input"
            variant="filled"
            className={classes.modalInput}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            spellCheck={false}
            rowsMax={7}
            multiline
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.runBtnOnModal}
            startIcon={<PlayArrowRoundedIcon />}
            onClick={createExecutionRequest}
          >
            Run
          </Button>
        </div>
      </Backdrop>
      <div className={classes.body}>
        <AceEditor
          mode={editorLanguage}
          theme="dracula"
          onChange={(e) => {
            setCode(e);
          }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            fontSize: 20,
            showPrintMargin: false,
          }}
          value={code}
          className={classes.editor}
          readOnly={notOwner}
        />
        <div className={classes.output}>
          <div className={classes.outputTitle}>Output</div>
          <div className={classes.outputTerminal}>{`${outputValue}`}</div>
          <div className={classes.runPanel}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.runBtn}
              startIcon={<PlayArrowRoundedIcon />}
              onClick={() => {
                setTakeInput(true);
              }}
              disabled={executing}
            >
              Run
            </Button>
            <SelectLanguage />
            {executing && (
              <LinearProgress size={14} className={classes.buttonProgress} />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default EditorBody;
