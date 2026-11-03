import {
  Injectable,
  computed,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites =
    signal<number[]>([]);

  count =
    computed(() =>
      this.favorites().length
    );

  toggle(
    projectId: number
  ): void {

    if (
      this.isFavorite(projectId)
    ) {

      this.favorites.update(
        ids =>
          ids.filter(
            id => id !== projectId
          )
      );

    } else {

      this.favorites.update(
        ids => [
          ...ids,
          projectId
        ]
      );

    }

  }

  isFavorite(
    projectId: number
  ): boolean {

    return this.favorites()
      .includes(projectId);

  }

}
