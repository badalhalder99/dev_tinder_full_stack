import { useContext } from "react";
import { UserContext } from "./UserContext"
// Custom hook for Easy Access::
export const useUser = () => useContext(UserContext);