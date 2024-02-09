import { ValidationErrors } from '@angular/forms';

export class ErrorMessage {
  getErrorMessage(error: ValidationErrors | any): string {
    const errorKey = Object.keys(error)[0];

    switch (errorKey) {
      case 'minlength':
        // return 'VALIDATOR.MIN_LENGTH' + error.minlength.requiredLength + ' VALIDATOR.LENGTH_VAR';
        return 'VALIDATOR.MIN';
      case 'maxlength':
        // return 'VALIDATOR.MAX_LENGTH ' + error.maxlength.requiredLength + ' VALIDATOR.LENGTH_VAR';
        return 'VALIDATOR.MAX';
      case 'required':
        return 'VALIDATOR.REQUIRED';
      case 'email':
        return 'VALIDATOR.EMAIL';
      case 'mustMatch':
        return 'VALIDATOR.MUST_MATCH';
      case 'thaiNationalID':
        return 'VALIDATOR.THAI_NATION_ID';
      case 'min':
        return 'VALIDATOR.MIN';
      case 'max':
        return 'VALIDATOR.MAX';
      case 'pattern':
        return 'VALIDATOR.PATTERN';
      case 'duplicate':
        return 'VALIDATOR.DUPLICATE'
      default:
        return this.getServerErrorMessage(error);
    }
  }

  getServerErrorMessage(value:any): any {
    if (Array.isArray(value)) {
      const error = this.getErrorMessage(value[0]);
      if (!Array.isArray(error)) {
        return error;
      }
    } else {
      return value;
    }
  }
}
