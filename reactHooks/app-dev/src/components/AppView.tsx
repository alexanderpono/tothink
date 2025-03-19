import React from 'react';
import styles from './AppView.scss';

interface AppViewProps {}

export const AppView: React.FC<AppViewProps> = ({}) => {
    return (
        <div>
            <div className="tables">
                <section>
                    <p>input file</p>
                    <pre className="inputString">{' 111 '}</pre>
                </section>

                <section>
                    <p>limiters(l)</p>
                    <table className="lexTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Lexem</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={`limiters-${1}`}>
                                <td>{1 + 1}</td>
                                <td>{1}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};
