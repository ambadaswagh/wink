import { useEffect } from 'react';

const useScrollTop = () => {
  useEffect(() => void window.scrollTo({ top: 0 }), []);
};

export default useScrollTop;
