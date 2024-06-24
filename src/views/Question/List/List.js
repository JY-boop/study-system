import React, { useState, useEffect } from "react";
import "../Question.scss";
import { questionType, transform } from "../../const";
import { Button, Table ,Select, Modal, Input, message, Form } from "antd";
import {
  getQuestions,
  delQuestion,
} from "../../../request/api-question";

export default function List() {
  const questionColumns = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "答案",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      render: (_, record) => {
        return questionType[record.type];
      },
    },
    {
      title: "难度",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (_, record) => {
        const difficulty = {
          0: "简单",
          1: "中等",
          2: "困难",
        };
        return difficulty[record.difficulty];
      },
    },
    {
      title: "操作",
      key: "ope",
      render: (_, record) => (
        <Button
          size="small"
          danger
          onClick={() => {
            handleDelete(record.id);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  const options = transform(questionType)

  console.log(options)

  // 题目列表
  const [questionList, setQuestionList] = useState([]);
  const [filter, setFilter] = useState({ current: 1, size: 999, type: 'all' });

  const getQuestiongeList = () => {
    const filters = {...filter}
    if(filters.type === 'all')  filters.type = undefined
    getQuestions(filters).then((res) => {
      console.log(res);
      setQuestionList(res?.data?.records || []);
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await delQuestion(id);
      if (res.code === 200) {
        message.success("删除成功！");
        getQuestiongeList();
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("系统错误！");
    }
  };

  const handleChange = (value) => {
    setFilter({...filter, type: value})
  }

  useEffect(() => {
    getQuestiongeList();
  }, [filter]);

  return (
    <div>
      {/* 标题栏 */}
      <div className="title">
        <span>题目列表</span>
        <Select
      defaultValue="all"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={options}
    />
      </div>

      {/* 题目列表 */}
      <Table
        dataSource={questionList}
        columns={questionColumns}
        rowKey="id"
      />
    </div>
  );
}
