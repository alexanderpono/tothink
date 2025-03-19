import { SimFactory } from './sim/SimFactory';
import { Action, sim } from './sim/simReducer';

console.log('main!');

const step1: Action[] = [
    sim.putIntoSlot('owner', 'rsTrigger.in.S', 1),
    sim.putIntoSlot('owner', 'rsTrigger.in.R', 1),
    sim.putIntoSlot('owner', 'andNot1.out.out', 1),
    sim.runSwitcher(),
    sim.incStep()
];

const step2: Action[] = [sim.recalcObjects(), sim.runSwitcher(), sim.incStep()];
const step3: Action[] = [sim.recalcObjects(), sim.runSwitcher(), sim.incStep()];
const step4: Action[] = [sim.recalcObjects(), sim.runSwitcher(), sim.incStep()];
const step5: Action[] = [sim.recalcObjects(), sim.runSwitcher(), sim.incStep()];

const simActions: Action[] = [...step1, ...step2, ...step3, ...step4, ...step5];

const app = SimFactory.create().createAppController();
app.go(simActions.slice(0, 4));
