import roc from './roc';
import vectron from './vectron';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const adapters: Record<string, PosAdapter<any>> = {
  roc,
  vectron,
};

export default adapters;
