import React from "react";

import { Icon, ICONS } from "moda-icons";

const SIZES = [12, 16, 24, 32, 48, 60, Infinity];

const Size = ({ size }) => (
  <React.Fragment>
    <h3>size={size}</h3>

    <div className="Icons">
      {Object.keys(ICONS)
        .filter(name => {
          return size === Infinity ? !/\d/.test(name) : name.includes(size);
        })
        .map(name => {
          return (
            <div className="Icon">
              <Icon key={name} name={name} size={size} color="#ee0700" />
              <h5>{name}</h5>
            </div>
          );
        })}
    </div>
  </React.Fragment>
);

export default () => (
  <React.Fragment>
    <h1>moda-icons</h1>

    {SIZES.map(size => (
      <Size key={size} size={size} />
    ))}
  </React.Fragment>
);
