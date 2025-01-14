import type {
  DeepPartial,
  FieldArrayPath,
  FieldArrayPathValue,
  FieldPath,
  FieldValues,
  FormStore,
} from '../types';
import { getFieldNames, getFieldValues } from '../utils';

type ArrayValuesOptions = Partial<{
  shouldActive: boolean;
  shouldTouched: boolean;
  shouldDirty: boolean;
  shouldValid: boolean;
}>;

/**
 * Returns the values of the specified field array.
 *
 * @param form The form of the field array.
 * @param name The name of the field array.
 * @param options The array values options.
 *
 * @returns The values of the field array.
 */
export function getArrayValues<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
  TFieldArrayValue extends FieldArrayPathValue<TFieldValues, TFieldArrayName>
>(
  form: FormStore<TFieldValues, TFieldName, TFieldArrayName>,
  name: TFieldArrayName,
  options: ArrayValuesOptions = {}
): DeepPartial<TFieldArrayValue> {
  // Destructure options and set default values
  const {
    shouldActive = true,
    shouldTouched = false,
    shouldDirty = false,
    shouldValid = false,
  } = options;

  // Return values of field array
  return getFieldValues(
    form,
    getFieldNames(form).filter((fieldName) => fieldName.startsWith(name)),
    {
      initialValue: [],
      replacePrefix: `${name}.`,
      shouldActive,
      shouldTouched,
      shouldDirty,
      shouldValid,
    }
  ) as DeepPartial<TFieldArrayValue>;
}
