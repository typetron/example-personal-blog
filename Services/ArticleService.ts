import { CreateArticleForm } from 'App/Forms/CreateArticleForm'
import { Storage } from '@Typetron/Storage'
import { Article as ArticleModel } from 'App/Models/Article'
import { Article } from 'App/Entities/Article'
import { Inject } from '@Typetron/Container'
import { UpdateArticleForm } from 'App/Forms/UpdateArticleForm'

export class ArticleService {

    @Inject()
    storage: Storage

    async add(form: CreateArticleForm) {
        if (form.image) {
            await this.storage.save(form.image, 'public/assets/articles')
        }
        return ArticleModel.from(Article.create(form))
    }

    async update(article: Article, form: UpdateArticleForm) {
        if (form.image) {
            await this.storage.delete(`public/assets/articles/${article.image}`)
            await this.storage.save(form.image, 'public/assets/articles')
        }
        return ArticleModel.from(article.save(form))
    }

    async delete(article: Article) {
        if (article.image) {
            await this.storage.delete(`public/assets/articles/${article.image}`)
        }
        await article.delete()
    }
}
