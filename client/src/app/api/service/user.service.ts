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
    private static AUTH_TOKEN_KEY = 'travel-auth-token';

    get token(): string {
        return localStorage.getItem(UserService.AUTH_TOKEN_KEY);
    }
    private setToken(token: string): void {
        localStorage.setItem(UserService.AUTH_TOKEN_KEY, token);
    }

    get isLoggedIn(): boolean {
        return !!this.token;
    }

    get userId(): number {
        // console.log(this.token);
        const tokenDataPart = this.token.split('.')[1];
        // console.log(tokenDataPart);
        const dataString = atob(tokenDataPart);
        // console.log(dataString);
        return JSON.parse(dataString).sub;
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
