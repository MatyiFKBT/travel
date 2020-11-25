import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private currentToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYwNjE2MzI2MX0.1oBTI64rrb9vI3Znzu6ucZWkBxNtJDYKnVihfljrIko';
    get token(): string {
        return this.currentToken;
    }
    private setToken(token: string): void {
        this.currentToken = token;
    }

    // private currentToken: boolean = true;
    // get token(): boolean {
    //     return this.currentToken;
    // }

    // private setToken(token: boolean): void {
    //     this.currentToken = token;
    // }


    get isLoggedIn(): boolean {
        return !!this.token;
    }

    constructor(private httpClient: HttpClient, private router: Router) {}

    async register(registerRequest: RegisterRequest): Promise<void> {
        await this.httpClient.post('/api/users/register', registerRequest, { responseType: 'text' }).toPromise();
    }

    async login(loginRequest: LoginRequest): Promise<void> {
        const token = await this.httpClient.post('/api/users/login', loginRequest, { responseType: 'text' }).toPromise();
        this.setToken(token);
    }

    public logout(): void {
        this.setToken(null);
        this.router.navigate(['/auth']);
    }
}
