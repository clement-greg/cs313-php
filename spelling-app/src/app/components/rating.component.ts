import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: 'rating.component.html',
    styleUrls: ['rating.component.css']
})
export class RatingComponent implements OnInit {
    @Input() rating: number;
    @Input() itemId: number;
    @Input() isSmall: boolean;
    @Input() readOnly: boolean;
    @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

    inputName: string;
    ngOnInit() {
        this.inputName = this.itemId + '_rating';
    }
    onClick(rating: number): void {
        if (this.readOnly) {
            return;
        }
        this.rating = rating;
        this.ratingClick.emit({
            itemId: this.itemId,
            rating: rating
        });
    }
}
