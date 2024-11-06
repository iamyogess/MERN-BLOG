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
      defaultValue={defaultValue}
      defaultOptions
      isMulti
      loadOptions={loadOptions}
      className={`${className}`}
    />
  );
};

export default MultiSelectTagDropdown;
