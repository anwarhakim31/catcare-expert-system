export function formatSplitName(name: string) {
  const splitName = name.split(" ");

  if (splitName.length > 1) {
    return splitName[0].charAt(0) + splitName[1].charAt(0);
  } else {
    return splitName[0].charAt(0);
  }
}
