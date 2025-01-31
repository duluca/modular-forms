import type {
  FieldArrayPath,
  FieldPath,
  FieldValues,
  FormStore,
} from '../types';
import { getFieldAndArrayStores } from './getFieldAndArrayStores';

/**
 * Updates the touched, dirty and invalid state of the form.
 *
 * @param form The store of the form.
 */
export function updateFormState<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
  TFieldArrayName extends FieldArrayPath<TFieldValues>
>(form: FormStore<TFieldValues, TFieldName, TFieldArrayName>): void {
  // Create state variables
  let touched = false,
    dirty = false,
    invalid = false;

  // Check each field and field array and update state if necessary
  for (const fieldOrFieldArray of getFieldAndArrayStores(form)) {
    if (fieldOrFieldArray.active) {
      if (fieldOrFieldArray.touched) {
        touched = true;
      }
      if (fieldOrFieldArray.dirty) {
        dirty = true;
      }
      if (fieldOrFieldArray.error) {
        invalid = true;
      }
    }

    // Break loop if all state values are "true"
    if (touched && dirty && invalid) {
      break;
    }
  }

  // Update state of form
  form.touched = touched;
  form.dirty = dirty;
  form.invalid = invalid;
}
