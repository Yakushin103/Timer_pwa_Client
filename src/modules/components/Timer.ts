import { DataProps } from "../pages/Main";

export interface TimerProps {
  isStart: boolean;
  data: DataProps;
  setData: (value: DataProps) => void;
}
