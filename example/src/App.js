import React from "react";
import styled from "styled-components";
import { groupBy } from "lodash";
import * as Icons from "moda-icons";

import { Display } from "./components/Display";

const icons = groupBy(Icons.ICONS, "size");

const Set = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SubHeader = styled.h3`
  border-bottom: 1px solid;
  padding-bottom: 1em;
  font-size: 1rem;
`;

const Title = styled.h1`
  margin-bottom: 3em;
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
            <Icon color="red" />
          </Display>
        );
      })}
    </Set>
  </>
);

export default () => (
  <>
    <Title>moda-icons</Title>

    {Object.entries(icons).map(([size, iconSet]) => (
      <Size key={size} size={size} iconSet={iconSet} />
    ))}
  </>
);
