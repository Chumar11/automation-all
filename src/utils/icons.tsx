import React from "react";
import { ReactSVG } from "react-svg";

export default function Icon({ ...prop }) {
  const { path, className, ...props } = prop;
  const prefix = "/icons/";
  return (
    <ReactSVG
      {...props}
      className={`react-svg ${className ? className : ""}`}
      src={`${prefix}${path}.svg`}
    />
  );
}
