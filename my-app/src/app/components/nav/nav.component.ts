import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isAuthenticated: boolean = false
  userRole: string | undefined;

  constructor(
    authService:AuthService
  ){}

  ngOnInit(): void {
    
  }

  isLoggedIn(): void {
   
  }  

  logout():void {
   
  }  
}
