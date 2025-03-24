import { Show } from './app.types';
import { AppController } from './AppController';
import { AppControllerBuilder } from './AppControllerBuilder';
import { AppFactory } from './AppFactory';

console.log('main!');

const factory = AppFactory.create();

interface AppConfig {
    name: string;
    target: string;
    controlsTarget: string;
    showControls: boolean;
    maxCalcStep: number;
    endCalcStep: number;
    show: Show;
}

const defaultAppConfig: AppConfig = {
    name: '',
    target: '',
    controlsTarget: '',
    showControls: false,
    maxCalcStep: 0,
    endCalcStep: 1000,
    show: Show.default
};

class AppRunner {
    private slides: AppController[] = [];

    run = (config: AppConfig) => {
        const stateManager = factory.getStateManager(config.name);
        stateManager.mirrorState();

        this.slides[config.name] = new AppController(
            new AppControllerBuilder()
                .setTarget(config.target)
                .setControlsTarget(config.controlsTarget)
                .setShowControls(config.showControls)
                .setShow(config.show)
                .setEndCalcStep(config.endCalcStep),
            stateManager
        );

        this.slides[config.name].run();
    };
}

const app = new AppRunner();
window['app'] = app;
if (window['demo'] === true) {
    console.log('demo === true!');
} else {
    console.log('demo !== true!');
    app.run({
        ...defaultAppConfig,
        name: 'rs',
        target: 'viewport',
        controlsTarget: 'controls',
        showControls: true,
        maxCalcStep: 16,
        endCalcStep: 16,
        show: Show.funcUseState
    });
}
