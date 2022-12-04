import {
  FC,
  useState,
  useContext,
  useCallback,
  createContext,
  PropsWithChildren,
} from "react";

export interface Link {
  cacheId?: string;
  displayLink: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  htmlSnippet: string;
  htmlTitle: string;
  kind: string;
  link: string;
  snippet: string;
  title: string;
}

interface FetchDataProps {
  searchText: string;
  start: number;
  withReset?: boolean;
}

interface ILinkContext {
  data: Link[] | null;
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  fetchData: (props: FetchDataProps) => Promise<void>;
}

const URL = `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_GOOGLE_KEY}&cx=${process.env.REACT_APP_ENGINE_ID}&q=`;

export const LinksContext = createContext<ILinkContext>({
  data: null,
  error: null,
  hasMore: true,
  isLoading: false,
  fetchData: async () => {},
});

export const useLinksContext = () => useContext(LinksContext);

const LinksContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<ILinkContext["data"]>(null);
  const [isLoading, setIsLoading] = useState<ILinkContext["isLoading"]>(false);
  const [error, setError] = useState<ILinkContext["error"]>(null);
  const [hasMore, setHasMore] = useState<ILinkContext["hasMore"]>(true);

  const fetchData = useCallback(
    async ({ searchText, start, withReset }: FetchDataProps) => {
      if (searchText.length < 3) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${URL}${searchText}&start=${start}`);
        const searchData = await response.json();
        if (!searchData.items) {
          setHasMore(false);
        } else {
          if (withReset) {
            setData(searchData.items);
          } else {
            setData((_data) => {
              return [...(_data || []), ...searchData.items] || [];
            });
          }
        }
      } catch (_error) {
        setError(_error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <LinksContext.Provider
      value={{ data, isLoading, error, fetchData, hasMore }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export default LinksContextProvider;
