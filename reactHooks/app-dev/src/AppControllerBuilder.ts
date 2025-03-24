import { Show } from './app.types';

export class AppControllerBuilder {
    target: string = '';
    controlsTarget: string = '';
    showControls: boolean = false;
    maxCalcStep: number = 0;
    endCalcStep: number = 0;
    show: Show = Show.default;

    setTarget = (target: string) => {
        this.target = target;
        return this;
    };
    setControlsTarget = (controlsTarget: string) => {
        this.controlsTarget = controlsTarget;
        return this;
    };
    setShowControls = (showControls: boolean) => {
        this.showControls = showControls;
        return this;
    };
    setMaxCalcStep = (maxCalcStep: number) => {
        this.maxCalcStep = maxCalcStep;
        return this;
    };
    setEndCalcStep = (endCalcStep: number) => {
        this.endCalcStep = endCalcStep;
        return this;
    };
    setShow = (show: Show) => {
        this.show = show;
        return this;
    };
}
