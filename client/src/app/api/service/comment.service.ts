import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TravelEntry } from '../dto/travelentry.dto';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    constructor(private http: HttpClient) {}

    async create(entryId: number, comment: Comment): Promise<TravelEntry> {
        return await this.http.post<TravelEntry>(`/api/entries/${entryId}/comment`, comment).toPromise();
    }

    async delete(commentId: number): Promise<void> {
        await this.http.delete(`/api/comments/${commentId}`, { responseType: 'text' }).toPromise();
    }
}
