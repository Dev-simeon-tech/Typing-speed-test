export type CharStatus = "pending" | "correct" | "incorrect";

export function getCharStatus(expected: string, typed?: string): CharStatus {
  if (typed === undefined) return "pending";
  if (typed === expected) return "correct";
  return "incorrect";
}
