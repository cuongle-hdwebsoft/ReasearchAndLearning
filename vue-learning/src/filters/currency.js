export default function (value) {
  let usd = value * 22895.2;
  let can = value * 18232.46;
  let china = value * 3550.45;

  if (!value) {
    return;
  }

  return `
    USD: ${usd} (VND)
    Canada: ${can} (VND)
    Chinese Yuan: ${china} (VND)
  `;
}
