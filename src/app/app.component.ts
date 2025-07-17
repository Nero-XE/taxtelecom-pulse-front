import { TuiRoot } from '@taiga-ui/core';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TUI_DARK_MODE} from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiRoot],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
    protected readonly darkMode = inject(TUI_DARK_MODE);
}