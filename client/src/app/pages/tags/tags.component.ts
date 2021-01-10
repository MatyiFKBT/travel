import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/api/dto/tag.dto';
import { TagService } from 'src/app/api/service/tag.service';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
    tags: Array<Tag> = null;

    constructor(private tagsService: TagService) {}

    async ngOnInit(): Promise<void> {
        await this.loadEntries();
    }

    async loadEntries(): Promise<void> {
        this.tags = await this.tagsService.findAll();
    }

    async deleteTag(id: number): Promise<void> {
        await this.tagsService.delete(id);
        await this.loadEntries();
    }
}
