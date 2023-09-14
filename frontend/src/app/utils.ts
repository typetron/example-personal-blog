import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms'
import type { Form, FormField } from '@Typetron/Forms'
import type { ChildKeys, Constructor } from '@Typetron/Support'

export class FormBuilder {
    static build<T extends Form>(form: typeof Form & Constructor<T>): FormGroup<Record<ChildKeys<T, Form>, AbstractControl>> {
        const fields = form.fields()
        const controls = {} as Record<ChildKeys<T, Form>, AbstractControl>
        const formFields = Object.values(fields) as FormField[]
        Object.values(formFields).forEach(field => {
            controls[field.name as ChildKeys<T, Form>] = new FormControl(undefined, {validators: this.getValidators(field)})
        })
        const login = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
        })
        return new FormGroup(controls)
    }

    private static getValidators(field: FormField): ValidatorFn {
        return control => field.validate(control.value) as unknown as ValidatorFn
    }
}

export function buildFormData(formData: FormData, data: object, parentKey?: string) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
        Object.keys(data).forEach(key => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
        })
    } else {
        const value = data == null ? '' : data

        formData.append(parentKey as string, value as string)
    }
}
