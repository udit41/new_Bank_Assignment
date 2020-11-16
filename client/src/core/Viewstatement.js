import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/Auth";
import Base from "./Base";
import { formatDate, getMytransaction } from "./helper/coreapicalls";
import Paginate from "./Paginate";

const Viewstatement = ({ match }) => {
  const [error, setError] = useState("");
  const [statement, setStatement] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getTransaction = (userId, token) => {
    getMytransaction(userId, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setStatement(data);
      }
    });
  };

  useEffect(() => {
    const { user, token } = isAuthenticated();
    const userId = user.id;
    getTransaction(userId, token);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = statement.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Base>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Withdraw</th>
            <th scope="col">Deposit</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts &&
            currentPosts.map((trans, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatDate(trans.created_at)}</td>
                  <td>
                    {trans.transaction_type === "withdraw"
                      ? trans.amount
                      : null}
                  </td>
                  <td>
                    {trans.transaction_type === "deposit" ? trans.amount : null}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Paginate
        postsPerPage={postsPerPage}
        totalPosts={statement.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Base>
  );
};

export default Viewstatement;
