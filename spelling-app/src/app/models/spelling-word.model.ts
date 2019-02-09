import { SpellingWordScore } from './spelling-word-score.model';

export class SpellingWord {
    id: string;
    word: string;
    spellinglistid: string;
    createddate: Date;
    deletedate: Date;

    // Client-side only
    scores: SpellingWordScore[];
}
