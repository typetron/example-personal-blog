import { Rule, RuleInterface, RuleValue } from '@Typetron/Validation';
import { Type } from '@Typetron/Support';

export function InArray(values: string[]): Type<RuleInterface> {
    return class extends Rule {
        identifier = 'inArray';

        passes(attribute: string, value: RuleValue): boolean {
            return values.includes(value as string);
        }

        message(attribute: string): string {
            return `The ${attribute} must have a value from the following list ${values.join(', ')}`;
        }
    };
}
