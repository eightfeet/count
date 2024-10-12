import { proxy, subscribe } from "valtio";

export interface Filter {
  methodRange: (1 | 2 | 3 | 4)[];
  times: number;
  range: number[];
  num: number;
  displayExerciseKey: boolean
  collections: number;
}

export interface Subject {
  equation: string;
  equationStr: string;
  equationText: string;
  result: number;
}

interface RunningTime {
  isStart?: boolean;
  filter?: Filter;
  history?: {
    startAt: string,
    subject: Subject[]
  }[];
}

const localRunningTime = JSON.parse(localStorage.getItem("count_runningTime") || "{}");
export const runningTime = proxy<RunningTime>(localRunningTime);
subscribe(runningTime, () => localStorage.setItem("count_runningTime", JSON.stringify(runningTime)))

