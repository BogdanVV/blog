import type { AppProps } from 'next/app';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import styled, { createGlobalStyle } from 'styled-components';

import { rootReducer } from '../store/reducers';
import { wrapper } from '../store';

const Global = createGlobalStyle`
  * {
    font-family: 'Open Sans', sans-serif;
  }
  
  a {
    text-decoration: none;
  }
  
  body {
    margin: 0;
  }
`;

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <AppWrapper>
            <Global/>
            <Component {...pageProps} />
            {/*<style jsx global>{`*/}
            {/*  body {*/}
            {/*    margin: 0;*/}
            {/*    font-family: 'Open Sans', sans-serif;*/}
            {/*  }*/}

            {/*`}</style>*/}
        </AppWrapper>
    );
}

export default wrapper.withRedux(CustomApp);
