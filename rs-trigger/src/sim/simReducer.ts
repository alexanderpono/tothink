export enum SimEvent {
    DEFAULT = '',
    PUT_INTO_SLOT = 'SIM/PUT_INTO_SLOT',
    RUN_SWITCHER = 'SIM/RUN_SWITCHER'
}

export interface Action {
    type: SimEvent;
}

export interface PutIntoSlotAction {
    type: SimEvent.PUT_INTO_SLOT;
    payload: {
        source: string;
        target: string;
        value: number;
    };
}

export interface RunSwitcherAction {
    type: SimEvent.RUN_SWITCHER;
    payload: {};
}

export const sim = {
    putIntoSlot: (source: string, target: string, value: number): PutIntoSlotAction => ({
        type: SimEvent.PUT_INTO_SLOT,
        payload: { source, target, value }
    }),
    runSwitcher: (): RunSwitcherAction => ({
        type: SimEvent.RUN_SWITCHER,
        payload: {}
    })
};
