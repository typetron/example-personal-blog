import { Component, OnInit } from '@angular/core'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ActivatedRoute, Router } from '@angular/router'
import { ArticleService } from 'App/services/article.service'
import { FormBuilder } from 'App/utils'
import { ArticleForm } from 'Data/ArticleForm'
import { Article } from 'Data/Article'

@Component({
    selector: 'app-article-form',
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
    public contentEditor = ClassicEditor

    id?: number
    form = FormBuilder.build(ArticleForm)

    imagesBasePath = 'assets/articles/'

    imagePreview?: string

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private articleService: ArticleService
    ) {
    }

    async ngOnInit() {
        this.id = this.route.snapshot.params.id
        if (this.id) {
            const article = await this.articleService.get(this.id)
            this.form.patchValue({...article, image: undefined})
            this.imagePreview = `${this.imagesBasePath}/${article.image}`
        }
    }

    async save() {
        let article: Article
        if (this.id) {
            article = await this.articleService.edit(this.id, this.form.value)
        } else {
            article = await this.articleService.save(this.form.value)
        }

        await this.router.navigate([article.id])
    }

    // setImageField(event: Event) {
    //     const input = event.target as HTMLInputElement
    //     const reader = new FileReader()
    //     reader.onloadend = () => {
    //         this.form.patchValue({image: reader.result})
    //     }
    //     reader.readAsDataURL(input.files[0])
    // }

    previewImage($event: Event) {
        const input = $event.target as HTMLInputElement

        const reader = new FileReader()
        reader.onloadend = () => {
            this.imagePreview = reader.result as string
        }
        this.form.patchValue({image: input.files[0]})
        reader.readAsDataURL(input.files[0])
    }
}
