export function getRandomText(
  texts: Record<string, { text: string }[]>,
  difficulty: string
) {
  const list = texts[difficulty];
  if (!list || list.length === 0) return "";
  const index = Math.floor(Math.random() * list.length);
  return list[index].text;
}
