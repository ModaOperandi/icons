import React, { useState, useCallback, useEffect } from "react";
import { Reset } from "styled-reset";
import styled from "styled-components";
import { groupBy } from "lodash";
import * as Icons from "@moda/icons";
import { spacing, color, text, breakpoints } from "@moda/tokens";
import { Display } from "./components/Display";
import { GlobalStyles } from "./components/GlobalStyles";

const Header = styled.header`
  margin-bottom: ${spacing(7)};
`;

const H1 = styled.h1`
  ${text("h4")}
  margin: ${spacing(6, 0)};
  text-align: center;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Filter = styled.input`
  padding: ${spacing(1, 4)};
  border-radius: 1rem;
  border: 1px solid ${color("elephant")};

  &:focus {
    outline: none;
    border-color: ${color("elephant")};
  }
`;

const Set = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SubHeader = styled.h3`
  ${text("body1", "code")}
  color: ${color("cement")};
  padding: ${spacing(4, 0)};
  margin-bottom: ${spacing(2)};
  border-bottom: 1px solid ${color("elephant")};
`;

const Size = ({ size, iconSet }) => (
  <>
    <SubHeader>size={size}</SubHeader>

    <Set>
      {iconSet.map(({ componentName, fileName }) => {
        const Icon = Icons[componentName];
        return (
          <Display
            key={componentName}
            componentName={componentName}
            fileName={fileName}
          >
            <Icon />
          </Display>
        );
      })}
    </Set>
  </>
);

export default () => {
  const [availableIcons, setAvailableIcons] = useState(Icons.ICONS);
  const [groupedIcons, setGroupedIcons] = useState(
    groupBy(availableIcons, "size")
  );

  const handleChange = useCallback(({ currentTarget: { value } }) => {
    if (value === "") {
      // Reset
      setAvailableIcons(Icons.ICONS);
      return;
    }

    setAvailableIcons(() =>
      Icons.ICONS.filter(({ fileName }) => fileName.includes(value))
    );
  }, []);

  useEffect(() => {
    setGroupedIcons(groupBy(availableIcons, "size"));
  }, [availableIcons]);

  return (
    <>
      <Reset />

      <GlobalStyles />

      <Header>
        <H1>@moda/icons</H1>

        <Center>
          <Filter placeholder="Find an icon" onChange={handleChange} />
        </Center>
      </Header>

      {Object.entries(groupedIcons).map(([size, iconSet]) => (
        <Size key={size} size={size} iconSet={iconSet} />
      ))}
    </>
  );
};
