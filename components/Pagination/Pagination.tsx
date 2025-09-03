"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      previousLabel="←"
      nextLabel="→"
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
    />
  );
}
