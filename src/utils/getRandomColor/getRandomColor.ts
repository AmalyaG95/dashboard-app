export const ROW_COLORS = ["#E14165", "#C2C2FF", "#8686FF"];

const getRandomRowColor = () => {
  return ROW_COLORS[Math.floor(Math.random() * ROW_COLORS.length)];
};

export default getRandomRowColor;
