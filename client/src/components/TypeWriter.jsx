import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex <text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 100); // Adjust speed here (milliseconds)

    return () => clearInterval(interval);
  }, [currentIndex, text]);

  return <div>{displayText}</div>;
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Typewriter;
