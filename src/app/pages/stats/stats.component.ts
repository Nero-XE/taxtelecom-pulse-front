import {NgForOf} from '@angular/common';
import {Component} from '@angular/core';
import {TuiAxes, TuiBarChart, TuiLegendItem, TuiRingChart} from '@taiga-ui/addon-charts';
import {TuiHovered, tuiSum} from '@taiga-ui/cdk';
import { TuiFade } from '@taiga-ui/kit';
@Component({
  selector: 'app-stats',
  imports: [NgForOf, TuiHovered, TuiLegendItem, TuiRingChart, TuiAxes, TuiBarChart, TuiFade],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.less'
})
export class StatsComponent {
  protected activeItemIndex = NaN;

  protected readonly value = [1, 2, 2, 1, 1, 1];
  protected readonly sum = tuiSum(...this.value);
  protected readonly labels = ['Курган', 'Томск', 'Москва', 'Челябинск', 'Пермь', 'Уфа'];

  protected isItemActive(index: number): boolean {
      return this.activeItemIndex === index;
  }
 
  protected onHover(index: number, hovered: boolean): void {
      this.activeItemIndex = hovered ? index : NaN;
  }


  /**
   * Диаграмма анкет
   */

  protected readonly labelsX = [
    // 'Январь 2025', 
    // 'Февраль 2025', 
    // 'Март 2025', 
    'Апрель 2025', 
    'Май 2025',
    'Июнь 2025',
  ];
  protected readonly labelsY = ['0', '40'];

  protected readonly valueApplications = [
    /**
     * RED
     */
    [0, 28, 58],
    /**
     * GREEN
     */
    [0, 14, 10],
  ];
}
