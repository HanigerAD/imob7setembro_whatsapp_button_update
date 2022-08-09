import { useEffect } from "react";

export const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
  nextPage,
  prevPage,
}: {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate(pageNum: number): void;
  nextPage(): void;
  prevPage(): void;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {

  }, [totalItems, itemsPerPage]);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className="page-link text-dark"
            type="button"
            onClick={() => prevPage()}
          >
            <i className="fas fa-angle-left"></i>
          </button>
        </li>
        {pageNumbers.map((num) => (
          <li
            className={`page-item ${currentPage == num ? "active" : ""}`}
            key={num}
          >
            <button
              className={`page-link ${currentPage == num ? "bg-dark" : "text-dark"}`}
              type="button"
              onClick={() => paginate(num)}
            >
              {num}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link text-dark"
            type="button"
            onClick={() => nextPage()}
          >
            <i className="fas fa-angle-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};
