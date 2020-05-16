import { Rule, RuleValue } from '@Typetron/Validation';

export class IsNumber extends Rule {
    identifier = 'isNumber';

    passes(attribute: string, value: RuleValue): boolean {
        return !isNaN(Number(value));
    }

    message(attribute: string): string {
        return `The ${attribute} is not a number`;
    }
}
