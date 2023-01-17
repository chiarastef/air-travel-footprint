import React from "react";
import { AppContext } from "../../context";

export const useSetDropdown = (isFrom) => {
  const { fromInput, toInput, showDropdown, setShowDropdown } =
    React.useContext(AppContext);

  const [dropdownPosition, setDropdownPosition] = React.useState({
    top: "",
    left: "",
    right: "",
  });

  // Set dropdowns' positions based on inputs position
  React.useEffect(() => {
    const element = isFrom ? fromInput : toInput;

    const setPosition = () => {
      setDropdownPosition({
        top: element.current.getBoundingClientRect().bottom,
        left: element.current.getBoundingClientRect().left,
        right: element.current.getBoundingClientRect().right,
      });
    };

    setPosition();
    window.addEventListener("resize", setPosition);

    return () => window.removeEventListener("resize", setPosition);
  }, [isFrom]);

  // Dropdown style
  const styleDropdown = {
    top: `${dropdownPosition.top}px`,
    left: `${dropdownPosition.left}px`,
    right: `${window.innerWidth - dropdownPosition.right}px`,
  };

  // Hide dropdown when user clicks elsewhere
  React.useEffect(() => {
    const hideDropdown = (e) => {
      if (e.target.id == !"from" || e.target.id == !"to") {
        setShowDropdown({ from: false, to: false });
      }
    };

    // Add event listener only if dropdown is showing
    if (showDropdown.from || showDropdown.to) {
      document.addEventListener("click", hideDropdown);
    }

    return () => document.removeEventListener("click", hideDropdown);
  }, [showDropdown]);

  return { styleDropdown };
};
