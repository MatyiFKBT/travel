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
    toggleInProgress = false;

    constructor(private entryService: EntryService, private tagService: TagService) {}

    async ngOnInit(): Promise<void> {
        this.tags = await this.tagService.findAll();
    }
    async toggleTag(tag: Tag): Promise<void> {
        this.chipCtrl.disable();
        await this.entryService.toggleTag(this.selectedEntry.id, tag);
        await this.updateEntry();
        this.tags = await this.tagService.findAll();
        this.chipCtrl.enable();
    }

    async selected(event: MatChipInputEvent): Promise<void> {
        this.toggleInProgress = true;
        await this.toggleTag(this.chipCtrl.value);
        this.toggleInProgress = false;
    }

    add(event: MatChipInputEvent): void {
        if (this.toggleInProgress) {
            return;
        }
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
