import React, { useState, useEffect } from "react";
import "../Teacher.scss";
import { Button, Table, Modal, Input, message, Drawer } from "antd";
import {
  getClass,
  saveClass,
  getStuByClass,
  delStuFromClass,
} from "../../../request/api-teacher";

const studentColumns = [
  {
    title: "编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
  },
];

export default function SchoolClass() {
  const classColumns = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "班级名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "班级学生",
      key: "student",
      render: (_, record) => (
        <Button size="small" type="primary" onClick={() => getStudent(record)}>
          查看
        </Button>
      ),
    },
  ];

  // 班级列表
  const [classList, setClassList] = useState([]);
  const getClassList = () => {
    getClass().then((res) => {
      setClassList(res.data);
    });
  };

  // 新增班级
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [schoolClassName, setSchoolClassName] = useState("");
  const handleOk = () => {
    saveClass({ name: schoolClassName }).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        getClassList(); // 重新获取班级列表数据
      } else {
        message.error(res.msg);
      }
      setSchoolClassName("");
      setClassModalOpen(false); // 关闭 Modal
    });
  };

  // 查看班级学生
  const [studentDrawerOpen, setstudentDrawerOpen] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null); // 用来存储选择的班级
  // 根据班级id获取班级学生列表
  const getStudent = (record) => {
    setstudentDrawerOpen(true);
    setSelectedClass(record);
    getStuByClass(record.id).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        setStudentList(res.data);
      } else {
        message.error(res.msg);
      }
    });
  };

  // 删除班级学生
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 用来存储选择的学生行数据
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // 选择行数据
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const deleteStudent = () => {
    console.log(selectedRowKeys, "selectedRowKeys");
    console.log(selectedClass, "selectedClass");
    delStuFromClass({
      classId: selectedClass.id,
      studentIds: selectedRowKeys,
    }).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        getStudent(selectedClass);
      } else {
        message.error(res.msg);
      }
    });
  };

  useEffect(() => {
    getClassList();
  }, []);

  return (
    <div>
      {/* 标题栏 */}
      <div className="title">
        <span>班级列表</span>
        <Button type="primary" onClick={() => setClassModalOpen(true)}>
          新增班级
        </Button>
      </div>

      {/* 班级列表 */}
      <Table dataSource={classList} columns={classColumns} rowKey="id" />

      {/* 新增班级弹窗 */}
      <Modal
        title="新增班级"
        open={classModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setClassModalOpen(false);
          setSchoolClassName("");
        }}
        okText="确认"
        cancelText="取消"
      >
        <Input
          placeholder="请输入班级名称"
          value={schoolClassName}
          onChange={(e) => setSchoolClassName(e.target.value)}
        />
      </Modal>

      {/* 班级对应的学生列表 */}
      <Drawer
        title="学生列表"
        onClose={() => setstudentDrawerOpen(false)}
        open={studentDrawerOpen}
        size="large"
      >
        <Table
          rowSelection={rowSelection}
          dataSource={studentList}
          columns={studentColumns}
          rowKey="id"
        />
        <Button
          danger
          onClick={() => {
            deleteStudent();
          }}
          disabled={!selectedRowKeys.length > 0}
        >
          批量删除
        </Button>
      </Drawer>
    </div>
  );
}
