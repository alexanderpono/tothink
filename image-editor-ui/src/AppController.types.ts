export interface AppControllerForScript {
    onDocumentUpdate: () => void;
    storeUndo: (action: string) => void;
    undo: () => void;
    redo: () => void;
}

export interface AbstractAction {
    type: string;
}
