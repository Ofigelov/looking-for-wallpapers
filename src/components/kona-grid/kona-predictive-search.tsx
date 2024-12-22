import { ReactNode, useEffect, useState } from "react";
import { usePredictiveSearch } from "../../general/js/use-predictive-search";
import { popupDefaultProps } from "../../general/js/popup-config";
import Tippy from "@tippyjs/react";
import { Spinner } from "../spinner/spinner";
import styles from "./predictive.module.scss";

type IPredictiveSearchItem = {
  id: number;
  name: string;
  count: number;
  type: number;
  ambiguous: boolean;
};

type IKonaPredictiveSearch = {
  endpoint: string;
  value: string;
  children?: ReactNode;
  choose: (text: string) => void;
};

type TippyInstance = {
  state: {
    isShown: boolean;
  };
  show: () => void;
  hide: () => void;
};

export const KonaPredictiveSearch = ({
  endpoint,
  value,
  children,
  choose,
}: IKonaPredictiveSearch) => {
  const [instance, setInstance] = useState<TippyInstance | null>(null);
  const [predictiveItems, isLoading, fetchPredictive] =
    usePredictiveSearch<IPredictiveSearchItem>(
      `${endpoint}?name=$text$&type=&order=count`,
    );
  const onInit = (instance: TippyInstance) => setInstance(instance);
  useEffect(() => {
    if (value) fetchPredictive(value);

    if (value && instance && !instance.state.isShown) {
      instance.show();
      return;
    }

    if (!value && instance && instance.state.isShown) {
      instance.hide();
    }
  }, [value]);
  return (
    <Tippy
      {...popupDefaultProps}
      duration={[250, 0]}
      offset={[0, 0]}
      trigger="manual"
      maxWidth="100%"
      placement="bottom-start"
      onCreate={onInit}
      content={
        <div className={styles.predictive}>
          <Spinner isActive={isLoading} size={20} />
          <ul className={styles.predictive__list}>
            {predictiveItems.map((item) => (
              <li className={styles.predictive__item} key={item.id}>
                <button
                  className={styles.predictive__btn}
                  type="button"
                  onClick={() => {
                    instance?.hide();
                    choose(item.name);
                  }}
                  title={item.count + " times"}
                >
                  {item.name} - {item.count}
                </button>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <>{children}</>
    </Tippy>
  );
};
