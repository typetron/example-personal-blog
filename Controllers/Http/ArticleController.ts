import { Controller, Delete, Get, Middleware, Post, Put, Query } from '@Typetron/Router'
import { CreateArticleForm } from 'App/Forms/CreateArticleForm'
import { Article } from 'App/Entities/Article'
import { AuthMiddleware } from '@Typetron/Framework/Middleware'
import { Article as ArticleModel } from 'App/Models/Article'
import { Inject } from '@Typetron/Container'
import { ArticleService } from 'App/Services/ArticleService'
import { UpdateArticleForm } from 'App/Forms/UpdateArticleForm'

@Controller('api')
export class ArticlesController {

    @Inject()
    articleService: ArticleService

    @Get()
    async list(@Query('page') page = 1) {
        const limit = 5
        return ArticleModel.from(Article.newQuery().limit((page - 1) * limit, limit).orderBy('createdAt', 'DESC').get())
    }

    @Get(':Article')
    read(article: Article) {
        return ArticleModel.from(article)
    }

    @Post()
    @Middleware(AuthMiddleware)
    async add(form: CreateArticleForm) {
        return this.articleService.add(form)
    }

    @Put(':Article')
    @Middleware(AuthMiddleware)
    async update(article: Article, form: UpdateArticleForm) {
        return this.articleService.update(article, form)
    }

    @Delete(':Article')
    @Middleware(AuthMiddleware)
    async delete(article: Article) {
        return this.articleService.delete(article)
    }
}
