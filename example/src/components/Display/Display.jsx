import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";
import { text, color, spacing } from "@moda/tokens";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${spacing(8, 0)};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  ${text("body2")}
  border-radius: 0.25rem;

  &:hover {
    color: ${color("money-good")};
    background-color: ${color("cream")};
  }

  ${({ mode }) =>
    mode === MODE.COPIED &&
    css`
      color: ${color("money-good")};
    `}
`;

const Status = styled.div`
  position: absolute;
  bottom: ${spacing(5)};
  left: 50%;
  transform: translateX(-50%);
  background-color: ${color("money-good")};
  padding: ${spacing(1, 2)};
  border-radius: 0.25rem;
  color: ${color("snow")};
`;

const Icon = styled.div``;

const Name = styled.h5`
  margin: ${spacing(4, 4, 0, 4)};
  text-align: center;
`;

const MODE = {
  RESTING: "RESTING",
  COPIED: "COPIED",
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
