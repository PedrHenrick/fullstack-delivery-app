const NUMBER_8 = 8;
const NUMBER_4 = 4;
const NUMBER_2 = 2;
const NUMBER_0 = 0;
const NUMBER_5 = 5;

const formatDate = (date) => {
  const strData = `
  ${date.substr(NUMBER_8, NUMBER_2)}/${
  date.substr(NUMBER_5, NUMBER_2)}/${
  date.substr(NUMBER_0, NUMBER_4)}`;
  return strData;
};

export default formatDate;
