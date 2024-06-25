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
import { addAutoPaper } from "../../../request/api-paper";
import {
  transform,
  transform1,
  questionType,
  difficultyType,
} from "../../const";
import { type } from "@testing-library/user-event/dist/type";

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

const Auto = () => {
  const [questionList, setQuestionList] = useState([
    {
      type: 0,
      difficulty: undefined,
      num: undefined,
    },
    {
      type: 1,
      difficulty: undefined,
      num: undefined,
    },
    {
      type: 2,
      difficulty: undefined,
      num: undefined,
    },
    {
      type: 3,
      difficulty: undefined,
      num: undefined,
    },
  ]);

  const handleSelectChange = (index, name, value) => {
    const newArray = questionList;
    newArray[index][name] = value;
    setQuestionList([...newArray]);
  };

  const onFinish = (values) => {
    // console.log(questionList, 11);
    const typeList = [];
    questionList.map((item) => {
      if (item.type)
        typeList.push({
          type: item.type,
          difficultyNum: [
            {
              difficulty: item.difficulty,
              num: item.num,
            },
          ],
        });
    });

    const param = {
      name: values.name,
      totalScore: values.totalScore,
      typeList: typeList,
    };

    console.log(param);
    addAutoPaper(param).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };

  useEffect(() => {}, []);
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
        label="总分"
        name="totalScore"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item label="题目">
        {questionList.map((item, index) => (
          <div style={{ marginBottom: 10 }} key={index}>
            <Select
              style={{
                width: "30%",
                marginRight: "5%",
              }}
              options={transform(questionType, false)}
              placeholder="类型"
              allowClear
              value={item?.type}
              onChange={(value) => handleSelectChange(index, "type", value)}
            />

            <Select
              style={{
                width: "30%",
                marginRight: "5%",
              }}
              options={transform(difficultyType, false)}
              placeholder="难度"
              allowClear
              value={item?.difficulty}
              onChange={(value) =>
                handleSelectChange(index, "difficulty", value)
              }
            />

            <InputNumber
              style={{
                width: "30%",
              }}
              placeholder="数量"
              value={item?.num}
              onChange={(value) => handleSelectChange(index, "num", value)}
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
export default Auto;
