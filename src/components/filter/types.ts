import { ReactNode, HTMLAttributes } from 'react';
import { KonaPost } from 'components/kona-image/types';
import { IObject } from 'general/js/params-to-query';

export interface AvailableOptions extends IObject {
    limit?: number;
    page?: number | string;
    tags?: string[];
}

export type IApiResponse = KonaPost[];

export interface IFilterField {
    name: string;
    placeholder: string;
    defaultValue?: string;
    type?: 'hidden' | 'select';
    options: IFilterOption[];
}

export interface IFilterOption {
    value: string;
    caption: string;
}

export interface IPagination {
    currentPage: number | string;
}

export interface IFilterService {
    children?: ReactNode;
    endpoint: string;
    initialFilters?: AvailableOptions;
    initialItems?: KonaPost[];
    takeFirstFromApi?: boolean;
    requiredParams?: AvailableOptions;
}

export interface IFilterServiceState {
    isLoading: boolean;
    isFailedLoading: boolean;
    appliedFilters: AvailableOptions;
    pagination: IPagination;
    items: KonaPost[];
}

export interface ContextContent extends IFilterServiceState {
    setFilter(options: AvailableOptions, addResultToExistedItems?: boolean): void;
    clearFilters(): void;
}

export interface IFilterRow {
    items: IFilterField[];
    alignLeft?: boolean;
}

export interface INoResult extends HTMLAttributes<HTMLDivElement> {
    text?: string;
    title?: string;
}

export interface IFiltersCardsGrid extends HTMLAttributes<HTMLElement> {
    noResultsTitle?: INoResult['title'];
    noResultsMessage?: INoResult['text'];
}

export interface ISimpleFilterBatch {
    service: IFilterService;
    filterRow: IFilterRow;
    filtersCardsGrid?: IFiltersCardsGrid;
}
