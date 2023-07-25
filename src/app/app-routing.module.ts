import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetflixComponent } from './pages/netflix/netflix.component';
import { LoginComponent } from './pages/login/login.component';
import { PlayerComponent } from './pages/player/player.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TVShowsComponent } from './pages/tvshows/tvshows.component';
import { UserLikedComponent } from './pages/user-liked/user-liked.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {path: '', component: NetflixComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'tv', component: TVShowsComponent},
  {path: 'mylist', component: UserLikedComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
