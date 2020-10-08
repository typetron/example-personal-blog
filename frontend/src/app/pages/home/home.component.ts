import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'App/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'Data/Article';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    articles: Article[] = [];

    page = Number(this.route.snapshot.queryParams.page || 1);

    constructor(
        private articleService: ArticleService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    async ngOnInit() {
        this.route.queryParams.subscribe(async (params) => {
            this.page = Number(params.page || 1);
            this.articles = await this.articleService.articles(this.page);
        });
    }

    async delete(article: Article) {
        if (confirm('Are you sure you want to delete this article')) {
            await this.articleService.delete(article.id).then(() => {
                this.articles.remove(article);
            });
        }
    }

    goToPage(page: number) {
        this.router.navigate([], {queryParams: {page}});
    }
}
