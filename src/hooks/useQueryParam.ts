import { useCallback, useMemo } from 'react';
import { NavigateOptions, useSearchParams } from 'react-router-dom';
let JSURL = require("jsurl");


export function useQueryParam<T>(
  key: string
): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);

  let value = useMemo(() => JSURL.parse(paramValue), [paramValue]);

  let setValue = useCallback(
    (newValue: T, options?: NavigateOptions) => {
      let newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, JSURL.stringify(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}

 