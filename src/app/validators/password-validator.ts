import { AbstractControl, ValidatorFn } from "@angular/forms";

const matchPasswords: ValidatorFn = (group: AbstractControl) => {
    const password = group.parent?.get('Password')?.value;
    const confirmPassword = group.parent?.get('Confirm Password')?.value;

    return password === confirmPassword ? null : { mismatch: true };
}

export { matchPasswords };