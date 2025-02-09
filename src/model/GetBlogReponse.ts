export interface Author {
    authorId?: number;
    firstName: string;
    lastName: string;
}

export interface Blog {
    blogId?: number;
    author: Author;
    title: string;
    description: string;
    fullBlogText: string;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface GetBlogResponse {
    content: Blog[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
