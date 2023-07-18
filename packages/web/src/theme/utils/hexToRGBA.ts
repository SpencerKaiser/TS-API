export const hexToRGBA = (hex: string | `${string}`, alpha?: number): string => {
  let resultHex = hex;
  if (hex.startsWith('#')) {
    resultHex = hex.slice(1);
  }

  if (resultHex.length !== 3 && resultHex.length !== 6) {
    throw new Error('Invalid HEX color code');
  }

  if (hex.length === 3) {
    resultHex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const red = parseInt(resultHex.slice(0, 2), 16);
  const green = parseInt(resultHex.slice(2, 4), 16);
  const blue = parseInt(resultHex.slice(4, 6), 16);

  let resultAlpha = alpha;
  if (alpha !== undefined) {
    if (alpha < 0 || alpha > 1) {
      throw new Error('Alpha value must be between 0 and 1');
    }
  } else {
    resultAlpha = 1;
  }

  return `rgba(${red}, ${green}, ${blue}, ${resultAlpha});`;
};
