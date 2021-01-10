import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../dto/tag.dto';

@Injectable({
    providedIn: 'root',
})
export class TagService {
    constructor(private http: HttpClient) {}

    async findAll(): Promise<Tag[]> {
        return await this.http.get<Tag[]>('/api/tags').toPromise();
    }

    async delete(id: number): Promise<void> {
        await this.http.delete(`/api/tags/${id}`, { responseType: 'text' }).toPromise();
    }
}
