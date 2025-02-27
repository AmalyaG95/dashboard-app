import { useContext } from "react";
import DataContext from "../contexts/DataContext";

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useDataContext is used outside of its Provider");
  }

  return context;
};
