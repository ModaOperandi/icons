import React from "react";

import { Icon, ICONS } from "moda-icons";

const SIZES = [12, 16, 24, 32, 48, 60];

const Size = ({ size }) => (
  <React.Fragment>
    <h3>{size}</h3>

    <div className="Icons">
      {Object.keys(ICONS)
        .filter(name => name.includes(size))
        .map(name => {
          return (
            <div className="Icon">
              <Icon key={name} name={name} size={size} color="red" />
              <h5>{name}</h5>
            </div>
          );
        })}
    </div>
  </React.Fragment>
);

export default () => (
  <React.Fragment>
    {SIZES.map(size => (
      <Size key={size} size={size} />
    ))}
  </React.Fragment>
);
