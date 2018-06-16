import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import { UnifiedSearchService } from './unified-search.service';
import { GitSearchComponent } from './git-search/git-search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NoSpecialCharsDirective } from './no-special-chars.directive';

const appRoutes: Routes = [
  { path: '',
    component: HomePageComponent
  },
  { path: 'search',
    redirectTo: '/search/angular/0',
    pathMatch: 'full'
  },
  { path: 'search/:query',
    redirectTo: '/search/:query/1',
    pathMatch: 'full'
  },
  {
    path: 'search/:query/:page',
    component: GitSearchComponent,
    data: { title: 'Git Search' }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    NotFoundComponent,
    HomePageComponent,
    NoSpecialCharsDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ReactiveFormsModule
  ],
  providers: [GitSearchService, GitCodeSearchService, UnifiedSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
