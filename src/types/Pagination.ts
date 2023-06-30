export interface IPagination<Entity> {
  items: Entity[];
  meta: IPaginationMetadata;
}

export interface IPaginationMetadata {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemCount: number;
}
