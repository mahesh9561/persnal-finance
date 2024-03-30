import React, { useEffect, useState } from "react";
import Cards from "../Components/Cards/Cards";
import AddIncome from "../Components/Modal/addIncome";
import AddExpenses from "../Components/Modal/AddExpenses";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import TransactionTable from "../Components/TransactionTable/TransactionTable";
import Charts from "../Components/Charts/Charts";
import NoTransaction from "./NoTransaction";

function Dashboard({ uid }) {
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem("transactions");
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });
  const [loading, setLoading] = useState(false);
  const [isExpenseModelVisible, setIsExpenseModelVisible] = useState(false);
  const [isIncomeModelVisible, setIsIncomeModelVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModel = () => {
    setIsExpenseModelVisible(true);
  };
  const showIncomeModel = () => {
    setIsIncomeModelVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModelVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModelVisible(false);
  };
  const onFinish = (values, type) => {
    const newTransition = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransition(newTransition);
  };

  async function addTransition(transition, many) {
    try {
      const docRef = await addDoc(
        collection(db, `user/${uid}/transaction`),
        transition
      );
      console.log("Document Created", docRef.id);
      if (!many) toast.success("Transaction Added");
      setTransactions([...transactions, transition]); // Update state with new transaction
      // Update local storage with updated transactions
      localStorage.setItem(
        "transactions",
        JSON.stringify([...transactions, transition])
      );
    } catch (error) {
      console.log("Error Adding Transaction");
      if (!many) toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Fetch data
  async function fetchTransactions() {
    setLoading(true);
    if (uid) {
      const q = query(collection(db, `user/${uid}/transaction`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      // console.log(transactionsArray);
      toast.success("Transaction data loaded!");
      // Update local storage with fetched transactions
      localStorage.setItem("transactions", JSON.stringify(transactionsArray));
    }
    setLoading(false);
  }

  // Calculate balance
  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  let sortTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModel={showExpenseModel}
            showIncomeModel={showIncomeModel}
          />
          {transactions && transactions.length != 0 ? (
            <Charts sortTransactions={sortTransactions} />
          ) : (
            <NoTransaction />
          )}
          <AddExpenses
            isExpenseModelVisible={isExpenseModelVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />{" "}
          <AddIncome
            isIncomeModelVisible={isIncomeModelVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionTable
            transactions={transactions}
            addTransition={addTransition}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
