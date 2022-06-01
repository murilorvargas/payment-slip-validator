function stringHasOnlyNumericCharacters(string: string) {
  return /^\d+$/.test(string);
}

export { stringHasOnlyNumericCharacters };
