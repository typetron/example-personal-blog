import { Field, Model } from '@typetron/framework/Models';

export class Article extends Model {
    @Field()
    id: number;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    image: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
