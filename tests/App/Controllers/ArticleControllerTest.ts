import { suite, test } from '@testdeck/mocha'
import { expect } from 'chai'
import { TestCase } from '../../TestCase'
import { Http } from '@Typetron/Router/Http'
import { Article } from 'App/Models/Article'
import { Article as ArticleEntity } from 'App/Entities/Article'
import { User } from 'App/Entities/User'

@suite
class ArticleControllerTest extends TestCase {
    private user: User

    async before() {
        await super.before()
        this.user = await this.createUser()
        await this.actingAs(this.user)
    }

    @test
    async addArticle() {
        const response = await this.post<Article>('api.add', {
            title: 'Test Article',
            content: 'Test Content',
            image: null
        })

        expect(response.status).to.be.equals(Http.Status.OK)
        expect(response.body.title).to.be.equals('Test Article')
    }

    @test
    async updateArticle() {
        const article = await ArticleEntity.create({
            title: 'Test Article',
            content: 'Test Content',
            image: null
        })
        const response = await this.put<Article>(['api.update', {Article: article.id}], {
            title: 'Updated Test Article',
            content: 'Updated Test Content',
            image: null
        })

        expect(response.status).to.be.equals(Http.Status.OK)
        expect(response.body.title).to.be.equals('Updated Test Article')
    }

    @test
    async deleteArticle() {
        const article = await ArticleEntity.create({
            title: 'Test Article',
            content: 'Test Content',
            image: null
        })

        const response = await this.delete(['api.delete',{Article: article.id}])

        expect(response.status).to.be.equals(Http.Status.OK)
    }

    @test
    async readArticle() {
        const response = await this.get('api.list')

        expect(response.status).to.be.equals(Http.Status.OK)
    }
}
