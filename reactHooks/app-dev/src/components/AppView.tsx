import React from 'react';
import styles from './AppView.scss';
import { FuncUseState } from './FuncUseState';
import { Show } from '@src/app.types';
import cn from 'classnames';
import { ShowSource } from './ShowSource';
import FuncUseStateSrc from '!!raw-loader!./FuncUseState.tsx';
import { FuncDontUseMemo, FuncUseMemo } from './FuncUseMemo';
import FuncUseMemoSrc from '!!raw-loader!./FuncUseMemo.tsx';

interface AppViewProps {
    show: Show;
}

export const AppView: React.FC<AppViewProps> = ({ show }) => {
    return (
        <div>
            <div className={cn('tables', styles.tbl)}>
                {(show & Show.funcUseState) > 0 && (
                    <>
                        <section className="app">
                            <FuncUseState />
                        </section>
                        <section>
                            <ShowSource text={FuncUseStateSrc} />
                        </section>
                    </>
                )}
                {(show & Show.funcUseMemo) > 0 && (
                    <>
                        <section className="app">
                            <div>
                                <FuncDontUseMemo />
                            </div>
                            <div>
                                <FuncUseMemo />
                            </div>
                        </section>
                        <section>
                            <ShowSource text={FuncUseMemoSrc} />
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};
