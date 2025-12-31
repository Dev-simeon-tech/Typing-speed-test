export function calculateAccuracy(
  totalKeystrokes: number,
  errorKeystrokes: number
) {
  if (totalKeystrokes === 0) return 100;

  const correct = totalKeystrokes - errorKeystrokes;
  return Math.round((correct / totalKeystrokes) * 100);
}
