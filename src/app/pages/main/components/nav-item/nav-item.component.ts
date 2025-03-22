import { Component, input } from '@angular/core';
import { NavItem } from '../../../../interfaces/nav-item.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [RouterModule],
  templateUrl: './nav-item.component.html',
  styles: ``
})
export class NavItemComponent {
  navItem = input<NavItem>()
}
