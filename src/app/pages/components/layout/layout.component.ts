import { Component, inject } from '@angular/core';
import { TUI_DARK_MODE, TuiButton, TuiHint, TuiIcon } from '@taiga-ui/core';
import { version } from '../../../../../package.json';
import { Router, RouterModule } from '@angular/router';
import { TuiTabs } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { NavigationItem } from './layout.interface';
import { LogOutService } from '../../../services/auth/log-out.service';

@Component({
  selector: 'app-layout',
  imports: [TuiNavigation, TuiButton, TuiHint, RouterModule, TuiTabs, TuiIcon],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less'
})
export class LayoutComponent {
  protected readonly appVersion = version.toString().concat(' Альфа');

  protected readonly router = inject(Router)
  protected readonly logOutService = inject(LogOutService)

  protected readonly darkMode = inject(TUI_DARK_MODE);

  protected readonly navItems: NavigationItem[] = [
    {
      icon: '@tui.briefcase-business',
      link: 'applications',
      name: 'Анкеты'
    },
    {
      icon: '@tui.contact-round',
      link: 'profiles',
      name: 'Профили'
    },
    {
      icon: '@tui.chart-no-axes-combined',
      link: 'stats',
      name: 'Статистика'
    },
    {
      icon: '@tui.book-check',
      link: 'moodle',
      name: 'Moodle'
    },
  ]
  protected readonly footerNavItems: NavigationItem[] = [    
    {
      icon: '@tui.notebook-text',
      link: 'system-journal',
      name: 'Системный журнал',
    },
    {
      icon: '@tui.user-round-cog',
      link: 'account-management',
      name: 'Управление аккаунтами',
    },
    {
      icon: '@tui.log-out',
      link: 'auth',
      name: 'Выход',
      func: () => this.logOutService.logOut()
    },
  ]
}
