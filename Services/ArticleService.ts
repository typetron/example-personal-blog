import { Delete, Middleware, Patch, Post } from '@Typetron/Router';
import { AuthMiddleware } from '@Typetron/Framework/Middleware';
import { ArticleForm } from 'App/Forms/ArticleForm';
import { Storage } from '@Typetron/Storage';
import { Article as ArticleModel } from 'App/Models/Article';
import { Article } from 'App/Entities/Article';
import { Inject } from '@Typetron/Container';

export class ArticleService {

    @Inject()
    storage: Storage

    @Post()
    @Middleware(AuthMiddleware)
    async add(form: ArticleForm) {
        if (form.image) {
            await this.storage.save(form.image, 'public/articles');
        }
        return ArticleModel.from(await Article.create(form));
    }

    @Patch(':Article')
    @Middleware(AuthMiddleware)
    async update(article: Article, form: ArticleForm) {
        // if (form.image instanceof File) {
        //     await this.storage.delete(`public/articles/${article.image}`)
        //     await this.storage.save(form.image, 'public/articles')
        // }
        return ArticleModel.from(await article.save(form));
    }

    @Delete(':Article')
    @Middleware(AuthMiddleware)
    async delete(article: Article) {
        await this.storage.delete(`public/articles/${article.image}`);
        await article.delete();
    }
}
