import { FileExtension } from '@Typetron/Validation'
import { Field, Rules } from '@Typetron/Forms'
import { File } from '@Typetron/Storage/File'
import { ArticleForm } from './ArticleForm'

export class CreateArticleForm extends ArticleForm {
    @Field()
    @Rules(FileExtension(['jpg', 'jpeg', 'png', 'gif', 'webp']))
    image: File
}
