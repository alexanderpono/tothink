import { DocumentJSON } from '@src/DocumentModel';

const DOC = 'doc';
const HISTORY_DOC = 'historyDoc';
const HISTORY = 'history';
const UNDONE_INDEX = 'undoneIndex';
const WIN = 'win';

export class AppStorage {
    setDocument = (doc: DocumentJSON) => {
        localStorage.setItem(DOC, JSON.stringify(doc));
    };

    getDocument = () => localStorage.getItem(DOC);

    getHistoryDoc = () => localStorage.getItem(HISTORY_DOC);
    setHistoryDoc = (doc: string) => {
        localStorage.setItem(HISTORY_DOC, doc);
    };

    getHistory = () => localStorage.getItem(HISTORY);
    setHistory = (history: string) => {
        localStorage.setItem(HISTORY, history);
    };

    getUndoneIndex = () => localStorage.getItem(UNDONE_INDEX);
    setUndoneIndex = (index: string) => {
        localStorage.setItem(UNDONE_INDEX, index);
    };

    getWin = () => localStorage.getItem(WIN);
    setWin = (win: string) => {
        localStorage.setItem(WIN, win);
    };
}
