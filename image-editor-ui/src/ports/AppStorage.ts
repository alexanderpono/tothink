import { DocumentJSON } from '@src/DocumentModel';

export class AppStorage {
    setDocument = (doc: DocumentJSON) => {
        localStorage.setItem('doc', JSON.stringify(doc));
    };

    getDocument = () => localStorage.getItem('doc');
}
