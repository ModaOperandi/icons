import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { groupBy, filter } from "lodash";
import * as Icons from "moda-icons";

import { Display } from "./components/Display";

const Header = styled.header`
  margin-bottom: 3em;
`;

const Title = styled.h1`
  text-align: center;
`;

const Filter = styled.input`
  font-size: 1rem;
  padding: 0.25em 1em;
  border-radius: 1em;
  border: 1px solid #bebebe;
  display: block;
  margin: 0 auto;

  &:focus {
    outline: none;
    border-color: #969696;
  }
`;

const Set = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`;

const SubHeader = styled.h3`
  border-bottom: 1px solid;
  padding-bottom: 1em;
  font-size: 1rem;
  padding-left: 3em;
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
      <Header>
        <Title>moda-icons</Title>
        <Filter placeholder="Find an icon" onChange={handleChange} />
      </Header>

      {Object.entries(groupedIcons).map(([size, iconSet]) => (
        <Size key={size} size={size} iconSet={iconSet} />
      ))}
    </>
  );
};
