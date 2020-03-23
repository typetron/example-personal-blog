import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'App/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'Data/Article';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

    articles: Article[] = [];

    constructor(
        private articleService: ArticleService,
    ) {}

    async ngOnInit() {
        this.articles = await this.articleService.articles(0);
    }

}
