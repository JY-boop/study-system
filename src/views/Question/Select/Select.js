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
  saveSelect,
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
const SelectQuestion = () => {
  // 知识点列表
  const [knowledgeList, setKnowledgeList] = useState([]);

  const [itemA, setItemsA] = useState("");
  const [itemB, setItemsB] = useState("");
  const [itemC, setItemsC] = useState("");
  const [itemD, setItemsD] = useState("");

  const getKnowledgeList = () => {
    getKnowledge().then((res) => {
      setKnowledgeList(res.data);
    });
  };

  const onFinish = (values) => {
    const formatItems = [
      {
        code: 1,
        description: itemA,
        correct: values.items.includes(1) ? 1 : 0,
      },
      {
        code: 2,
        description: itemB,
        correct: values.items.includes(2) ? 1 : 0,
      },
      {
        code: 3,
        description: itemC,
        correct: values.items.includes(3) ? 1 : 0,
      },
      {
        code: 4,
        description: itemD,
        correct: values.items.includes(4) ? 1 : 0,
      },
    ];
    values.items = formatItems;
    saveSelect(values).then((res) => {
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
        label="题目描述"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="选项列表"
        name="items"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Checkbox.Group>
          <Space direction="vertical">
            <Checkbox value={1}>
              A
              <Input
                value={itemA}
                onChange={(e) => setItemsA(e.target.value)}
                style={{
                  width: 100,
                  marginLeft: 10,
                }}
              />
            </Checkbox>
            <Checkbox value={2}>
              B
              <Input
                value={itemB}
                onChange={(e) => setItemsB(e.target.value)}
                style={{
                  width: 100,
                  marginLeft: 10,
                }}
              />
            </Checkbox>
            <Checkbox value={3}>
              C
              <Input
                value={itemC}
                onChange={(e) => setItemsC(e.target.value)}
                style={{
                  width: 100,
                  marginLeft: 10,
                }}
              />
            </Checkbox>
            <Checkbox value={4}>
              D
              <Input
                value={itemD}
                onChange={(e) => setItemsD(e.target.value)}
                style={{
                  width: 100,
                  marginLeft: 10,
                }}
              />
            </Checkbox>
          </Space>
        </Checkbox.Group>
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
        label="默认分值"
        name="defaultScore"
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
        label="知识点"
        name="knowledgeIds"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select mode="multiple" options={transform1(knowledgeList)} />
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
export default SelectQuestion;
