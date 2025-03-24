import React from 'react';
import styles from './AppView.scss';
import { FuncUseState } from './FuncUseState';
import { Show } from '@src/app.types';
import cn from 'classnames';
import { ShowSource } from './ShowSource';
import FuncUseStateSrc from '!!raw-loader!./FuncUseState.tsx';

interface AppViewProps {
    show: Show;
}

export const AppView: React.FC<AppViewProps> = ({ show }) => {
    return (
        <div>
            <div className={cn('tables', styles.tbl)}>
                {(show & Show.funcUseState) > 0 && (
                    <>
                        <section>
                            <FuncUseState />
                        </section>
                        <section>
                            <ShowSource text={FuncUseStateSrc} />
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};
