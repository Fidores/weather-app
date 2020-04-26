import { FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Checks if values in given fields are the same.
 * If fields don't have the same value returns fieldsMatch: false, else it returns null.
 * @param fieldsNames Form control names that should have the same value.
*/

export function matchFields(...fieldsNames: string[]): ValidatorFn {

    return function (control: AbstractControl): { [key: string]: boolean } | null {
        const values: string[] = fieldsNames.map(fieldName => control.get(fieldName).value);
        const valuesMatch: boolean = values.every(value => value === values[0]);

        if(valuesMatch) return null;
        else return { fieldsMatch: false };
    }

} 