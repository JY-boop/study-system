import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  message,
  Form,
  Input,
  InputNumber,
  Space,
  Select,
  TreeSelect,
} from "antd";
import { saveManualPaper } from "../../../request/api-paper";
import { getQuestions } from "../../../request/api-question";
import { transform, difficultyType } from "../../const";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const Manual = () => {
  const [questionList, setQuestionList] = useState([
    {
      questionId: undefined,
      setScore: undefined,
    },
    {
      questionId: undefined,
      setScore: undefined,
    },
    {
      questionId: undefined,
      setScore: undefined,
    },
    {
      questionId: undefined,
      setScore: undefined,
    },
    {
      questionId: undefined,
      setScore: undefined,
    },
    {
      questionId: undefined,
      setScore: undefined,
    },
    {
      questionId: undefined,
      setScore: undefined,
    },
    {
      questionId: undefined,
      setScore: undefined,
    },
    {
      questionId: undefined,
      setScore: undefined,
    },
    {
      questionId: undefined,
      setScore: undefined,
    },
  ]);

  // 题目列表
  const [itemList, setItemList] = useState([]);

  const handleSelectChange = (index, name, value) => {
    const newArray = questionList;
    newArray[index][name] = value;
    setQuestionList([...newArray]);
  };

  const onFinish = (values) => {
    const paperQuestionMerges = questionList.filter((item) => {
      return item.questionId;
    });
    console.log(questionList);
    const param = {
      name: values.name,
      difficulty: values.difficulty,
      paperQuestionMerges: paperQuestionMerges,
    };
    // console.log(param);
    saveManualPaper(param).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };

  useEffect(() => {
    getQuestions({ current: 1, size: 999 }).then((res) => {
      setItemList(res?.data?.records || []);
    });
  }, []);
  return (
    <Form
      {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="试卷名称"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="难度"
        name="difficulty"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select options={transform(difficultyType, false)} allowClear />
      </Form.Item>

      <Form.Item label="题目">
        {questionList.map((item, index) => (
          <div style={{ marginBottom: 10 }} key={index}>
            <Select
              style={{
                width: "70%",
                marginRight: "5%",
              }}
              options={itemList.map((item) => ({
                label: item.description,
                value: item.id,
              }))}
              placeholder="题目"
              allowClear
              value={item?.questionId}
              onChange={(value) =>
                handleSelectChange(index, "questionId", value)
              }
            />

            <InputNumber
              style={{
                width: "25%",
              }}
              placeholder="分值"
              value={item?.setScore}
              onChange={(value) => handleSelectChange(index, "setScore", value)}
            />
          </div>
        ))}
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Manual;
