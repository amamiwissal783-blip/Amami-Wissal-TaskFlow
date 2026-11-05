import {
  Injectable,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  StorageService
} from './storage';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private storageService =
    inject(StorageService);

  private readonly storageKey =
    'taskflow-favorites';

  private favorites =
    signal<number[]>(this.loadFavorites());

  count =
    computed(() =>
      this.favorites().length
    );

  private loadFavorites(): number[] {

    const saved =
      this.storageService
        .getItem<number[]>(
          this.storageKey
        );

    if (!saved) {
      return [];
    }

    return saved.map(
      id => Number(id)
    );

  }

  toggle(
    projectId: number
  ): void {

    const id =
      Number(projectId);

    if (
      this.isFavorite(id)
    ) {

      this.favorites.update(
        ids =>
          ids.filter(
            favoriteId =>
              favoriteId !== id
          )
      );

    } else {

      this.favorites.update(
        ids => [
          ...ids,
          id
        ]
      );

    }

    this.saveFavorites();

  }

  private saveFavorites(): void {

    this.storageService.setItem(
      this.storageKey,
      this.favorites()
    );

  }

  isFavorite(
    projectId: number
  ): boolean {

    return this.favorites()
      .includes(
        Number(projectId)
      );

  }

}
