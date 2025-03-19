import { AppStateManager } from './AppStateManager';

export class AppFactory {
    private stateManagers: AppStateManager[] = [];

    getStateManager = (appId: string) => {
        if (!this.stateManagers[appId]) {
            this.stateManagers[appId] = new AppStateManager();
        }
        return this.stateManagers[appId];
    };

    static create() {
        return new AppFactory();
    }
}
