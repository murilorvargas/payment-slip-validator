function stringHasOnlyNumericCharacters(string: string): boolean {
  return /^\d+$/.test(string);
}

export { stringHasOnlyNumericCharacters };
