import { useContext } from "react";
import PassContext from "../PassContext";

export default function useUserContext() {
  return useContext(PassContext);
}
