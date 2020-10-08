import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Form, FormField } from '@Typetron/Forms';
import { Constructor } from '@Typetron/Support';

export class FormBuilder {
    static build(form: typeof Form & Constructor<Form>): FormGroup {
        const fields = form.fields();
        const controls: Record<string, AbstractControl> = {};
        const formFields = Object.values(fields) as FormField[];
        Object.values(formFields).forEach(field => {
            controls[field.name] = new FormControl(undefined, {validators: this.getValidators(field)});
        });
        return new FormGroup(controls);
    }

    private static getValidators(field: FormField): ValidatorFn {
        return control => field.validate(control.value);
    }
}

export function buildFormData(formData: FormData, data: object, parentKey?: string) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        const value = data == null ? '' : data;

        formData.append(parentKey, value as string);
    }
}
