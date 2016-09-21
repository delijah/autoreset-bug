import { render as renderApp } from './containers/App';

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const hotRenderApp = require('./containers/App').render;

        hotRenderApp(document.querySelectorAll('.appContainer')[0]);
    });
}

renderApp(document.querySelectorAll('.appContainer')[0]);
