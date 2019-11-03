export interface Pagination {
  limit?: number | null;
  offset?: number | null;
}

export interface PaginatedData<T> {
  total: number;
  data: T[];
}
