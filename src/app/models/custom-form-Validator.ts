import { NONE_TYPE } from "@angular/compiler";
import { FormControl, ValidationErrors } from "@angular/forms";


export class CustomFormValidator{

  // White space Validation taaki koi space na chorde mail mai
  static notOnlyWhitespace(control: FormControl): ValidationErrors {
     // check if the string only contains white space
     if((control.value.length!=null) && (control.value.trim().length === 0)){
        // trim is logic so that after trim no space is left if left then error
        // invalid return error Object
        return {'notOnlyWhitespace':true};
     }
     else {
      return NONE_TYPE;
     }

  }
}
