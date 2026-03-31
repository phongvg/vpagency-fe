import type { SelectOption } from "@/shared/types/common/select-option.type";
import type { StylesConfig } from "react-select";

export const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    height: state.isMulti ? "auto" : 36,
    minHeight: 36,
    borderWidth: 3,
    borderRadius: 0,
    backgroundColor: "white",
    borderColor: "black",
    boxShadow: state.isFocused
      ? "inset 3px 3px 0px 0px rgba(255,255,255,0.7), inset -3px -3px 0px 0px rgba(0,0,0,0.5), 2px 2px 0px 0px rgba(0,0,0,0.8)"
      : "inset 3px 3px 0px 0px rgba(255,255,255,0.7), inset -3px -3px 0px 0px rgba(0,0,0,0.5), 4px 4px 0px 0px rgba(0,0,0,0.8)",
    filter: state.isFocused
      ? "drop-shadow(0 0px 0 rgba(0,0,0,0.8))"
      : "drop-shadow(0 4px 0 rgba(0,0,0,0.8))",
    transform: state.isFocused ? "translateY(2px)" : "none",
    transition: "all 0.15s ease",
    cursor: "pointer",
    "&:hover": {
      borderColor: "black",
    },
  }),

  menu: (base) => ({
    ...base,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 0,
    marginTop: 6,
    backgroundColor: "white",
    border: "3px solid black",
    boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.8)",
    zIndex: 50,
    overflow: "hidden",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#e52521"
      : state.isFocused
        ? "#fce0a6"
        : "white",
    color: state.isSelected ? "white" : "black",
    cursor: "pointer",
    textTransform: "none",
    fontWeight: 500,
    borderBottom: "2px solid rgba(0,0,0,0.08)",
    transition: "all 0.1s ease",
    "&:active": {
      backgroundColor: "#e52521",
      color: "white",
    },
  }),

  placeholder: (base) => ({
    ...base,
    textTransform: "none",
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: 400,
    paddingBottom: 4,
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: "#fce0a6",
    border: "2px solid black",
    borderRadius: 0,
    fontSize: 10,
    fontWeight: 700,
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: "black",
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: "black",
    cursor: "pointer",
    borderRadius: 0,
    ":hover": {
      backgroundColor: "#e52521",
      color: "white",
    },
  }),

  singleValue: (base) => ({
    ...base,
    fontSize: 14,
    color: "black",
    fontWeight: 500,
    textTransform: "none",
  }),

  input: (base) => ({
    ...base,
    fontSize: 14,
    color: "black",
    fontWeight: 500,
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: "black",
    padding: "0 8px",
    transition: "transform 0.2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
    "&:hover": {
      color: "#e52521",
    },
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: 300,
    padding: 0,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#fce0a6",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#e52521",
      border: "1px solid black",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#c41e1a",
    },
  }),
};

