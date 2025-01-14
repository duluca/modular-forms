import type {
  FieldValues,
  FieldPath,
  FieldArrayPath,
  FormStore,
} from '../types';

/**
 * Returns a list with the names of all file arrays.
 *
 * @param form The form of the field arrays.
 *
 * @returns All field array names of the form.
 */
export function getFieldArrayNames<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
  TFieldArrayName extends FieldArrayPath<TFieldValues>
>(
  form: FormStore<TFieldValues, TFieldName, TFieldArrayName>
): TFieldArrayName[] {
  return Object.keys(form.internal.fieldArrays) as TFieldArrayName[];
}
