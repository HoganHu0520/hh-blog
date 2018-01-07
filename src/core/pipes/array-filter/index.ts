import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter',
  pure: false
})
export default class ArrayFilterPipe<T> implements PipeTransform {
  transform(items: T[], filter: (T) => boolean): T[] {
    console.log(items, 'init');
    if (!items || !filter) {
      return items;
    }

    let result = items.filter(item => filter(item));
    console.log(result, 'result')
    return result;
  }
}
