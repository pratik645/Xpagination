import React, { useEffect, useState } from 'react';
import style from "./Xpagination.module.css";

const TableWithPagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>Employee Data Table</h1>
      <table className={style.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length ? (
            currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '25px' }}>
        <button className={style.button} onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span style={{ width: '30px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {currentPage}
        </span>

        <button className={style.button} onClick={handleNextPage} disabled={currentPage === totalPages || !data.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TableWithPagination;
