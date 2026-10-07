import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from  '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CollectionModule } from './collection/collection.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SharedModule } from './shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ProjectsComponent,
        ContactComponent,
        HeaderComponent,
        SidenavListComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot([
            { path: 'home', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'contact', component: ContactComponent },
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]),
        BrowserAnimationsModule,
        CollectionModule,
        SharedModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTabsModule,
        MatCardModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
