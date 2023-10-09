import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ArticleService } from 'App/services/article.service'
import { CreateArticleForm } from 'Data/CreateArticleForm'
import { Article } from 'Data/Article'
import { FormBuilder, FormGroupObject } from 'App/utils'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { UpdateArticleForm } from 'Data/UpdateArticleForm'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'app-article-form',
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
    public contentEditor = ClassicEditor

    id?: number
    form: FormGroup<FormGroupObject<CreateArticleForm>> | FormGroup<FormGroupObject<UpdateArticleForm>>

    imagesBasePath = 'assets/articles/'

    imagePreview?: string

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private articleService: ArticleService
    ) {
    }

    async ngOnInit() {
        this.id = this.route.snapshot.params['id']
        if (this.id) {
            this.form = FormBuilder.build(UpdateArticleForm)
            const article = await this.articleService.get(this.id)
            this.form.patchValue({...article, image: undefined})
            this.imagePreview = `${this.imagesBasePath}/${article.image}`
        } else {
            this.form = FormBuilder.build(CreateArticleForm)
        }
    }

    async save() {
        this.form.markAllAsTouched()
        if (this.form.invalid) {
            return
        }

        const form = this.form.value

        if (!form.image) {
            delete form.image
        }
        let article: Article
        if (this.id) {
            article = await this.articleService.edit(this.id, form as UpdateArticleForm)
        } else {
            article = await this.articleService.save(form as CreateArticleForm)
        }

        await this.router.navigate([article.id])
    }

    previewImage($event: Event) {
        const input = $event.target as HTMLInputElement

        const reader = new FileReader()
        reader.onloadend = () => {
            this.imagePreview = reader.result as string
        }
        const image = input.files?.[0]
        if (image) {
            Object.assign(image, {extension: image.type.split('/').pop()})
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.form.patchValue({image})
            reader.readAsDataURL(image)
        }
    }
}
