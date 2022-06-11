import React from 'react';
import { App } from './App';
import { render, screen } from '@testing-library/react';

describe('App', () => {
    it('It renders "App!"', () => {
        render(<App />);
        expect(screen.getByText('App!')).toBeInTheDocument();
    });
});
