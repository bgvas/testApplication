import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const systemRequest = req.clone({
    setHeaders: {

    }
  });

  return next(systemRequest)
};
