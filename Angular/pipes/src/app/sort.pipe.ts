import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class SortPipe implements PipeTransform {
  transform(arr: Array<any>, sortBy: string): Array<any> {
    return arr.sort(function(a, b) {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
  }
}
