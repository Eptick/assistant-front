import { LazyLoadEvent } from "primeng/api";
import { PageRequest } from "../types/spring/Page";

/*
export interface LazyLoadEvent {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: {
        [s: string]: FilterMetadata;
    };
    globalFilter?: any;
} */

export default function(data: LazyLoadEvent) {
    return {
        
    } as PageRequest;
}