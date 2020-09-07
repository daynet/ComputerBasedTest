import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     var guard =  localStorage.getItem('rauteGaurd');
     var tok = localStorage.getItem('token') ;
     var psid = localStorage.getItem('psid');

     if(tok != null || psid != null)
    
       return true;
       this.router.navigate(['/login']);
       return false;
    

    if(guard == 'true')
    {
      return true;
    }
  }

}
