import React from 'react';
import { getValueFromFragment, toFragment } from "./utils/UrlUtils";

export const useSaveToFragment = (state, onChangeState, stateKey) => {
  React.useEffect(() => {
    const handleOnPopState = e => {
      const newValue = getValueFromFragment(stateKey, e.target.location.hash);
      (newValue !== null) && onChangeState(newValue);
    };
    window.addEventListener('popstate', handleOnPopState);

    return () => window.removeEventListener('popstate', handleOnPopState);
  }, [ onChangeState ]);

  React.useEffect(() => {
    const newHistory = { ...window.history.state, [stateKey]: state };
    const newFragment = toFragment(newHistory, window.location.hash);
    if (window.history.state && window.history.state[stateKey] !== state) {
      window.history.pushState(newHistory, '', newFragment);
    } else {
      window.history.replaceState(newHistory, '', newFragment);
    }
  }, [ state ]);
};
