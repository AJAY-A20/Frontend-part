import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash-board-admin',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './dash-board-admin.component.html',
  styleUrl: './dash-board-admin.component.css'
})
export class DashBoardAdminComponent {

}
