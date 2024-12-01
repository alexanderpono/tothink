import { SimFactory } from './sim/SimFactory';
import { Action, sim } from './sim/simReducer';

console.log('main!');

const simActions: Action[] = [
    sim.putIntoSlot('owner', 'rsTrigger.in.S', 1),
    sim.putIntoSlot('owner', 'rsTrigger.in.R', 1),
    sim.putIntoSlot('owner', 'andNot1.out.out', 0)
    // sim.runSwitcher()
];

const app = SimFactory.create().createAppController();
app.go(simActions);

interface ConnectionInfo {
    from: string;
    to: string;
}
const switching: ConnectionInfo[] = [
    { from: 'rsTrigger.in.S', to: 'andNot1.in.A' },
    { from: 'rsTrigger.in.R', to: 'andNot2.in.B' },
    { from: 'andNot1.out.out', to: 'rsTrigger.out.Q' },
    { from: 'andNot2.out.out', to: 'rsTrigger.out.notQ' },
    { from: 'andNot1.out.out', to: 'andNot2.in.A' },
    { from: 'andNot2.out.out', to: 'andNot1.in.B' }
];
