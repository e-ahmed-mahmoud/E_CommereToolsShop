import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize, identity } from 'rxjs';
import { LoadingService } from '../services/Loading.service';
import { environment } from '../../../environments/environment';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.busy();

  return next(req).pipe(
    environment.isProd ? identity : delay(300),
    finalize(() => loadingService.idle()),
  );
};
