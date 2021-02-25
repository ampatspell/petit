export const Pixel = {
  transparent: 0,
  white: 1,
  black: 2
};

export const toIndex = (x, y, size) => (y * size.width) + x;

export const fromIndex = (index, size) => {
  let y = Math.floor(index / size.width);
  let x = index - (y * size.width);
  return { x, y };
}
