import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    renderTrackVerticalDefault,
    renderTrackHorizontalDefault,
    renderThumbVerticalDefault,
    renderThumbHorizontalDefault
} from 'react-custom-scrollbars/lib/Scrollbars/defaultRenderElements';
import cn from 'classnames';
import styles from './Scroll.scss';

interface ScrollProps {
    children: React.ReactNode;
    setValues?;
    onScroll?;
    onUpdate?;
    startTop?: number;
}

export interface OnUpdateInfo {
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
}

export const Scroll: React.FC<ScrollProps> = (props) => {
    const elRef = React.useRef(null);

    React.useEffect(() => {
        if (props?.startTop || props?.startTop === 0) {
            elRef.current.scrollTop(props?.startTop);
        }
    }, [props?.startTop]);

    return (
        <div className={styles.wrap}>
            <Scrollbars
                ref={elRef}
                renderTrackVertical={(props) =>
                    renderTrackVerticalDefault({
                        ...props,
                        className: cn(props.classNames, styles.trackStyle)
                    })
                }
                renderTrackHorizontal={(props) =>
                    renderTrackHorizontalDefault({
                        ...props,
                        className: cn(props.classNames, styles.trackStyle)
                    })
                }
                renderThumbVertical={(props) =>
                    renderThumbVerticalDefault({
                        ...props,
                        className: cn(props.classNames, styles.thumbStyle)
                    })
                }
                renderThumbHorizontal={(props) =>
                    renderThumbHorizontalDefault({
                        ...props,
                        className: cn(props.classNames, styles.thumbStyle)
                    })
                }
                // hideTrachWhenNotNeeded
                {...props}
            >
                {props.children}
            </Scrollbars>
        </div>
    );
};
