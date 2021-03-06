import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TravelEntry } from 'src/app/api/dto/travelentry.dto';
import { EntryService } from 'src/app/api/service/entry.service';
import { EntryEditorComponent } from '../entry-editor/entry-editor.component';

@Component({
    selector: 'app-travels',
    templateUrl: './travels.component.html',
    styleUrls: ['./travels.component.scss'],
})
export class TravelsComponent implements OnInit {
    entries: Array<TravelEntry> = null;
    selectedEntry: TravelEntry;
    loadSelectedEntry = false;

    constructor(private entryService: EntryService, private dialog: MatDialog) {}

    async ngOnInit(): Promise<void> {
        await this.loadEntries();
    }

    async loadEntries(): Promise<void> {
        this.entries = await this.entryService.getEntries();
    }

    async newEntry(): Promise<void> {
        const createDialog = this.dialog.open(EntryEditorComponent, {
            width: '500px',
        });
        await createDialog.afterClosed().toPromise();
        this.loadEntries();
    }

    async selectEntry(entry: TravelEntry): Promise<void> {
        this.selectedEntry = null;
        this.loadSelectedEntry = true;
        this.selectedEntry = await this.entryService.get(entry.id);
        this.loadSelectedEntry = false;
    }
}
