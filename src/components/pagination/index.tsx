import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className="  mt-2 flex  space- bg-black-primary px-2   rounded-md">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-primary-text disabled:opacity-50 px-3"
      >
        &lt;
      </button>
      {getPages().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`   px-3 border-x text-[12px] border-x-main-border py-1 text-primary-text ${page === currentPage ? 'bg-main-border ' : 'bg-black-primary'}`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1 text-secondary-text ">
            {page}
          </span>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-primary-text disabled:opacity-50 px-3 "
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;