import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testInterpretator'
})
export class TestInterpretatorPipe implements PipeTransform {

  transform(value: boolean): string {
    switch (value) {
      case true:
        return 'Тест пройден';
        break
      case false:
        return 'Тест не назначен';
        break
      default:
        return 'Ошибка'
        break
    }
  }

}
