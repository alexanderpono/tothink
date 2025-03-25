import React from 'react';

interface AtomProps {
    num: number;
}
export const Atom: React.FC<AtomProps> = ({ num }) => {
    const [clickedTimes, setClickedTimes] = React.useState(0);

    const onBtClick = () => {
        setClickedTimes(clickedTimes + 1);
    };

    const result = React.useMemo(() => {
        let result = 0;
        for (let i = 0; i < num; i++) {
            result = (i * 2) / 3 + 2;
        }
        return result;
    }, [num]);
    return (
        <div>
            {num} myResult={result} <br />
            <button onClick={onBtClick}>I am clicked {clickedTimes} times</button>
        </div>
    );
};
const equalProps = (prev: AtomProps, next: AtomProps) => prev.num === next.num;
export const Memoised = React.memo(Atom, equalProps);

export const FuncUseMemoOk1: React.FC<{}> = () => {
    return (
        <div>
            <Memoised num={90000000} />
        </div>
    );
};
