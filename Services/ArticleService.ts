import { Article as ArticleModel } from 'App/Models/Article';
import { Storage } from '@Typetron/Storage';
import { ArticleForm } from 'App/Forms/ArticleForm';
import { Article } from 'App/Entities/Article';
import { Inject } from '@Typetron/Container';

export class ArticleService {

    @Inject()
    storage: Storage;

    async update(article: Article, form: ArticleForm) {
        await this.storage.delete(`public/assets/articles/${article.image}`);
        await this.storage.put(form.image, 'public/assets/articles');
        article.fill(form);
        await article.save();
        return ArticleModel.from(article);
    }
}
