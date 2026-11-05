import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(
    key: string,
    value: unknown
  ): void {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  }

  getItem<T>(
    key: string
  ): T | null {

    const value =
      localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    try {

      return JSON.parse(value) as T;

    } catch {

      return null;

    }

  }

  removeItem(
    key: string
  ): void {

    localStorage.removeItem(key);

  }

}
