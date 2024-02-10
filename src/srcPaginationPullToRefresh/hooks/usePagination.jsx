import { useCallback, useState } from 'react';

const usePagination = ({ fetchFunction, totalPages, initialPage }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleEndReached = useCallback(() => {
    if (currentPage < totalPages) {
      fetchFunction(currentPage);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, fetchFunction, totalPages]);

  return { currentPage, handleEndReached };
};

export default usePagination;

/*
The usePagination hook handles infinite scrolling.
It uses useState to keep track of the current page.
handleEndReached is a callback that checks if there are more pages, triggers the fetch function, and increments the page.
*/
