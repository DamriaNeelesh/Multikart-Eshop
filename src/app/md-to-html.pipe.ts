import { Pipe, PipeTransform } from '@angular/core';
import { marked  } from 'marked';
// Marked library is used to fetch the rich text like description and to convert md to html
@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return marked(value);
  }

}


