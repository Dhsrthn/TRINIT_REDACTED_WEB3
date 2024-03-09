import { useState } from "react";
import PropTypes from "prop-types";

function MultipleSelectDropdown({ options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionToggle = (option) => {
    const index = selectedOptions.indexOf(option);

    if (index === -1) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      const updatedOptions = [...selectedOptions];
      updatedOptions.splice(index, 1);
      setSelectedOptions(updatedOptions);
    }
  };

  const handleApply = () => {
    onChange(selectedOptions);
    toggleDropdown();
  };

  return (
    <div className="relative h-full">
      <button
        className={`dropdown-toggle hover:bg-[#ffc05b] h-20 w-96 ${
          isOpen && "bg-[#ffc05b]"
        }`}
        onClick={toggleDropdown}
      >
        Select Talents
      </button>
      {isOpen && (
        <div className="dropdown-content absolute top-100 left-0 mt-10 w-[100%] z-50 max-h-full overflow-y-scroll">
          {options.map((option) => (
            <div
              key={option}
              className={`w-full flex items-center p-2 ${
                selectedOptions.includes(option) && "bg-[#ffc05b]"
              }`}
            >
              <input
                type="checkbox"
                id={option}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionToggle(option)}
              />
              <label htmlFor={option} className="ml-10">
                {option}
              </label>
            </div>
          ))}
          <button
            onClick={handleApply}
            className="text-center w-full hover:bg-[#ffc05b] mt-5"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

MultipleSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
};

export default MultipleSelectDropdown;
