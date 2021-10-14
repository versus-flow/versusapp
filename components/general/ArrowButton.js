import React from "react";
import Link from "next/link";

import Arrow from "../../assets/arrow.svg";

const ArrowButton = ({
  href = "#",
  text,
  className,
  onClick = () => {},
  link = true,
}) => {
  return link ? (
    <Link href={href}>
      <a
        className={`standard-button arrow-button ${className}`}
        onClick={onClick}
      >
        {text}
        <Arrow className="block duration-300 group-hover:ml-2 group-hover:w-6 ml-0 overflow-hidden transform transition-all w-0" />
      </a>
    </Link>
  ) : (
    <span
      className={`standard-button arrow-button ${className}`}
      onClick={onClick}
    >
      {text}
      <Arrow className="block duration-300 group-hover:ml-2 group-hover:w-6 ml-0 overflow-hidden transform transition-all w-0" />
    </span>
  );
};

export default ArrowButton;
