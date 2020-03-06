import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AppRoutingModule} from './app-routing';
import { AuthComponent } from './navpages/auth/auth.component';
import { MainComponent } from './navpages/main/main.component';
import { OneComponent } from './navpages/one/one.component';
import { TwoComponent } from './navpages/two/two.component';
import { ThreeComponent } from './navpages/three/three.component';
import { SearchComponent } from './navpages/search/search.component';
import { StartComponent } from './navpages/two/start/start.component';
import { DetailComponent } from './navpages/two/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    MainComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    SearchComponent,
    StartComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-Token',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
