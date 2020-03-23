import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'App//pages/home/home.component';
import { AboutComponent } from 'App//pages/about/about.component';
import { ContactComponent } from 'App//pages/contact/contact.component';
import { ArticleComponent } from 'App//pages/article/article.component';
import { ArticleFormComponent } from 'App//pages/article-form/article-form.component';
import { LoginComponent } from 'App/pages/login/login.component';
import { AuthGuard } from 'App/guards/auth.guard';
import { PortfolioComponent } from 'App/pages/portfolio/portfolio.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'portfolio',
        component: PortfolioComponent
    },
    {
        canActivateChild: [AuthGuard],
        path: '',
        children: [

            {
                path: 'new',
                component: ArticleFormComponent
            },
            {
                path: 'edit/:id',
                component: ArticleFormComponent
            },

        ]
    },
    {
        path: ':article',
        component: ArticleComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
