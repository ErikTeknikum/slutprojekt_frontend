import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
  RouterModule, 
  NavComponent
],
  templateUrl: './app.component.html',
  styleUrl: '../styles.scss'
})
export class AppComponent {
  title = 'my-app';
}
