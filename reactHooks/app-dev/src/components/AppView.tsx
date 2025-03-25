import React, { ReactElement } from 'react';
import styles from './AppView.scss';
import { FuncUseState } from './FuncUseState';
import { Show } from '@src/app.types';
import cn from 'classnames';
import { ShowSource } from './ShowSource';
import FuncUseStateSrc from '!!raw-loader!./FuncUseState.tsx';
import { FuncDontUseMemo, FuncUseMemo } from './FuncUseMemo';
import FuncUseMemoSrc from '!!raw-loader!./FuncUseMemo.tsx';
import { FuncUseMemoWrong } from './FuncUseMemoWrong';
import FuncUseMemoWrongSrc from '!!raw-loader!./FuncUseMemoWrong.tsx';
import { FuncUseMemoOk1 } from './FuncUseMemoOk1';
import FuncUseMemoOk1Src from '!!raw-loader!./FuncUseMemoOk1.tsx';
import { FuncUseMemoOk2 } from './FuncUseMemoOk2';
import FuncUseMemoOk2Src from '!!raw-loader!./FuncUseMemoOk2.tsx';

interface AppViewProps {
    show: Show;
}

const renderApp = (component: ReactElement, text: string): React.ReactElement => {
    return (
        <>
            <section className="app">{component}</section>
            <section>
                <ShowSource text={text} />
            </section>
        </>
    );
};

export const AppView: React.FC<AppViewProps> = ({ show }) => {
    return (
        <div>
            <div className={cn('tables', styles.tbl)}>
                {(show & Show.funcUseState) > 0 && renderApp(<FuncUseState />, FuncUseStateSrc)}
                {(show & Show.funcUseMemo) > 0 &&
                    renderApp(
                        <>
                            <div>
                                <FuncDontUseMemo />
                            </div>
                            <div>
                                <FuncUseMemo />
                            </div>
                        </>,

                        FuncUseMemoSrc
                    )}
                {(show & Show.funcUseMemoWrong) > 0 &&
                    renderApp(<FuncUseMemoWrong />, FuncUseMemoWrongSrc)}
                {(show & Show.funcUseMemoOk1) > 0 &&
                    renderApp(<FuncUseMemoOk1 />, FuncUseMemoOk1Src)}
                {(show & Show.funcUseMemoOk2) > 0 &&
                    renderApp(<FuncUseMemoOk2 />, FuncUseMemoOk2Src)}
            </div>
        </div>
    );
};
