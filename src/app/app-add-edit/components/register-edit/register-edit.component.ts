import { RegistrationService } from '../../services/registration.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullInfoModel } from '../../../app-common-shared/model/full-info.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register-edit',
  templateUrl: './register-edit.component.html',
  styleUrls: ['./register-edit.component.scss']
})
export class RegisterEditComponent implements OnInit {
  mode = 'Registration';
  infoForm: FormGroup;
  userInfo: FullInfoModel = {
    uid: 'string',
    firstName: 'string',
    lastName: 'string',
    age: 12,
    sex: 'string',
    occupation: 'string',
    institutation: 'string',
    contactInfo: {
        phone: 2123,
        email: 'string',
    },
    address: {
        road: 'string',
        holding: 'string',
        post: 'string',
        postCode: 234,
        district: 'string',
        city: 'string',
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.checkifEditing();
  }

  createForm(): void {
    this.infoForm = this.formBuilder.group({
      firstName: [, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      age: [null, [Validators.required, Validators.min(7), Validators.max(100)]],
      sex: ['Male', [Validators.required]],
      occupation: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      institutation: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      contactInfo: this.formBuilder.group({
        phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        email: [null, [Validators.required, Validators.email]],
      }),
      address: this.formBuilder.group({
        road: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
        holding: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        post: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        postCode: [null, [Validators.required, Validators.min(999), Validators.max(9999)]],
        district: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      })
    });
  }


  get firstName(): AbstractControl {
    return this.infoForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.infoForm.get('lastName');
  }
  get age(): AbstractControl {
    return this.infoForm.get('age');
  }
  get sex(): AbstractControl {
    return this.infoForm.get('sex');
  }
  get occupation(): AbstractControl {
    return this.infoForm.get('occupation');
  }
  get institutation(): AbstractControl {
    return this.infoForm.get('institutation');
  }
  get phone(): AbstractControl {
    return this.infoForm.get('contactInfo').get('phone');
  }
  get email(): AbstractControl {
    return this.infoForm.get('contactInfo').get('email');
  }
  get road(): AbstractControl {
    return this.infoForm.get('address').get('road');
  }
  get holding(): AbstractControl {
    return this.infoForm.get('address').get('holding');
  }
  get post(): AbstractControl {
    return this.infoForm.get('address').get('post');
  }
  get postCode(): AbstractControl {
    return this.infoForm.get('address').get('postCode');
  }
  get district(): AbstractControl {
    return this.infoForm.get('address').get('district');
  }
  get city(): AbstractControl {
    return this.infoForm.get('address').get('city');
  }


  checkifEditing(): void {
    console.log(this.route);
    if (this.route.url['_value'][0]['path'] === 'edit-info') {
      this.route.paramMap.pipe(
        switchMap(params => {
          if (params.has('id')) {
            const id = params.get('id');
            this.mode = 'Edit';
            return this.registerService.getEditInfo(id);
          }
          throwError('No ID was Provided');
        })
      ).subscribe(data => {
        this.userInfo = data;
        this.patchInfoForm();
      }, error => {
        console.log(error);
      });
    }
  }


  patchInfoForm(): void {
    // console.log('got info', this.userInfo);
    this.infoForm.patchValue({
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      age: this.userInfo.age,
      sex: this.userInfo.sex,
      occupation: this.userInfo.occupation,
      institutation: this.userInfo.institutation,
      contactInfo: {
        phone: this.userInfo.contactInfo.phone,
        email: this.userInfo.contactInfo.email
      },
      address: {
        road: this.userInfo.address.road,
        holding: this.userInfo.address.holding,
        post: this.userInfo.address.post,
        postCode: this.userInfo.address.postCode,
        district: this.userInfo.address.district,
        city: this.userInfo.address.city
      }
    });
    this.phone.disable();
    this.email.disable();
  }



  submit(): void {
    if (this.infoForm.invalid) {
      return;
    }
    console.log(this.infoForm.value);
    if (this.mode === 'Registration') {
      console.log('registering');
      this.registerService.register(this.infoForm.value)
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
      this.router.navigate(['/log']);
    } else {
      // console.log('editing', this.infoForm.value);
      const uid = this.userInfo.uid;
      this.registerService.editInfo({...this.infoForm.value, uid})
        .subscribe(() => {
          this.router.navigate(['/full-info', uid]);
        }, error => {
          this.router.navigate(['/server-error']);
        });
    }


  }

}
