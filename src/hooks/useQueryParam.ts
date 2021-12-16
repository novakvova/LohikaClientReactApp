import qs, { ParsedQs } from "qs";
import { useCallback, useMemo } from 'react';
import { NavigateOptions, useSearchParams } from 'react-router-dom';

function useQueryParam<T>( key: string): [ParsedQs | undefined, (newQuery: T, options?: NavigateOptions) => void] {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);

  let value = useMemo(() => qs.parse(paramValue as string), [paramValue]);

  let setValue = useCallback(
    (newValue: T, options?: NavigateOptions) => {
      let newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, qs.stringify(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}

export default useQueryParam;