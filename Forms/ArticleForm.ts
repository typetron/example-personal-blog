import { MinLength, Required } from '@Typetron/Validation';
import { Field, Form, Rules } from '@Typetron/Forms';
import { File } from '@Typetron/Storage';

export class ArticleForm extends Form {

    @Field()
    @Rules(
        Required,
        MinLength(5)
    )
    title: string

    @Field()
    @Rules(
        Required
    )
    image: File

    @Field()
    @Rules(
        Required
    )
    content: string
}
