import Data from "../../assets/data/data.json";

export const dataArr: Record<string, string | number | undefined | boolean>[] = [];
Data.forEach(elem => {
  dataArr.push(elem);
})
