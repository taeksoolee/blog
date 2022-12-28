import { fromFetch } from 'rxjs/fetch';
import { switchMap, of, catchError } from 'rxjs';

export const siteData$ = fromFetch('/blog/data/site-data.json')
  .pipe(
    switchMap(response => {
      if(response.ok) {
        return response.json();
      } else {
        return of({error: true, message: `Erro ${response.status}`});
      }
    }),
    catchError(err => {
      console.error(err);
      return of({error: true, message: err.message});
    }),
  );
