import { useSyncExternalStore } from 'react';
import { store } from './store';

/** Re-renders the calling component whenever the store's data changes. */
export function useStoreVersion(): number {
  return useSyncExternalStore(store.subscribe, store.getVersion);
}
