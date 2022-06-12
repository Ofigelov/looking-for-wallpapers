import React, { useEffect, useState } from 'react';
import { usePredictiveSearch } from 'general/js/use-predictive-search';
import { popupDefaultProps } from 'general/js/popup-config';
import { Instance } from 'tippy.js';
import Tippy from '@tippyjs/react';
import { Spinner } from 'components/spinner/js/spinner';

type IPredictiveSearchItem = {
    id: number;
    name: string;
    count: number;
    type: number;
    ambiguous: boolean;
};

export const KonaPredictiveSearch = ({
    endpoint,
    value,
    children,
    choose,
}: IKonaPredictiveSearch): JSX.Element => {
    const [instance, setInstance] = useState<Instance | null>(null);
    const [predictiveItems, isLoading, fetchPredictive] =
        usePredictiveSearch<IPredictiveSearchItem>(`${endpoint}?name=$text$&type=&order=count`);
    const onInit = (instance: Instance) => setInstance(instance);
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
                <div className="predictive">
                    <Spinner isActive={isLoading} size={20} />
                    <ul className="predictive__list">
                        {predictiveItems.map((item) => (
                            <li className="predictive__item" key={item.id}>
                                <button
                                    className="predictive__btn"
                                    type="button"
                                    onClick={() => {
                                        instance?.hide();
                                        choose(item.name);
                                    }}
                                    title={item.count + ' times'}
                                >
                                    {item.name} - {item.count}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        >
            {children}
        </Tippy>
    );
};

interface IKonaPredictiveSearch {
    endpoint: string;
    value: string;
    children: JSX.Element;
    choose: (text: string) => void;
}
