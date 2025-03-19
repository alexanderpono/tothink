import { store } from '@src/store/store';
import { app } from '@src/store/appReducer';

export class AppStateManager {
    private stepNo: number = 0;

    getStepNo = () => this.stepNo;

    setStepNo = (stepNo: number) => (this.stepNo = stepNo);

    getAppState = () => {
        return {
            stepNo: this.getStepNo()
        };
    };

    mirrorState = () => {
        store.dispatch(app.setSimState(this.getAppState()));
    };
}
