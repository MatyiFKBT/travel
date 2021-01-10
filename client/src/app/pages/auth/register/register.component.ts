import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/service/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    });

    successRegister = false;

    constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {}

    ngOnInit(): void {}

    async submit(): Promise<void> {
        if (!this.form.valid) {
            return;
        }
        await this.authService.register(this.form.value);
        this.successRegister = true;
        /*this.form.reset({
            username: '',
            email: '',
            password: '',
        });*/
    }
}
