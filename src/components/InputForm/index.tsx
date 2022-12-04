import { useEffect, useMemo, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import { useLinksContext } from "../../contexts/links";
import { useAppScroll } from "../hooks/useScroll";

import "./index.css";

type Item = { name: string; id: string };

const InputForm = () => {
  const { data, isLoading, hasMore, fetchData } = useLinksContext();
  const { isOnBottom } = useAppScroll();

  const [pageStart, setpageStart] = useState(1);
  const [searchText, setSearchText] = useState("");

  const renderItem = (item: Item) => (
    <span key={item.id} className="suggestion-item">
      {item.name}
    </span>
  );

  const handleSelect = (item: Item) => {
    setSearchText(item.name);
    fetchData({ searchText: item.name, start: pageStart, withReset: true });
  };

  const handleSearch = (_searchText: string) => {
    setSearchText(_searchText);
    fetchData({ searchText: _searchText, start: pageStart, withReset: true });
  };

  useEffect(() => {
    if (pageStart !== 1) {
      fetchData({ searchText, start: pageStart });
    }
  }, [pageStart, searchText, fetchData]);

  const items = useMemo(
    () =>
      data?.map((item) => ({
        name: item.title,
        id: `${item.cacheId}-${item.link}`,
      })) || [],
    [data]
  );

  useEffect(() => {
    if (!isLoading && isOnBottom && hasMore) {
      setpageStart((_start) => _start + 10);
    }
  }, [isOnBottom, isLoading, hasMore]);

  return (
    <div className="input-wrapper">
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleSearch}
        formatResult={renderItem}
        onSelect={handleSelect}
        inputDebounce={500}
      />
    </div>
  );
};

export default InputForm;
