export function getFormat(value: number) {
  let string = "";

  if (value >= 10) {
    string = value.toString();
  } else {
    string = `0${value}`;
  }

  return string;
}
