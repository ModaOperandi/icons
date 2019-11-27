import React, { useState, useCallback } from "react";
import styled from "styled-components";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";

const MONEY_GOOD_COLOR = "#046c00";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 4em 0;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  cursor: pointer;
  user-select: none;

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
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${MONEY_GOOD_COLOR};
  padding: 0.25em 0.5em;
  border-radius: 0.25em;
  color: white;
`;

const Icon = styled.div`
  padding: 0 6em;
`;

const Name = styled.h5`
  margin: 1em 0 0 0;
`;

const MODE = {
  RESTING: "RESTING",
  COPIED: "COPIED"
};

export const Display = ({ children, componentName, fileName }) => {
  const importedName = `${componentName.split(/\d/)[0]}Icon`; // Removes sizing, adds "Icon"
  const importStatement = `import ${importedName} from '@moda/icons/${fileName}';`;
  const [state, copyToClipboard] = useCopyToClipboard();
  const [mode, setMode] = useState(MODE.RESTING);

  const handleClick = useCallback(() => {
    copyToClipboard(importStatement);
    setMode(MODE.COPIED);
    setTimeout(() => setMode(MODE.RESTING), 1000);
  }, [copyToClipboard, importStatement, setMode]);

  return (
    <Container onClick={handleClick} mode={mode}>
      <Icon>{children}</Icon>

      <Name>{fileName}</Name>

      {mode === MODE.COPIED && (
        <Status>{state.error ? "Error" : state.value && "Copied!"}</Status>
      )}
    </Container>
  );
};
