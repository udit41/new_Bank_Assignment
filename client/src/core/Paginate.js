import React from "react";

const Paginate = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const ActivePage = (number) => {
    if (number === currentPage) {
      return { backgroundColor: "#376bff", color: "#fff", fontWeight: "bold" };
    } else {
      return { color: "#000000" };
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li className="page-item" key={number}>
              <a
                onClick={() => paginate(number)}
                className="page-link"
                style={ActivePage(number)}
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginate;
