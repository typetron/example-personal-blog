import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticleFormComponent } from './pages/article-form/article-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LoginComponent } from './pages/login/login.component';
import { HttpInterceptor } from 'App/services/http.interceptor';
import { AuthDirective } from './directives/auth.directive';
import { PortfolioComponent } from 'App/pages/portfolio/portfolio.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        ArticleComponent,
        ArticleFormComponent,
        PortfolioComponent,
        LoginComponent,
        AuthDirective
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CKEditorModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
