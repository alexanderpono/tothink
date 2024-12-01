export enum Status {
    TRANSITION = 'TRANSITION',
    STABLE = 'STABLE'
}

export interface ObjectState {
    status: Status;
}
export const defaultObjectState: ObjectState = {
    status: Status.TRANSITION
};
export interface RSTriggerState extends ObjectState {
    in: {
        S: number;
        R: number;
    };
    out: {
        Q: number;
        notQ: number;
    };
    status: Status;
}

export const defaultRSTriggerState: RSTriggerState = {
    in: {
        S: null,
        R: null
    },
    out: {
        Q: null,
        notQ: null
    },
    status: Status.TRANSITION
};

export interface AndNotElementState extends ObjectState {
    in: {
        A: number;
        B: number;
    };
    out: {
        out: number;
    };
    status: Status;
}

export const defaultAndNotElementState: AndNotElementState = {
    in: {
        A: null,
        B: null
    },
    out: {
        out: null
    },
    status: Status.TRANSITION
};

export interface ConnectorState extends ObjectState {
    in: {
        in: number;
    };
    out: {
        out: number;
    };
    status: Status;
}

export const defaultConnectorState: ConnectorState = {
    in: {
        in: null
    },
    out: {
        out: null
    },
    status: Status.TRANSITION
};
