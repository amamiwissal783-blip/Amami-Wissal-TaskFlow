import {
  Injectable,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme =
    signal<'light' | 'dark'>('light');

  toggleTheme(): void {

    this.theme.update(
      current =>
        current === 'light'
          ? 'dark'
          : 'light'
    );

  }

}
