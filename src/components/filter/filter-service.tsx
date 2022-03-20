import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import clone from 'lodash/clone';
import {
    AvailableOptions,
    ContextContent,
    IFilterService,
    IFilterServiceState,
    IApiResponse,
} from 'components/filter/types';
import { removeEmptyKeys } from 'general/js/remove-emty-keys';
import { paramsToQuery } from 'general/js/params-to-query';

const api = axios.create({ timeout: 120000 });
let axiosSource = axios.CancelToken.source();

const cancelRequest = (reason = 'user interacted') => {
    axiosSource.cancel(reason);
    axiosSource = axios.CancelToken.source();
};

export const FilterContext = React.createContext({} as ContextContent);

export const FilterService = ({
    children,
    endpoint,
    requiredParams = {},
    initialFilters = {},
    initialItems = [],
    takeFirstFromApi = true,
}: IFilterService): JSX.Element => {
    const [filterState, setState] = useState<IFilterServiceState>({
        isFailedLoading: false,
        isLoading: takeFirstFromApi,
        appliedFilters: initialFilters,
        items: initialItems,
    });
    const { isLoading, appliedFilters, items, isFailedLoading } = filterState;
    const _sendRequest = (
        _options: AvailableOptions,
        ignoreOther?: boolean,
        addResultToExistedItems?: boolean
    ): void => {
        const newFilters = ignoreOther
            ? Object.assign(_options, requiredParams)
            : { ...appliedFilters, ..._options, ...requiredParams };
        const oldFilters = clone(appliedFilters);
        removeEmptyKeys(newFilters);
        setState({
            ...filterState,
            isLoading: true,
            isFailedLoading: false,
            appliedFilters: newFilters,
        });
        api.get(`${endpoint}?${paramsToQuery(newFilters)}`, {
            cancelToken: axiosSource.token,
        })
            .then(({ data }: AxiosResponse<IApiResponse>) => {
                console.log(data);
                setState({
                    ...filterState,
                    items: addResultToExistedItems ? [...items, ...data] : data,
                    isLoading: false,
                    isFailedLoading: false,
                    appliedFilters: newFilters,
                });
            })
            .catch((error: any) => {
                setState({
                    ...filterState,
                    isLoading: false,
                    isFailedLoading: true,
                    appliedFilters: oldFilters,
                });
                console.dir(error);
            });
    };
    const setFilter = (_options: AvailableOptions, addResultToExistedItems = false): void => {
        if (isLoading) cancelRequest();
        if (!_options.currentPage) _options.currentPage = '';
        _sendRequest(_options, false, addResultToExistedItems);
    };
    const clearFilters = (): void => {
        if (isLoading) cancelRequest();
        _sendRequest(requiredParams, true, false);
    };
    useEffect(() => {
        if (takeFirstFromApi) _sendRequest(initialFilters, false, false);
    }, []);
    return (
        <FilterContext.Provider
            value={{
                isLoading,
                isFailedLoading,
                items,
                appliedFilters,
                setFilter,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
