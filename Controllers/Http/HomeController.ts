import { Controller, Delete, Get, Middleware, Patch, Post, Query } from '@Typetron/Router';
import { ArticleForm } from 'App/Forms/ArticleForm';
import { Article } from 'App/Entities/Article';
import { Article as ArticleModel } from 'App/Models/Article';
import { Query as DB } from '@Typetron/Database';
import { AuthMiddleware } from '@Typetron/Framework/Middleware';
import { Storage } from '@Typetron/Storage';

@Controller('api')
export class HomeController {

    @Get()
    async index(@Query('page') page = 1, @Query('perPage') perPage = 5) {
        const query = Article.newQuery()
            .select([
                'id',
                'title',
                'image',
                'createdAt',
                'updatedAt',
                DB.raw('SUBSTR(content, 1, 500) as content'),
            ])
            .orderBy('updatedAt', 'DESC');

        if (!page) {
            query.limit((page - 1) * perPage, perPage);
        }
        return ArticleModel.from(await query.get());
    }

    @Get('{article}')
    read(article: Article) {
        return ArticleModel.from(article);
    }

    @Post()
    @Middleware(AuthMiddleware)
    async add(form: ArticleForm, storage: Storage) {
        await storage.put(form.image, 'public/frontend/assets/articles');
        const article = new Article(form);
        await article.save();
        return article;
    }

    @Patch('{article}')
    @Middleware(AuthMiddleware)
    async update(article: Article, form: ArticleForm) {
        article.fill(form);
        await article.save();
        return article;
    }

    @Delete('{article}')
    @Middleware(AuthMiddleware)
    async delete(article: Article) {
        await article.delete();
    }
}
