import React from 'react'
import { Button, Form, Input, InputNumber, Modal, DatePicker, Select } from 'antd';

function AddIncome({ isIncomeModelVisible, handleIncomeCancel, onFinish }) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const [form] = Form.useForm()
  return (
    <div>
      <Modal
        visible={isIncomeModelVisible}
        className=""
        title="Add Income"
        onCancel={handleIncomeCancel}
        footer={null}
      >
        <Form
          {...layout}
          name="nest-messages"
          form={form}
          onFinish={(value) => {
            onFinish(value, "income");
            form.resetFields();
          }}
          style={{ maxWidth: 500, margin: 'auto' }}
          validateMessages={validateMessages}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="tag" label="Tag" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="job">Job</Select.Option>
              <Select.Option value="extra">Extra</Select.Option>
            </Select>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button style={{ marginRight: 10 }} onClick={handleIncomeCancel}>
              Cancel
            </Button>
            <Button type="primary" className=' bg-blue-500' htmlType="submit">
              Add Income
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AddIncome