export function calculateWPM(
  totalCharsTyped: number,
  elapsedTimeSeconds: number
) {
  if (elapsedTimeSeconds === 0) return 0;

  const minutes = elapsedTimeSeconds / 60;
  const words = totalCharsTyped / 5;

  return Math.round(words / minutes);
}
