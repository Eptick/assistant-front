export type Sort = {
    empty: boolean,
    unsorted: boolean,
    sorted: boolean,
};

export type Pageable = {
    sort: Sort,
    offset: number,
    pageNumbe: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean,
};

export type Page = {
    content: any[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    pageable: Pageable,
    size: number,
    sort: Sort,
    totalElements: number,
    totalPages: number,
}

export type PageRequest = {
    size: number,
    page: number,
    offset: number,
};