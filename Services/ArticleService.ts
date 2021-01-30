import { ArticleForm } from 'App/Forms/ArticleForm'
import { Storage } from '@Typetron/Storage'
import { Article as ArticleModel } from 'App/Models/Article'
import { Article } from 'App/Entities/Article'
import { Inject } from '@Typetron/Container'

export class ArticleService {

    @Inject()
    storage: Storage

    async add(form: ArticleForm) {
        if (form.image) {
            await this.storage.save(form.image, 'public/assets/articles')
        }
        return ArticleModel.from(Article.create(form))
    }

    async update(article: Article, form: ArticleForm) {
        if (form.image) {
            await this.storage.delete(`public/assets/articles/${article.image}`)
            await this.storage.save(form.image, 'public/assets/articles')
        }
        return ArticleModel.from(article.save(form))
    }

    async delete(article: Article) {
        await this.storage.delete(`public/assets/articles/${article.image}`)
        await article.delete()
    }
}
