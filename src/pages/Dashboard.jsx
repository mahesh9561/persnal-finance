import React, { useEffect, useState } from "react";
import Cards from "../Components/Cards/Cards";
import AddIncome from "../Components/Modal/addIncome";
import AddExpenses from "../Components/Modal/AddExpenses";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";

function Dashboard({ uid }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpenseModelVisible, setIsExpenseModelVisible] = useState(false);
  const [isIncomeModelVisible, setIsIncomeModelVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  let incomeTotal = 0;
  let expenseTotal = 0;

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
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransition(newTransition);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    if (uid) {
      const q = query(collection(db, `user/${uid}/transaction`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray); // This sets all transactions
      console.log(transactionsArray);
      toast.success("Transaction data loaded!");
    }
    setLoading(false);
  }

  async function addTransition(transition) {
    try {
      const docRef = await addDoc(
        collection(db, `user/${uid}/transaction`),
        transition
      );
      console.log("Document Created", docRef.id);
      toast.success("Transaction Added");
    } catch (error) {
      console.log("Error Adding Transaction");
      toast.error(error.message);
    }
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal); // Corrected calculation
  }

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
          <AddExpenses
            isExpenseModelVisible={isExpenseModelVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />

          <AddIncome
            isIncomeModelVisible={isIncomeModelVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
