import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: FormGroup = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {}

    ngOnInit(): void {}

    async submit(): Promise<void> {
        if (!this.form.valid) {
            return;
        }
        await this.authService.login(this.form.value);
        this.router.navigate(['/']);
    }
}
