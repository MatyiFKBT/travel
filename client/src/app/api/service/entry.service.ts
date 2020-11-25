import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../dto/tag.dto';
import { TravelEntry } from '../dto/travelentry.dto';

@Injectable({
    providedIn: 'root',
})
export class EntryService {
    constructor(private http: HttpClient) {}

    async getEntries(): Promise<TravelEntry[]> {
        const entries = await this.http.get<TravelEntry[]>('/api/entries').toPromise();
        return entries;
    }

    async create(entry: TravelEntry): Promise<TravelEntry> {
        const savedEntry = await this.http.post<TravelEntry>('/api/entries', entry).toPromise();
        return savedEntry;
    }

    async get(id): Promise<TravelEntry> {
        return await this.http.get<TravelEntry>(`/api/entries/${id}`).toPromise();
    }

    async toggleTag(id: number, tag: Tag): Promise<TravelEntry> {
        if (typeof tag === 'string') {
            // if (!tag.id) {
            const payload: Tag = {
                text: tag,
            };
            tag = await this.http.post<Tag>(`/api/tags`, payload).toPromise();
        }
        const savedEntry = await this.http
            .patch<TravelEntry>(`/api/entries/${id}/tag`, { tagId: tag.id })
            .toPromise();
        return savedEntry;
    }
}
