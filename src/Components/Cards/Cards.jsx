import { Card, Col, Row } from "antd";
import React from "react";
import Button from "../Button/Button";

function Cards({
  showExpenseModel,
  showIncomeModel,
  income,
  expense,
  totalBalance,
}) {
  return (
    <div className=" m-10">
      <Row gutter={16} className=" ">
        <Col span={8} className=" shadow-md rounded-md">
          <Card title="Current Balance" bordered={false} className="">
            <p className=" font-semibold">₹ {totalBalance}</p>
            <Button
              className={` bg-blue-500 rounded-md  px-4 py-2 w-full text-center align-middle my-2 font-semibold hover:bg-blue-500 text-white cursor-pointer`}
              text={"Add "}
            />
          </Card>
        </Col>
        <Col span={7} className="shadow-md rounded-md mx-5">
          <Card title="Total Expenses" bordered={false}>
            <p className=" font-semibold">₹ {expense}</p>
            <Button
              className={` bg-blue-500 rounded-md  px-4 py-2 w-full text-center align-middle my-2 font-semibold hover:bg-blue-500 text-white cursor-pointer`}
              text={"Add Expense"}
              onClick={showExpenseModel}
            />
          </Card>
        </Col>
        <Col span={8} className="shadow-md rounded-md">
          <Card title="Total Income" bordered={false}>
            <p className=" font-semibold">₹ {income}</p>
            <Button
              className={` bg-blue-500 rounded-md  px-4 py-2 w-full text-center align-middle my-2 font-semibold hover:bg-blue-500 text-white cursor-pointer`}
              text={"Add Income"}
              onClick={showIncomeModel}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cards;
