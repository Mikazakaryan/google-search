import { useCallback, useEffect, useState } from "react";

export const useAppScroll = ({} = {}) => {
  const [isOnBottom, setIsOnBottom] = useState(false);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setIsOnBottom(true);
    } else {
      setIsOnBottom(false);
    }
  }, [setIsOnBottom]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return { isOnBottom };
};
