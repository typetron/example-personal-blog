import { MinLength, Required } from '@Typetron/Validation';
import { Field, Form, Rules } from '@Typetron/Forms';
import { Image } from '@Typetron/Storage';

export class ArticleForm extends Form {

    @Field()
    @Rules(
        Required,
        MinLength(5)
    )
    title: string;

    @Field()
    @Rules(
        Required,
    )
    image: Image;

    @Field()
    @Rules(
        Required
    )
    content: string;
}
