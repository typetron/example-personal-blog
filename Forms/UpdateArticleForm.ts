import { FileExtension, Optional } from '@Typetron/Validation'
import { Field, Rules } from '@Typetron/Forms'
import { File } from '@Typetron/Storage/File'
import { ArticleForm } from './ArticleForm'

export class UpdateArticleForm extends ArticleForm {
    @Field()
    @Rules(Optional, FileExtension(['jpg', 'jpeg', 'png', 'gif', 'webp']))
    image?: File
}
