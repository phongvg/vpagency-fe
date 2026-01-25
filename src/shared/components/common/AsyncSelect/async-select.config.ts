import type { SelectOption } from "@/shared/types/common/select-option.type";
import type { StylesConfig } from "react-select";

export const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    fontSize: 10,
    minHeight: 36,
    borderWidth: 1,
    borderRadius: 0,
    backgroundColor: "transparent",
    borderColor: state.isFocused ? "#4d4d4d" : "#4d4d4d",
    boxShadow: state.isFocused ? "none" : "none",
    "&:hover": {
      borderColor: "#4d4d4d",
    },
  }),

  menu: (base) => ({
    ...base,
    fontSize: 10,
    borderRadius: 0,
    marginTop: 8,
    backgroundColor: "black",
    backdropFilter: "blur(6px)",
    zIndex: 50,
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    color: state.isSelected ? "white" : "rgb(255 255 255 / 0.5)",
    cursor: "pointer",
  }),

  placeholder: (base) => ({
    ...base,
    color: "rgb(255 255 255 / 0.5)",
    fontSize: 9,
  }),

  singleValue: (base) => ({
    ...base,
    fontSize: 10,
    color: "rgb(255 255 255 / 0.5)",
  }),

  input: (base) => ({
    ...base,
    fontSize: 10,
    color: "white",
  }),
};
