import { ImageBuilder } from './ImageBuilder';
import { StateManager } from './sim/StateManager';
import { SimObject } from './sim/objects/SimObject';
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

export class AppController {
    constructor(
        private stateManager: StateManager,
        private simObjects: Record<string, SimObject>
    ) {}

    go = (simActions: Action[]) => {
        console.log('AppController() this.simObjects=', this.simObjects);
        console.log('AppController() simActions=', simActions);
        this.processSimActions(simActions);
        console.log('AppController() state=', this.stateManager.getAppState());
        this.render();
    };

    processSimActions = (simActions: Action[]) => {
        simActions.forEach((simAction: Action) => this.processSimAction(simAction));
    };

    processSimAction = (action: Action) => {
        switch (action.type) {
            case SimEvent.PUT_INTO_SLOT:
                return this.putIntoSlot(action as PutIntoSlotAction);
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
            color: 'red'
        }).draw(graph);

        graph = new AndNotView({
            ...defaultAndNotViewState,
            x: boxX,
            y: box2Y,
            w: boxW,
            h: boxH,
            showInOut: true,
            color: 'magenta'
        }).draw(graph);

        graph = new OneToTwoView({
            ...defaultConnectorViewState,
            boxX,
            boxY,
            boxW,
            boxH,
            box2Y,
            color: 'green'
        }).draw(graph);

        graph = new TwoToOneView({
            ...defaultConnectorViewState,
            boxX,
            boxY,
            boxW,
            boxH,
            box2Y,
            color: 'blue'
        }).draw(graph);

        graph = new RSInOutView(boxX, boxY, boxW, boxH, box2Y).draw(graph);

        graph.printActions().buildImage();
    };
}
