import { evalExpr } from "jse-eval";
import { Filter, Subject } from "./store";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const methodStr = {
  "1": {
    operator: "+",
    str: "+",
    name: "加上",
  },
  "2": {
    operator: "-",
    str: "-",
    name: "减去",
  },
  "3": {
    operator: "*",
    str: "×",
    name: "乘以",
  },
  "4": {
    operator: "/",
    str: "÷",
    name: "除以",
  },
  "5": {
    operator: "=",
    str: "=",
    name: "等于",
  },
};

export const createSubject = (
  times: number,
  range: number[],
  methodRange: number[]
) => {
  let equation = "";
  let equationStr = "";
  let equationText = "";

  for (let index = 1; index <= times; index++) {
    const num = getRandomInt(range[0] || 1, range[1] || 10);
    equation += num;
    equationStr += num;
    equationText += num;
    if (index === times) {
      continue;
    }
    const method =
      methodStr[
        `${
          methodRange[getRandomInt(0, methodRange.length - 1)]
        }` as keyof typeof methodStr
      ];
    equation += method.operator;
    equationStr += ` ${method.str} `;
    equationText += method.name;
  }

  equationStr += " = ";
  equationText += "等于";

  return {
    equation,
    equationStr,
    equationText,
    result: evalExpr(equation),
  };
};

export const createTest = ({ num, times, range, methodRange }: Filter) => {
  const tests: Subject[] = []
  for (let index = 1; index <= num; index++) {
    let subjectItem = undefined;
    do {
      subjectItem = createSubject(times, range, methodRange);
    } while (subjectItem.result < 0 || `${subjectItem.result}`.indexOf(".") >= 0);
    if (subjectItem) {
      tests.push(subjectItem)
    }
  }
  return tests
};

