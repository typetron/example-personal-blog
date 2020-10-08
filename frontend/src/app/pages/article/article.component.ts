import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'App/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'Data/Article';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

    id = parseInt(this.route.snapshot.params.article, 10);
    article: Article;

    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService
    ) {}

    async ngOnInit() {
        this.article = await this.articleService.get(this.id);
    }

}
