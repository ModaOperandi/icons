import * as React from "react";

import styles from "./styles.css";

import * as ICONS from "./icons";

export type Props = { name: string; size: number; color: string };

export const Icon: React.FC<Props> = ({ name, size, color }) => {
  const Svg = ICONS[name];

  return (
    <Svg
      className={styles.Svg}
      key={name}
      style={{ width: `${size}px`, height: `${size}px`, fill: color }}
    />
  );
};

export { ICONS };
