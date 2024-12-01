import { ImageBuilder } from './ImageBuilder';
import { StateManager } from './sim/StateManager';
import { SimObject } from './sim/objects/SimObject';
import { Status } from './sim/sim.types';
import { Action, PutIntoSlotAction, SimEvent } from './sim/simReducer';
import { AndNotView } from './views/AndNotView';
import { OneToTwoView } from './views/OneToTwoView';
import { RSInOutView } from './views/RSInOutView';
import { TwoToOneView } from './views/TwoToOneView';
import { defaultAndNotViewState, defaultConnectorViewState } from './views/views.types';

const boxW = 60;
const boxH = 100;
const boxX = 100;
const boxY = 80;
const box2Y = 250;

interface ConnectionInfo {
    from: string;
    to: string;
}
const switching: ConnectionInfo[] = [
    { from: 'rsTrigger.in.S', to: 'andNot1.in.A' },
    { from: 'rsTrigger.in.R', to: 'andNot2.in.B' },
    { from: 'andNot1.out.out', to: 'rsTrigger.out.Q' },
    { from: 'andNot2.out.out', to: 'rsTrigger.out.notQ' },
    { from: 'andNot1.out.out', to: 'out1To2.in.in' },
    { from: 'out1To2.out.out', to: 'andNot2.in.A' },
    { from: 'andNot2.out.out', to: 'out2To1.in.in' },
    { from: 'out2To1.out.out', to: 'andNot1.in.B' }
];

export class AppController {
    constructor(
        private stateManager: StateManager,
        private simObjects: Record<string, SimObject>
    ) {}

    go = (simActions: Action[]) => {
        console.log('AppController::go() simActions=', simActions);
        this.processSimActions(simActions);
        console.log('AppController::go() state=', this.stateManager.getAppState());
        this.render();
        this.stateManager.mirrorState();
    };

    processSimActions = (simActions: Action[]) => {
        simActions.forEach((simAction: Action) => this.processSimAction(simAction));
    };

    processSimAction = (action: Action) => {
        switch (action.type) {
            case SimEvent.PUT_INTO_SLOT:
                return this.putIntoSlot(action as PutIntoSlotAction);
            case SimEvent.RUN_SWITCHER:
                return this.runSwitcher();
            case SimEvent.RECALC_OBJECTS:
                return this.recalcObjects();
            case SimEvent.INC_STEP:
                return this.incStep();

            default:
                console.error('processSimAction() unsupported type=', action.type);
        }
    };

    putIntoSlot = (action: PutIntoSlotAction) => {
        const targetParts = action.payload.target.split('.');
        if (targetParts.length !== 3) {
            console.error(
                'action has invalid payload.target: expected X.Y.Z, fact:',
                action.payload.target
            );
            return;
        }

        this.stateManager.setSlotValue(
            targetParts[0],
            targetParts[1],
            targetParts[2],
            action.payload.value
        );
    };

    render = () => {
        const antNot1State = this.stateManager.getAndNot1State();
        const antNot2State = this.stateManager.getAndNot2State();
        const out1To2State = this.stateManager.getOut1To2State();
        const out2To1State = this.stateManager.getOut2To1State();

        let graph = ImageBuilder.create()
            .setDomTarget('UI')
            .setSize(800, 400)
            .createContext()
            .lineColor('black')
            .lineWidth(1)
            .border()
            .font('bold 15px sans-serif');

        graph = new AndNotView({
            ...defaultAndNotViewState,
            x: boxX,
            y: boxY,
            w: boxW,
            h: boxH,
            showInOut: true,
            color: antNot1State.status === Status.STABLE ? 'red' : 'black',
            in1: antNot1State.in.A,
            in2: antNot1State.in.B,
            out: antNot1State.out.out
        }).draw(graph);

        graph = new AndNotView({
            ...defaultAndNotViewState,
            x: boxX,
            y: box2Y,
            w: boxW,
            h: boxH,
            showInOut: true,
            color: antNot2State.status === Status.STABLE ? 'red' : 'black',
            in1: antNot2State.in.A,
            in2: antNot2State.in.B,
            out: antNot2State.out.out
        }).draw(graph);

        graph = new OneToTwoView({
            ...defaultConnectorViewState,
            boxX,
            boxY,
            boxW,
            boxH,
            box2Y,
            color: out1To2State.status === Status.STABLE ? 'red' : 'black'
        }).draw(graph);

        graph = new TwoToOneView({
            ...defaultConnectorViewState,
            boxX,
            boxY,
            boxW,
            boxH,
            box2Y,
            color: out2To1State.status === Status.STABLE ? 'red' : 'black'
        }).draw(graph);

        graph = new RSInOutView(boxX, boxY, boxW, boxH, box2Y).draw(graph);

        graph.printActions().buildImage();
    };

    runSwitcher = () => {
        switching.forEach((pair: ConnectionInfo) => {
            const srcValue = this.stateManager.getVal(pair.from);
            const destValue = this.stateManager.getVal(pair.to);
            if (srcValue !== destValue) {
                const [objId, containerName, fieldName] = pair.to.split('.');
                this.stateManager.setSlotValue(objId, containerName, fieldName, srcValue);
            }
        });
    };

    recalcObjects = () => {
        Object.keys(this.simObjects).forEach((key) => {
            const stepNo = this.stateManager.getStepNo();
            const srcState = this.stateManager.getObjectState(key);
            const newState = this.simObjects[key].recalc(srcState, stepNo);
            if (newState !== srcState) {
                this.stateManager.setObjectState(key, newState);
            }
        });
    };

    incStep = () => {
        this.stateManager.setStepNo(this.stateManager.getStepNo() + 1);
    };
}
