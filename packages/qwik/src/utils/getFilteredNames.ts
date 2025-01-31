import type {
  FieldArrayPath,
  FieldPath,
  FieldValues,
  FormStore,
} from '../types';
import { getFieldArrayNames } from './getFieldArrayNames';
import { getFieldNames } from './getFieldNames';

/**
 * Returns a tuple with filtered field and field array names. For each
 * specified field array name, the names of the contained fields and field
 * arrays are also returned. If no name is specified, the name of each field
 * and field array of the form is returned.
 *
 * @param form The form of the fields.
 * @param arg2 The name of the fields.
 *
 * @returns A tuple with filtered names.
 */
export function getFilteredNames<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
  TOptions extends Record<string, any>
>(
  form: FormStore<TFieldValues, TFieldName, TFieldArrayName>,
  arg2?:
    | TFieldName
    | TFieldArrayName
    | (TFieldName | TFieldArrayName)[]
    | TOptions
): [TFieldName[], TFieldArrayName[]] {
  // Get all field and field array names of form
  const allFieldNames = getFieldNames(form);
  const allFieldArrayNames = getFieldArrayNames(form);

  // If names are specified, filter and return them
  if (typeof arg2 === 'string' || Array.isArray(arg2)) {
    return (typeof arg2 === 'string' ? [arg2] : arg2)
      .reduce(
        (tuple, name) => {
          // Destructure tuple
          const [fieldNames, fieldArrayNames] = tuple;

          // If it is name of a field array, add it and name of each field
          // and field array it contains to field and field array names
          if (
            allFieldArrayNames.some((fieldArrayName) => fieldArrayName === name)
          ) {
            allFieldArrayNames.forEach((fieldArrayName) => {
              if (fieldArrayName.startsWith(name)) {
                fieldArrayNames.add(fieldArrayName);
              }
            });
            allFieldNames.forEach((fieldName) => {
              if (fieldName.startsWith(name)) {
                fieldNames.add(fieldName);
              }
            });

            // If it is name of a field, add it to field name set
          } else {
            fieldNames.add(name as TFieldName);
          }

          // Return tuple
          return tuple;
        },
        [new Set(), new Set()] as [Set<TFieldName>, Set<TFieldArrayName>]
      )
      .map((set) => [...set]) as [TFieldName[], TFieldArrayName[]];
  }

  // Otherwise return every field and field array name
  return [allFieldNames, allFieldArrayNames];
}
