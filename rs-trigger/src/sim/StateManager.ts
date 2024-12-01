import {
    AndNotElementState,
    ConnectorState,
    defaultAndNotElementState,
    defaultConnectorState,
    defaultRSTriggerState,
    RSTriggerState
} from './sim.types';

export class StateManager {
    private rsTriggerState: RSTriggerState = defaultRSTriggerState;
    private andNot1State: AndNotElementState = defaultAndNotElementState;
    private andNot2State: AndNotElementState = defaultAndNotElementState;
    private out1To2State: ConnectorState = defaultConnectorState;
    private out2To1State: ConnectorState = defaultConnectorState;

    getRSTriggerState = (): RSTriggerState => this.rsTriggerState;
    getAndNot1State = (): AndNotElementState => this.andNot1State;
    getAndNot2State = (): AndNotElementState => this.andNot2State;
    getOut1To2State = (): ConnectorState => this.out1To2State;
    getOut2To1State = (): ConnectorState => this.out2To1State;

    setRSTriggerState = (newState: RSTriggerState) => (this.rsTriggerState = newState);
    setAndNot1State = (newState: AndNotElementState) => (this.andNot1State = newState);
    setAndNot2State = (newState: AndNotElementState) => (this.andNot2State = newState);
    setOut1To2State = (newState: ConnectorState) => (this.out1To2State = newState);
    setOut2To1State = (newState: ConnectorState) => (this.out2To1State = newState);

    getObjectState = (objectId: string) => {
        switch (objectId) {
            case 'rsTrigger':
                return this.getRSTriggerState();
            case 'andNot1':
                return this.getAndNot1State();
            case 'andNot2':
                return this.getAndNot2State();
            case 'out1To2':
                return this.getOut1To2State();
            case 'out2To1':
                return this.getOut2To1State();
            default:
                console.error('StateManager::getObjectState(): unknown objectId=', objectId);
                return null;
        }
    };

    setSlotValue = (objectId: string, containerName: string, slotName: string, value: number) => {
        const objectState = this.getObjectState(objectId);
        if (objectState === null) {
            console.error(`object with name "${objectId}" is not found`);
            return false;
        }

        if (typeof objectState[containerName] === 'undefined') {
            console.error(`${objectId}.${containerName} is not found`);
            return false;
        }

        if (typeof objectState[containerName][slotName] === 'undefined') {
            console.error(`${objectId}.${containerName}.${slotName} is not found`);
            return;
        }

        const newState = {
            ...objectState,
            [containerName]: { ...objectState[containerName], [slotName]: value }
        };
        this.setObjectState(objectId, newState);
    };

    setObjectState = (objectId: string, newState) => {
        switch (objectId) {
            case 'rsTrigger':
                return this.setRSTriggerState(newState);
            case 'andNot1':
                return this.setAndNot1State(newState);
            case 'andNot2':
                return this.setAndNot2State(newState);
            case 'out1To2':
                return this.setOut1To2State(newState);
            case 'out2To1':
                return this.setOut2To1State(newState);
            default:
                console.error('StateManager::setObjectState(): unknown objectId=', objectId);
                return null;
        }
    };

    getAppState = () => {
        return {
            rsTrigger: this.getRSTriggerState(),
            andNot1: this.getAndNot1State(),
            andNot2: this.getAndNot2State(),
            out1To2: this.getOut1To2State(),
            out2To1: this.getOut2To1State()
        };
    };
}
