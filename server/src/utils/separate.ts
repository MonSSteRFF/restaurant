const sep = ':%%:';

export function separateFrom<Type>(databaseString: string): Type[] {
  return databaseString.split(sep) as Type[];
}

export function separateTo(array: Array<unknown>): string {
  return array.join(sep);
}
