import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NetflixService } from 'src/app/netflix.service';

@Component({
  selector: 'app-select-genre',
  templateUrl: './select-genre.component.html',
  styleUrls: ['./select-genre.component.css']
})
export class SelectGenreComponent {
  @Input() genres: any[] = []; // Adjust the type based on the structure of your genres
  @Input() type: string = '';
  @Output() moviesSelected: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private netflixService: NetflixService) {}

  fetchDataByGenre(event: any): void {
    const genreId = event.target.value;
    this.netflixService.fetchDataByGenre(genreId, this.type).subscribe((data) => {
      this.moviesSelected.emit(data);
    });
  }


}
