import React from "react";
import AsyncSelect from "react-select/async";

const MultiSelectTagDropdown = ({
  defaultValue = [],
  loadOptions,
  onChangeFunction,
  className,
}) => {
  return (
    <AsyncSelect
      defaultValue={defaultValue}  // Set defaultValue to manage selected options
      defaultOptions
      isMulti  // Allow multiple selections
      loadOptions={loadOptions}  // Load options from the provided function
      onChange={onChangeFunction}  // Use the onChange function to handle selected values
      className={className}  // Apply the custom class
    />
  );
};

export default MultiSelectTagDropdown;
