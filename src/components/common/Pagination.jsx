import { useState, useEffect } from "react";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import "./pagination.css";

const Pagination = ({ page, setPage, totalPages, size = "md" }) => {
  const initialise = () => {
    if (totalPages === 1) return [1];
    else if (totalPages === 2) return [1, 2];
    return [1, 2, 3];
  };
  const [pagesList, setPagesList] = useState([]);
  useEffect(() => {
    setPagesList(initialise());
  }, [totalPages]);
  const handleChange = (value) => {
    setPage(value);
    if (value > 3) {
      if (value === totalPages) setPagesList([value - 2, value - 1, value]);
      else setPagesList([value - 1, value, value + 1]);
    } else {
      setPagesList(initialise());
    }
  };

  if (
    totalPages === null ||
    totalPages === 1 ||
    totalPages === 0 ||
    totalPages === undefined
  )
    return "";
  return (
    <div className={`pagination ${size}`}>
      <button
        className={page === 1 ? "disabled pagination-btn" : "pagination-btn"}
        onClick={() => {
          if (page !== 1) handleChange(1);
        }}
        disabled={page === 1}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      <button
        className={page === 1 ? "disabled pagination-btn" : "pagination-btn"}
        onClick={() => {
          if (page !== 1) handleChange(page - 1);
        }}
        disabled={page === 1}
      >
        <MdOutlineArrowBackIosNew />
      </button>
      {pagesList &&
        pagesList.map((e) => (
          <span
            key={e}
            className={page === e ? "active pagination-num" : "pagination-num"}
            onClick={() => handleChange(e)}
          >
            {e}
          </span>
        ))}
      <button
        className={
          page === totalPages ? "disabled pagination-btn" : "pagination-btn"
        }
        onClick={() => {
          if (page !== totalPages) handleChange(page + 1);
        }}
        disabled={page === totalPages}
      >
        <MdOutlineArrowForwardIos />
      </button>
      <button
        className={
          page === totalPages ? "disabled pagination-btn" : "pagination-btn"
        }
        onClick={() => {
          if (page !== totalPages) handleChange(totalPages);
        }}
        disabled={page === totalPages}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};
Pagination.defaultProps = {
  size: "lg",
  totalPages: 100,
};

export default Pagination;
