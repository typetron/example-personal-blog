import { Controller, Delete, Get, Middleware, Patch, Post } from '@Typetron/Router';
import { ArticleForm } from 'App/Forms/ArticleForm';
import { Article } from 'App/Entities/Article';
import { AuthMiddleware } from '@Typetron/Framework/Middleware';
import { Article as ArticleModel } from 'App/Models/Article';
import { Inject } from '@Typetron/Container';
import { ArticleService } from 'App/Services/ArticleService';

@Controller()
export class ArticleController {

    @Inject()
    articleService: ArticleService;

    @Get()
    async index() {
        return ArticleModel.from(Article.get());
    }

    @Get(':Article')
    read(article: Article) {
        return ArticleModel.from(article);
    }

    @Post()
    @Middleware(AuthMiddleware)
    async add(form: ArticleForm) {
        return this.articleService.add(form);
    }

    @Patch(':Article')
    @Middleware(AuthMiddleware)
    async update(article: Article, form: ArticleForm) {
        return this.articleService.update(article, form);
    }

    @Delete(':Article')
    @Middleware(AuthMiddleware)
    async delete(article: Article) {
        return this.articleService.delete(article);
    }
}
