import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/api/service/comment.service';

@Component({
    selector: 'app-entry-comments',
    templateUrl: './entry-comments.component.html',
    styleUrls: ['./entry-comments.component.scss'],
})
export class EntryCommentsComponent implements OnInit {
    @Input()
    entryId: number;
    @Input()
    comments: Array<Comment>;

    @Output()
    newCommentAdded = new EventEmitter();

    form: FormGroup = this.fb.group({
        text: ['', Validators.required],
    });


    constructor(private fb: FormBuilder, private commentService: CommentService) {}

    ngOnInit(): void {}

    async submit(): Promise<void> {
        if (!this.form.valid) {
            return;
        }
        await this.commentService.create(this.entryId, this.form.value);
        this.form.reset({text: ''});
        this.newCommentAdded.emit();

    }

    async removeComment(id: number): Promise<void> {
        await this.commentService.delete(id);
        this.newCommentAdded.emit();
    }
}
