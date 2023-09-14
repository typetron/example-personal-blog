import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Article } from 'Data/Article'
import { ArticleForm } from 'Data/ArticleForm'
import { AuthService } from 'App/services/auth.service'
import { buildFormData } from 'App/utils'
import { lastValueFrom } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    articles(page = 1) {
        return lastValueFrom(this.http.get<Article[]>(`api?page=${page}`))
    }

    get(id: number) {
        return lastValueFrom(this.http.get<Article>('api/' + id.toString()))
    }

    save(article: ArticleForm) {
        const form = new FormData()
        buildFormData(form, article)
        return lastValueFrom(this.http.post<Article>('api', form, {headers: {Authorization: this.authService.token$.getValue()}}))
    }

    edit(id: number, article: ArticleForm) {
        const form = new FormData()
        buildFormData(form, article)
        return lastValueFrom(this.http.put<Article>(`api/${id}`, form, {headers: {Authorization: this.authService.token$.getValue()}}))
    }

    delete(id: number) {
        return lastValueFrom(this.http.delete(`api/${id}`, {headers: {Authorization: this.authService.token$.getValue()}}))
    }
}
