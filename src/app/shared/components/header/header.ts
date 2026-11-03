import {
  Component,
  inject
} from '@angular/core';

import {
  FavoritesService
} from '../../../core/services/favorites.service';

import {
  ThemeService
} from '../../../core/services/theme';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  favoritesService =
    inject(FavoritesService);

  themeService =
    inject(ThemeService);

}
