import React, { useState, useCallback } from "react";
import styled from "styled-components";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";

const MONEY_GOOD_COLOR = "#046c00";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 12em;
  height: 12em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    color: ${MONEY_GOOD_COLOR};
  }

  ${props =>
    props.mode === MODE.COPIED &&
    `
    color: ${MONEY_GOOD_COLOR};
  `}
`;

const Status = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${MONEY_GOOD_COLOR};
  padding: 0.25em 0.5em;
  border-radius: 0.25em;
  color: white;
`;

const MODE = {
  RESTING: "RESTING",
  COPIED: "COPIED"
};

export const Display = ({ children, componentName, fileName }) => {
  const importStatement = `import ${componentName.replace(
    /[0-9]/g,
    ""
  )}Icon from 'moda-icons/${fileName}';`;
  const [state, copyToClipboard] = useCopyToClipboard();
  const [mode, setMode] = useState(MODE.RESTING);

  const handleClick = useCallback(() => {
    copyToClipboard(importStatement);
    setMode(MODE.COPIED);
    setTimeout(() => setMode(MODE.RESTING), 1000);
  }, [copyToClipboard, importStatement, setMode]);

  return (
    <Container onClick={handleClick} mode={mode}>
      {children}

      <h5>{fileName}</h5>

      {mode === MODE.COPIED && (
        <Status>{state.error ? "Error" : state.value && "Copied!"}</Status>
      )}
    </Container>
  );
};
