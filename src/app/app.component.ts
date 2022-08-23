import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  isLogged:boolean = this.tokenService.isLogged()

  logout(){
    localStorage.clear()
    window.location.reload()
    this.router.navigate(['/catalogue'])
  }
}
