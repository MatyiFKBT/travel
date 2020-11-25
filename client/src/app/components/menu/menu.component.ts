import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/service/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    constructor(private authService: UserService) {}

    ngOnInit(): void {}

    public isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    logout(): void {
        this.authService.logout();
    }
}
