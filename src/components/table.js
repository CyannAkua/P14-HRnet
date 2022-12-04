import "./table.css";
import { useState } from "react";
import uparrow from "../313914049_1380814758991164_3032841413862086074_n.gif";
import downarrow from "../315252458_549981030470674_6161890527348673971_n.gif";
import botharrow from "../botharrow.gif";

export default function Table(props) {
  let sortKeys = Object.keys(props.data[0]);
  const [sortLabel, setSortLabel] = useState(sortKeys[0]);
  const [sortOrder, setSortOrder] = useState(true);
  const [page, setPage]  = useState(1);
  const [perPage, setPerPage] = useState(5);
  function pagination(data) {
    let pagedData = data.slice((page - 1) * perPage, page * perPage);
    return pagedData;
  }
  function amountOfPage() {
    let num = [];
    let amountOfPage = Math.ceil(searchData.length / perPage);
    for (let i = 1; i <= amountOfPage; i++) {
      num.push(i);
    }
    if (amountOfPage < page) {
      if (amountOfPage != 0) {
        setPage(amountOfPage);
      }
    }
    return num;
  }

  function sortData(data, sortKey, order) {
    const sortedData = data.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });
    if (!order) {
      return sortedData.reverse();
    }
    return sortedData;
  }

  function SortBtn(props) {
    return (
      <button
        onClick={() => {
          if (sortLabel == props.clmkey) {
            setSortOrder(!sortOrder);
          } else {
            setSortLabel(props.clmkey);
            setSortOrder(true);
          }
        }}
        >
     {sortLabel == props.clmkey ?
      (sortOrder == true) ? <img src={downarrow} ></img> : <img src={uparrow} style={{transform: `translate(0px, -6px)`}}></img> :
      <img src={botharrow} style={{opacity:0.2}}></img>}
    </button>
  )}

  function search(target) {
    if (target === undefined) {
      setSearchData(sortedData);
    } else {
      let searchData = sortedData.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(target.toLowerCase())
      );
      setSearchData(searchData);
    }
  }

  let sortedData = sortData(props.data, sortLabel, sortOrder);
  const [searchData, setSearchData] = useState(sortedData);
  let pagedData = pagination(searchData);
  let numOfPage = amountOfPage();
  return (
    <div>
      <div className="PageNSearch">
        <select onChange={(event) => setPerPage(event.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </select>
        <input
          type="text"
          className="search"
          onChange={(event) => search(event.target.value)}
        ></input>
      </div>
      <table>
        <thead>
          <tr className="tableHead">
            {props.header.map((column) => {
              return (
                <th key={column.key}>
                  {column.title}
                  <SortBtn clmkey={column.key} />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((data, index) => {
            return (
              <tr key={index}>
                {props.header.map((column) => {
                  return <td key={data[column.key]}>{data[column.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pages">
        {numOfPage.length <= 1 ? (
          <div></div>
        ) : (
          numOfPage.map((num) => {
            return (
              <div
                key={num}
                onClick={() => {
                  setPage(num);
                }}
              >
                {num}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
