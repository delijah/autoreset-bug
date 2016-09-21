import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import styles from './../../styles/modules/app.sass';

class App extends React.Component {
    render() {
        return (
            <div className={styles.app}>
                <header className={styles.header}>
                    <h1 className={styles.title}>autoreset-bug</h1>
                </header>

                <main className={styles.contents}>
                    <p>Hello World!</p>
                </main>
            </div>
        );
    }
}

const render = container => {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>
    , container);
};

export { render };
