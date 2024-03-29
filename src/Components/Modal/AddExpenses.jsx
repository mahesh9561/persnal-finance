import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Modal,
  Select,
} from "antd";

function AddExpenses({ isExpenseModelVisible, handleExpenseCancel, onFinish }) {
 
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
  };



  return (
    <div>
      <Modal
        visible={isExpenseModelVisible}
        className=""
        title="Add Expense"
        onCancel={handleExpenseCancel}
        footer={null} // Remove footer or provide appropriate actions
      >
        <Form
          {...layout}
          name="nest-messages"
          form={form} // Provide form instance here
          onFinish={(value) => {
            onFinish(value, "expense");
            form.resetFields(); // Reset fields after form submission
          }}
          style={{ maxWidth: 500, margin: "auto" }}
          validateMessages={validateMessages}
        >
          {/* Form fields */}
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="tag" label="Tag" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="job">Job</Select.Option>
              <Select.Option value="extra">Extra</Select.Option>
            </Select>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button style={{ marginRight: 10 }} onClick={handleExpenseCancel}>
              Cancel
            </Button>
            <Button type="primary" className=" bg-blue-500" htmlType="submit">
              Add Expense
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AddExpenses;
