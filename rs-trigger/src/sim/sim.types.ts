export enum Status {
    TRANSITION = 'TRANSITION',
    STABLE = 'STABLE'
}

export interface RSTriggerState {
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

export interface AndNotElementState {
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

export interface ConnectorState {
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
