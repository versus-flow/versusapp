import React from "react";
import Link from "next/link";

import Arrow from "../../assets/arrow.svg";

const ArrowButton = ({ href = "#", text, className, onClick = () => {} }) => {
  return (
    <Link href={href}>
      <a
        className={`standard-button arrow-button ${className}`}
        onClick={onClick}
      >
        {text}
        <Arrow className="block duration-300 group-hover:ml-2 group-hover:w-6 ml-0 overflow-hidden transform transition-all w-0" />
      </a>
    </Link>
  );
};

export default ArrowButton;
