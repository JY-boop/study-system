import React, { useState, useEffect } from "react";
import "../Paper.scss";
import {
  Button,
  Table,
  Select,
  Modal,
  Input,
  message,
  Form,
  Space,
} from "antd";
import { listPaper, delPaper } from "../../../request/api-paper";

export default function View() {
  const paperColumns = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "创建者",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "总分",
      dataIndex: "totalScore",
      key: "totalScore",
    },
    {
      title: "操作",
      key: "ope",
      render: (_, record) => (
        <Space>
          <Button size="small" type="primary" onClick={() => {}}>
            查看
          </Button>
          <Button
            size="small"
            danger
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 试卷列表
  const [paperList, setpaperList] = useState([]);

  const getPaperList = () => {
    listPaper({ current: 1, size: 10 }).then((res) => {
      console.log(res);
      setpaperList(res?.data?.records || []);
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await delPaper(id);
      if (res.code === 200) {
        message.success("删除成功！");
        getPaperList();
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("系统错误！");
    }
  };

  useEffect(() => {
    getPaperList();
  }, []);

  return (
    <div>
      {/* 标题栏 */}
      <div className="title">
        <span>试卷列表</span>
        {/* <Select
          defaultValue="all"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={options}
        /> */}
      </div>

      {/* 试卷列表 */}
      <Table dataSource={paperList} columns={paperColumns} rowKey="id" />
    </div>
  );
}
