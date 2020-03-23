import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from 'Data/Article';
import { ArticleForm } from 'Data/ArticleForm';
import { AuthService } from 'App/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    articles(page: number = 1) {
        return this.http.get<Article[]>(`api?page=${page}`).toPromise();
    }

    get(id: number) {
        return this.http.get<Article>('api/' + id.toString()).toPromise();
    }

    save(article: ArticleForm) {
        return this.http.post('api', article, {headers: {Authorization: this.authService.token$.getValue()}}).toPromise();
    }

    edit(id: number, article: ArticleForm) {
        return this.http.patch(`api/${id}`, article, {headers: {Authorization: this.authService.token$.getValue()}}).toPromise();
    }

    delete(id: number) {
        return this.http.delete(`api/${id}`, {headers: {Authorization: this.authService.token$.getValue()}}).toPromise();
    }
}
