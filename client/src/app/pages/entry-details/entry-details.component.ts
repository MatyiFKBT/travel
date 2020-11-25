import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/api/dto/tag.dto';
import { TravelEntry } from 'src/app/api/dto/travelentry.dto';
import { EntryService } from 'src/app/api/service/entry.service';
import { TagService } from 'src/app/api/service/tag.service';

@Component({
    selector: 'app-entry-details',
    templateUrl: './entry-details.component.html',
    styleUrls: ['./entry-details.component.scss'],
})
export class EntryDetailsComponent implements OnInit {
    @Input()
    selectedEntry: TravelEntry;

    tags: Array<Tag>;
    chipCtrl = new FormControl();

    constructor(private entryService: EntryService, private tagService: TagService) {}

    async ngOnInit(): Promise<void> {
        this.tags = await this.tagService.findAll();
    }
    async toggleTag(tag: Tag): Promise<void> {
        await this.entryService.toggleTag(this.selectedEntry.id, tag);
        await this.updateEntry();
        this.tags = await this.tagService.findAll();
    }

    async selected(event: MatChipInputEvent): Promise<void> {
        await this.toggleTag(this.chipCtrl.value);
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.toggleTag((value as any) as Tag);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.chipCtrl.setValue(null);
    }

    async updateEntry(): Promise<void> {
        this.selectedEntry = await this.entryService.get(this.selectedEntry.id);
    }
}
