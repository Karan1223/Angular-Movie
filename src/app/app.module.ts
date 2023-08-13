import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PlayerComponent } from './pages/player/player.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { UserLikedComponent } from './pages/user-liked/user-liked.component';
import { NetflixComponent } from './pages/netflix/netflix.component';
import { HeaderComponent } from './component/header/header.component';
import { BackgroundImageComponent } from './component/background-image/background-image.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import the FontAwesomeModule

import { NetflixService } from './netflix.service';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './component/slider/slider.component';
import { CardSliderComponent } from './component/card-slider/card-slider.component';
import { CardComponent } from './component/card/card.component';
import { TVShowsComponent } from './pages/tvshows/tvshows.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotAvailableComponent } from './component/not-available/not-available.component';
import { SelectGenreComponent } from './component/select-genre/select-genre.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    NetflixComponent,
    PlayerComponent,
    UserLikedComponent,
    BackgroundImageComponent,
    CardComponent,
    CardSliderComponent,
    HeaderComponent,
    NavbarComponent,
    SliderComponent,
    SignupComponent,
    TVShowsComponent,
    NotAvailableComponent,
    SelectGenreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    YouTubePlayerModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [NetflixService],
  bootstrap: [AppComponent]
})
export class AppModule { }
