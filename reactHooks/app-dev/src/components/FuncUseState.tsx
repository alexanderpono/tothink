import React from 'react';

export const FuncUseState: React.FC<{}> = () => {
    const [clickedTimes, setClickedTimes] = React.useState(0);

    const onBtClick = () => {
        setClickedTimes(clickedTimes + 1);
    };
    return (
        <div>
            <button onClick={onBtClick}>I am clicked {clickedTimes} times</button>
        </div>
    );
};
