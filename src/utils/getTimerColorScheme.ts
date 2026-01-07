export function getTimerColorScheme(time: number, duration: number) {
  let timeColorScheme = "";
  if (time > duration * 0.5) {
    timeColorScheme = "text-green-500";
  } else if (time > duration * 0.25) {
    timeColorScheme = "text-yellow-400";
  } else {
    timeColorScheme = "text-red-500";
  }
  return timeColorScheme;
}
