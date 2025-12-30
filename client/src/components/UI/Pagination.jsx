const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn-outline btn-md"
      >
        ← Previous
      </button>
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn-outline btn-md"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;