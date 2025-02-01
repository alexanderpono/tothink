export interface EditorWindow {
    width: number;
    height: number;
    scrollX: number;
    scrollY: number;
}

export const defaultEditorWindow: EditorWindow = {
    width: 500,
    height: 400,
    scrollX: 100,
    scrollY: 0
};

export interface WinControllerForScript {
    scrollX: (dx: number) => void;
    scrollY: (dy: number) => void;
    setSize: (width: number, height: number) => void;
}
