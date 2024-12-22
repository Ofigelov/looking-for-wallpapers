import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { debounce } from "remeda";

const PREDICTIVE_SEARCH_DEBOUNCE = 200;

export const usePredictiveSearch = <PredictiveItem>(
  predictiveSearchEndpoint: string,
): IUsePredictiveSearch<PredictiveItem> => {
  const [items, setItems] = useState<PredictiveItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  const status = useRef("idle");
  const abortControllerRef = useRef<null | AbortController>(null);
  let isMounted = true;

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const fetchPredictiveSearchItems = useCallback(
    debounce(async (text: string) => {
      if (!isMounted) return;

      if (status.current === "loading") {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
      }

      const url = predictiveSearchEndpoint.replace(/\$text\$/, text);
      setLoading(true);
      try {
        status.current = "loading";
        const response = await axios.get<PredictiveItem[]>(url, {
          signal: abortControllerRef.current?.signal,
        });
        setLoading(false);
        setItems(response.data);
        status.current = "loaded";
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.warn(`Can't fetch predictive search items, url ${url}`);
        }
        status.current = "failed";
        setLoading(false);
      }
    }, PREDICTIVE_SEARCH_DEBOUNCE),
    [setItems],
  );

  return [items, isLoading, fetchPredictiveSearchItems];
};

type IUsePredictiveSearch<PredictiveItem> = [
  PredictiveItem[],
  boolean,
  (text: string) => void,
];
