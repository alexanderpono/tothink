declare module '*.png' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '!!raw-loader!*' {
    const contents: string;
    export = contents;
}
