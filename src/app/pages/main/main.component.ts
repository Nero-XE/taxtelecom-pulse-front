import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavItem } from '../../interfaces/nav-item.interface';
import { NavItemComponent } from './components/nav-item/nav-item.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavItemComponent],
  templateUrl: './main.component.html',
  styles: `:host {
    height: 100%
  }`,
})
export class MainComponent {
  // Роутер
  private router = inject(Router)

  // Функция деавторизации
  logout() {
    localStorage.clear()
    this.router.navigateByUrl('auth')
  }

  // Элементы меню навигации
  navItems: NavItem[] = [
    {
      href: "search",
      hrefTitle: "Поиск",
      imgSrc: 'icons/nav-search-icon.svg',
      imgAlt: "search"
    },
    {
      href: "profiles",
      hrefTitle: "Профили",
      imgSrc: 'icons/nav-profiles-icon.svg',
      imgAlt: "profiles"
    },
    {
      href: "applications",
      hrefTitle: "Анкеты",
      imgSrc: 'icons/nav-applications-icon.svg',
      imgAlt: "applications"
    },
    {
      href: "moodle",
      hrefTitle: "Moodle",
      imgSrc: 'icons/nav-moodle-icon.svg',
      imgAlt: "moodle"
    },
    {
      href: "statistics",
      hrefTitle: "Статистика",
      imgSrc: 'icons/nav-statistics-icon.svg',
      imgAlt: "statistics"
    },
  ]
}
