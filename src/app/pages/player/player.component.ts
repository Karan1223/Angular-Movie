import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  // Change this to the YouTube video ID you want to play
  public videoId: string = '';
  videoUrl: SafeResourceUrl = '';

  constructor(private route: ActivatedRoute,  private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoId = params['videoId'];
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.videoId}`
      );
      console.log(this.videoId);
    });
  }
}
