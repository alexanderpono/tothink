import { SimFactory } from './sim/SimFactory';
import { Action, sim } from './sim/simReducer';

console.log('main!');

const step1: Action[] = [
    sim.putIntoSlot('owner', 'rsTrigger.in.S', 1),
    sim.putIntoSlot('owner', 'rsTrigger.in.R', 1),
    sim.putIntoSlot('owner', 'andNot1.out.out', 0),
    sim.runSwitcher()
];

const step2: Action[] = [sim.recalcObjects(), sim.runSwitcher()];

const simActions: Action[] = [...step1, ...step2];

const app = SimFactory.create().createAppController();
app.go(simActions);
