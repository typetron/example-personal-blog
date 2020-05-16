import { Controller, Delete, Get, Middleware, Patch, Post, Query, Router } from '@Typetron/Router';
import { ArticleForm } from 'App/Forms/ArticleForm';
import { Article } from 'App/Entities/Article';
import { Article as ArticleModel } from 'App/Models/Article';
import { Query as DB } from '@Typetron/Database';
import { AuthMiddleware } from '@Typetron/Framework/Middleware';
import { Storage } from '@Typetron/Storage';
import { Request } from '@Typetron/Http';

@Controller('api')
export class HomeController {

    @Get()
    async index(@Query('page') page = 1, @Query('perPage') perPage = 5, request: Request) {
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

        if (page) {
            query.limit((page - 1) * perPage, perPage);
        }
        return ArticleModel.from(await query.get());
    }

    @Get(':Article')
    read(article: Article) {
        return ArticleModel.from(article);
    }

    @Post()
    @Middleware(AuthMiddleware)
    async add(form: ArticleForm, storage: Storage) {
        // await storage.put(form.image, 'public/assets/articles');
        const article = new Article(form);
        await article.save();
        return ArticleModel.from(article);
    }

    @Patch(':Article')
    @Middleware(AuthMiddleware)
    async update(article: Article, form: ArticleForm, storage: Storage) {
        await storage.delete(`public/assets/articles/${article.image}`);
        // await storage.put(form.image, 'public/assets/articles');
        article.fill(form);
        await article.save();
        return ArticleModel.from(article);
    }

    @Delete(':Article')
    @Middleware(AuthMiddleware)
    async delete(article: Article, storage: Storage) {
        await storage.delete(`public/assets/articles/${article.image}`);
        return await article.delete();
    }
}
