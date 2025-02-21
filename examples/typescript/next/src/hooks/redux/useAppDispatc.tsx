import { AppDispatch } from "@/config/redux/store";
import { useDispatch } from "react-redux";

export default function UseAppDispatch() {
  return useDispatch<AppDispatch>();
}
