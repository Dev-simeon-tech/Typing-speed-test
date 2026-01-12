export function getModeValue(mode: string) {
  let duration;
  switch (mode) {
    case "timed (60s)":
      duration = "60s";
      break;
    case "timed (120s)":
      duration = "120s";
      break;
    case "timed (30s)":
      duration = "30s";
      break;
    case "timed (15s)":
      duration = "15s";
      break;
    default:
      duration = "passage";
  }
  return duration;
}
