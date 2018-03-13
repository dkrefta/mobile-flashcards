import {AsyncStorage} from 'react-native';

export const DECKS_STORAGE_KEY = 'decks:mobile-flashcards';

let data = {
    Lol: {
        title: 'League of Legends',
        questions: [
            {
                question: 'Who bears the title of "The Thunders Roar?',
                answer: 'Volibear',
            },
            {
                question: 'Whats the continent where the League of Legends resides called?',
                answer: 'Valoran',
            }
        ]
    },
    RocknRoll: {
        title: 'RocknRoll',
        questions: [
            {
                question: 'Who is famous for burning his guitar?',
                answer:
                    'Jimi Hendrix',
            }
        ]
    }
};

export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
        return results === null ? initialData() : JSON.parse(results)
    });
}

export function createDeck(deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
}

export function addQuestionForDeck({card, deckName}) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        let decks = JSON.parse(result);

        let newQuestions = JSON.parse(JSON.stringify(decks[deckName].questions));
        newQuestions[newQuestions.length] = card;

        const value = JSON.stringify({
            [deckName]: {title: deckName, questions: newQuestions},
        });

        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, value);
    });
}

export function initialData() {
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    return data;
}
