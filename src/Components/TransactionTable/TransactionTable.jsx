import { Button, Flex, Radio, Table, Upload } from "antd"; // Import Upload component
import { Transaction } from "firebase/firestore";
import { parse, unparse } from "papaparse";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { toast } from "react-toastify";

function TransactionTable({ transactions, addTransition, fetchTransactions }) {
  const [search, setSearch] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("All");
  const [sort, setSort] = useState("not");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  if (fileTypeFilter !== "All") {
    filteredTransactions = filteredTransactions.filter(
      (item) => item.type.toLowerCase() === fileTypeFilter.toLowerCase()
    );
  }

  // Sorting logic
  if (sort === "date") {
    filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sort === "amount") {
    filteredTransactions.sort((a, b) => a.amount - b.amount);
  }

  function exportCSV() {
    var csv = unparse({
      fields: ["name", "type", "tag", "date", "amount"],
      data: transactions,
    });
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0],
        {
          header: true,
          complete: async function (results) {
            console.log("Results", results);
            for (const transaction of results.data) {
              console.log("Transactions", transaction);
              const newTransaction = {
                ...transaction,
                amount: parseFloat(transaction.amount),
              };
              await addTransition(newTransaction, true);
            }
          },
        });
        toast.success("imported_succesfully");
        fetchTransactions();
    } catch (error) {
      console.log("Error parsing CSV file.", error);
    }
  }

  return (
    <div className="bg-slate-100 shadow-lg m-5 rounded-lg">
      <form className="mx-4">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={search}
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
            className="my-5  w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg bg-gray-50 focus:border-transparent focus:ring-0"
          />
        </div>
      </form>
      <div className=" flex justify-between mx-4">
        <Radio.Group
          value={fileTypeFilter}
          onChange={(e) => setFileTypeFilter(e.target.value)}
          className="mx-5 my-2"
        >
          <Radio.Button value="All">All</Radio.Button>
          <Radio.Button value="income">Income</Radio.Button>
          <Radio.Button value="expense">Expense</Radio.Button>
        </Radio.Group>

        <Radio.Group
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="mx-5 my-2"
        >
          <Radio.Button value="not">Not Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort By Amount</Radio.Button>
        </Radio.Group>

        <Flex gap="small" wrap="wrap">
          <Button type="primary" className=" bg-blue-500" onClick={exportCSV}>
            Export to CSV
          </Button>
          <input type="file" accept=".csv" required onChange={importFromCsv} />
        </Flex>
      </div>

      <Table
        dataSource={filteredTransactions}
        columns={columns}
        className="m-5"
      />
    </div>
  );
}

export default TransactionTable;
