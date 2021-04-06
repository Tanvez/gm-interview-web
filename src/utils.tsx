import { Entry } from "./Types";
const combineProjects = (entries: any) => {
  const reduced = entries.reduce(reducer, {});
  let resultArr = [];
  for (const [, value] of Object.entries(reduced)) {
    resultArr.push(value);
  }

  return resultArr;
};

const reducer = (accumulator: any, currentValue: Entry) => {
  const {
    project,
    client,
    billable,
    hours,
    billableRate,
    projectCode,
  } = currentValue;
  let billableHours = 0;
  let billableAmount = 0;
  if (billable) {
    billableHours = Number(hours);
    billableAmount = billableHours * billableRate;
  }
  if (!accumulator[projectCode]) {
    accumulator[projectCode] = {
      project,
      client,
      billableHours,
      billableAmount,
      hours: Number(hours),
    };
  } else if (accumulator[projectCode]) {
    accumulator[projectCode].billableHours += billableHours;
    accumulator[projectCode].billableAmount += billableAmount;
    accumulator[projectCode].hours += Number(hours);
  }

  return accumulator;
};

export { combineProjects };
