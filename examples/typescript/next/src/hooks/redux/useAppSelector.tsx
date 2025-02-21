import { RootState } from "@/config/redux/store";
import { useSelector } from "react-redux";

export default function useAppSelector() {
  return useSelector((state: RootState) => state);
}
