export interface AppControllerForScript {
    onDocumentUpdate: () => void;
    storeUndo: (action: string) => void;
    undo: () => void;
    redo: () => void;
    onWinUpdate: () => void;
}

export interface AbstractAction {
    type: string;
}

export enum Stragegy {
    INIT_FROM_APP = 'INIT_FROM_APP',
    INIT_FROM_STORAGE = 'INIT_FROM_STORAGE'
}
