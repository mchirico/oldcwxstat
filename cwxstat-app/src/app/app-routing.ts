import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './navpages/main/main.component'
import {OneComponent} from './navpages/one/one.component';
import {TwoComponent} from './navpages/two/two.component';
import {StartComponent} from './navpages/two/start/start.component';
import {DetailComponent} from './navpages/two/detail/detail.component';
import {ThreeComponent} from './navpages/three/three.component';
import {SearchComponent} from './navpages/search/search.component';;
import {AuthComponent} from './navpages/auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main', component: MainComponent},
  { path: 'one', component: OneComponent},
  { path: 'two', component: TwoComponent, children: [
      {path: '', component: StartComponent},
      {path: ':id', component: DetailComponent}
    ]},
  { path: 'three', component: ThreeComponent},
  { path: 'auth', component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
