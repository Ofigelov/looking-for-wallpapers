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
import { pushNewErrorNotification } from 'components/notifications/notification-store';

const api = axios.create({ timeout: 120000 });
let axiosSource = axios.CancelToken.source();

const cancelRequest = (reason = 'user interacted') => {
    axiosSource.cancel(reason);
    axiosSource = axios.CancelToken.source();
};

export const FilterContext = React.createContext({} as ContextContent);

const PAGE_RESET = { page: undefined };

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
        pagination: {
            currentPage: 1,
        },
    });
    const { isLoading, appliedFilters, items, isFailedLoading, pagination } = filterState;
    const _sendRequest = (
        _options: AvailableOptions,
        ignoreOther?: boolean,
        addResultToExistedItems?: boolean
    ): void => {
        const newFilters = ignoreOther
            ? Object.assign(_options, requiredParams)
            : { ...appliedFilters, ...PAGE_RESET, ..._options, ...requiredParams };
        const oldFilters = clone(appliedFilters);
        removeEmptyKeys(newFilters);
        if (newFilters.tags && newFilters.tags.length > 4) {
            pushNewErrorNotification("Filters API can't work with more than 4 tags");
            return;
        }
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
                setState({
                    ...filterState,
                    items: addResultToExistedItems ? [...items, ...data] : data,
                    isLoading: false,
                    isFailedLoading: false,
                    pagination: {
                        currentPage: addResultToExistedItems
                            ? newFilters.page || pagination.currentPage
                            : 1,
                    },
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
                pagination,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
