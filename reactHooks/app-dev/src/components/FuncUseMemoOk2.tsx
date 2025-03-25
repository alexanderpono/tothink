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

export const FuncUseMemoOk2: React.FC<{}> = () => {
    return (
        <div>
            <Atom num={90000000} />
        </div>
    );
};
