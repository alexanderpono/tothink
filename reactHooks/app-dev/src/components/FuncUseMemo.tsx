import React from 'react';

interface AtomProps {
    num: number;
}
export const Atom: React.FC<AtomProps> = ({ num }) => {
    let result = 0;
    for (let i = 0; i < num; i++) {
        result = (i * 2) / 3 + 2;
    }
    return (
        <div>
            {num} myResult={result} <br />
        </div>
    );
};
const equalProps = (prev: AtomProps, next: AtomProps) => prev.num === next.num;
export const Memoised = React.memo(Atom, equalProps);

export const FuncDontUseMemo: React.FC<{}> = () => {
    const [clickedTimes, setClickedTimes] = React.useState(0);

    const onBtClick = () => {
        setClickedTimes(clickedTimes + 1);
    };

    return (
        <div>
            <div>
                <Atom num={90000000} />
            </div>
            <div>
                <Atom num={10000000} />
            </div>
            <button onClick={onBtClick}>I am clicked {clickedTimes} times</button>
        </div>
    );
};
export const FuncUseMemo: React.FC<{}> = () => {
    const [clickedTimes, setClickedTimes] = React.useState(0);

    const onBtClick = () => {
        setClickedTimes(clickedTimes + 1);
    };

    return (
        <div>
            <div>
                <Memoised num={90000000} />
            </div>
            <div>
                <Memoised num={10000000} />
            </div>
            <button onClick={onBtClick}>I am clicked {clickedTimes} times</button>
        </div>
    );
};
