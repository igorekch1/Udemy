import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, tap, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        // return !!user;
        const isAuth = !!user;

        return isAuth ? true : this.router.createUrlTree(["/auth"]);
      })
      // 1st approach
      //   tap(isAuth => {
      //     if (!isAuth) {
      //       this.router.navigate(["/auth"]);
      //     }
      //   })
    );
  }
}
