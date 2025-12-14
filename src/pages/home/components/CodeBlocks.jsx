import React from "react";

import { makeStyles, createStyles } from "@material-ui/core";

import CodeBlock from "./CodeBlock";

const useStyles = makeStyles((theme) =>
  createStyles({
    codeBlocks: {
      textAlign: "left",
    },
  })
);

function CodeBlocks({ classCodes }) {
  const classes = useStyles();

  console.log(classCodes);

  if (!classCodes || !Array.isArray(classCodes)) {
    return <div className={classes.codeBlocks}></div>;
  }

  return (
    <div className={classes.codeBlocks}>
      {classCodes.map((codeBlockData, blockIndex) => (
        <CodeBlock
          key={codeBlockData.key}
          blockTitle={codeBlockData.name}
          blockLang={codeBlockData.lang}
          blockLink={"/" + blockIndex + "/" + codeBlockData.key}
        />
      ))}
    </div>
  );
}

export default CodeBlocks;
