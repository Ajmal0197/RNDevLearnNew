import { useCallback, useState } from 'react';

const usePullToRefresh = ({ onRefreshFunction }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshHandler = useCallback(async () => {
    try {
      setRefreshing(true);
      await onRefreshFunction();
    } finally {
      setRefreshing(false);
    }
  }, [onRefreshFunction]);

  return { refreshing, onRefreshHandler };
};

export default usePullToRefresh;

/*
The usePullToRefresh hook manages the pull-to-refresh functionality.
It uses the useState hook to track the refreshing state.
onRefreshHandler is a callback function that triggers the refresh, sets the refreshing state, calls the provided function, and then resets the state.
*/
