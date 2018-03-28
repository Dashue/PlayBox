import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export abstract class CreateRowFormComponent {
  onError: Subject<string> = new Subject();

  abstract title: string;

  abstract clear(): void;
  abstract submit(): Observable<boolean>;
  abstract setItemId(itemId: string): void;

  validateFormAndDisplayErrors(form: FormGroup): boolean {
    Object.keys(form.controls).map((controlName) => {
      form.get(controlName).markAsTouched({onlySelf: true});
    });

    return !form.invalid;
  }
}
