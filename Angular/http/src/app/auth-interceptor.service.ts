import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url === "do not make request") {
      //...
    }

    const modifiedRequest = req.clone({
      //   url: "some-new-url",
      headers: req.headers.append("Auth", "xxx")
    });

    return next.handle(modifiedRequest);
  }
}
