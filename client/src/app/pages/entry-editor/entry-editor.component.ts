import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TravelEntry } from 'src/app/api/dto/travelentry.dto';
import { EntryService } from 'src/app/api/service/entry.service';

@Component({
    selector: 'app-entry-editor',
    templateUrl: './entry-editor.component.html',
    styleUrls: ['./entry-editor.component.scss'],
})
export class EntryEditorComponent implements OnInit {
    editing: boolean = false;

    form: FormGroup = this.fb.group({
        desc: ['', Validators.required],
        latlon: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EntryEditorComponent>,
        @Inject(MAT_DIALOG_DATA) private entry: TravelEntry,
        private entryService: EntryService
    ) {
        if (entry) {
            this.form.reset({
                desc: this.entry.desc,
                latlon: this.entry.latlon,
                start_date: this.entry.start_date,
                end_date: this.entry.end_date,
            });
            this.editing = true;
        }
    }

    ngOnInit(): void {}

    async submit(): Promise<void> {
        if (!this.form.valid) {
            return;
        }
        await this.saveEntry(this.form.value);
        this.dialogRef.close(this.form.value);
    }

    private async saveEntry(entry: TravelEntry): Promise<TravelEntry> {
        // if (this.editing) {
        //     return this.entryService.update(this.entry.id, entry);
        // } else {
            return this.entryService.create(entry);
        // }
    }
}
