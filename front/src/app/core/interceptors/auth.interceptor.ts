import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authTokenPass = environment.authTokenPass;

  const authTokenKey = CryptoJS.enc.Base64.parse(environment.authTokenKey);
  const authTokenIv = CryptoJS.enc.Utf8.parse(environment.authTokenIv);

  const encryptedToken = CryptoJS.AES.encrypt(authTokenPass, authTokenKey, {
    iv: authTokenIv,
    mode: CryptoJS.mode.CBC
  }).toString();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${encryptedToken}`
    }
  });

  return next(authReq);
};
