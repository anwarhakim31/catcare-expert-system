export function formatSplitName(name: string) {
  const splitName = name?.split(" ");

  if (splitName && splitName?.length > 1) {
    return splitName[0].charAt(0) + splitName[1].charAt(0);
  } else {
    return name?.charAt(0);
  }
}

export function formatImageName(value: string) {
  return value.split("/")[9];
}

export function formatDateIndo(value: Date) {
  return new Date(value).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
