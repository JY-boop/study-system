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
import {
  getKnowledge,
  saveFill,
  modifyKnowledge,
} from "../../../request/api-question";
import {
  transform,
  transform1,
  questionType,
  difficultyType,
} from "../../const";

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
  // 知识点列表
  const [knowledgeList, setKnowledgeList] = useState([]);

  const getKnowledgeList = () => {
    getKnowledge().then((res) => {
      setKnowledgeList(res.data);
    });
  };

  const onFinish = (values) => {
    saveFill(values).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };

  useEffect(() => {
    getKnowledgeList();
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

      <Form.Item
        label="类型"
        name="type"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select options={transform(questionType, false)} />
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
        <Select options={transform(difficultyType, false)} />
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
