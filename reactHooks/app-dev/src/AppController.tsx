import React from 'react';
import { render } from 'react-dom';
import { AppStateManager } from './AppStateManager';
import { AppControllerBuilder } from './AppControllerBuilder';
import { AppControls } from './components/AppControls';
import { AppView } from './components/AppView';

export class AppController {
    constructor(private builder: AppControllerBuilder, private stateManager: AppStateManager) {}

    run = () => {
        this.stateManager.setStepNo(this.builder.maxCalcStep);
        this.reRun();
        this.updateUI();
    };

    renderControls = () => {
        const target = document.getElementById(this.builder.controlsTarget);
        if (!target) {
            console.error('target not found:', this.builder.controlsTarget);
            return;
        }
        render(<AppControls ctrl={this} maxCalcStep={this.stateManager.getStepNo()} />, target);
        return this;
    };

    reRun = () => {};

    onBtToStartClick = () => {
        this.stateManager.setStepNo(0);
        this.reRun();
        this.updateUI();
    };

    updateUI = () => {
        if (this.builder.showControls) {
            this.renderControls();
        }
        this.stateManager.mirrorState();
        this.render();
    };

    onBtPrevClick = () => {
        this.stateManager.setStepNo(this.stateManager.getStepNo() - 1);
        this.reRun();
        this.updateUI();
    };

    onBtNextClick = () => {
        this.stateManager.setStepNo(this.stateManager.getStepNo() + 1);
        this.reRun();
        this.updateUI();
    };

    onBtNextJumpClick = () => {
        this.stateManager.setStepNo(this.stateManager.getStepNo() + 10);
        this.reRun();
        this.updateUI();
    };

    onBtToFinishClick = () => {
        this.stateManager.setStepNo(this.builder.endCalcStep);
        this.reRun();
        this.updateUI();
    };

    onMaxStepChange = (evt) => {
        this.stateManager.setStepNo(parseInt(evt.target.value));
        this.reRun();
        this.updateUI();
    };

    render = () => {
        const target = document.getElementById(this.builder.target);
        if (!target) {
            console.error('target not found:', this.builder.target);
            return;
        }
        render(<AppView show={this.builder.show} />, target);
        return this;
    };
}
