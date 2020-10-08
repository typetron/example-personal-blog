import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'App/services/article.service';
import { FormBuilder } from 'App/utils';
import { ArticleForm } from 'Data/ArticleForm';

@Component({
    selector: 'app-article-form',
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
    public contentEditor = ClassicEditor;

    id?: number;
    form = FormBuilder.build(ArticleForm);

    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService
    ) {
    }

    async ngOnInit() {
        this.id = this.route.snapshot.params.id;
        if (this.id) {
            const article = await this.articleService.get(this.id);
            this.form.reset(article);
        }
    }

    async save() {
        if (this.id) {
            await this.articleService.edit(this.id, this.form.value);
        } else {
            await this.articleService.save(this.form.value);
        }
    }

    setImageField(event: Event) {
        const input = event.target as HTMLInputElement;
        const reader = new FileReader();
        reader.onloadend = () => {
            this.form.patchValue({image: reader.result});
        };
        reader.readAsDataURL(input.files[0]);
    }
}
