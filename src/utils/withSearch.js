import { useSearchParams } from "react-router-dom";
import { createElement } from "react";

/**
 * HOC that injects search params hooks (useSearchParams) as props
 * Allows class components to access and update URL query parameters
 */
export default function withSearch(Component) {
  return (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return createElement(Component, {
      ...props,
      searchParams,
      setSearchParams,
    });
  };
}
