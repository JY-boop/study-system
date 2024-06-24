import React, { useState, useEffect } from "react";
import "../Teacher.scss";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
} from "antd";
import {
  getStudent,
  saveStudent,
  delStudent,
  getClass,
  addStuToClass,
} from "../../../request/api-teacher";

export default function Student() {
  // 列表列定义
  const columns = [
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
    {
      title: "班级",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "操作",
      key: "ope",
      render: (_, record) => (
        <Button
          size="small"
          danger
          onClick={() => {
            deleteStudent(record);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  // 学生列表数据
  const [studentList, setStudentList] = useState([]);

  // 获取学生列表
  const getStudentList = function () {
    getStudent().then((res) => {
      setStudentList(res.data);
    });
  };

  // 新增学生
  const [studentModalOpen, setstudentModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();
  const onCreate = (values) => {
    setFormValues(values);
    console.log(values);
    saveStudent(values).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        getStudentList(); // 重新获取学生列表数据
      } else {
        message.error(res.msg);
      }
      setstudentModalOpen(false); // 关闭 Modal
    });
  };

  // 删除学生
  const deleteStudent = (record) => {
    console.log(record);
    // 进行保存操作等异步处理
    delStudent(record.id).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        getStudentList(); // 重新获取班级列表数据
      } else {
        message.error(res.msg);
      }
    });
  };

  // 学生加入班级
  const [addClassModalOpen, setAddClassModalOpen] = useState(false);
  // 班级列表，用于选择
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null); // 用来存储选择的班级
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 用来存储选择的学生行数据
  const getClassList = () => {
    getClass().then((res) => {
      setClassList(res.data);
    });
  };
  // 打开弹窗，传递参数
  const openAddClassModal = () => {
    setAddClassModalOpen(true);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // 选择行数据
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // 加入班级
  const addToClass = () => {
    addStuToClass({
      classId: selectedClass,
      studentIds: selectedRowKeys,
    }).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        getStudentList(); // 重新获取班级列表数据
      } else {
        message.error(res.msg);
      }
      setSelectedClass(null);
      setAddClassModalOpen(false);
    });
  };

  useEffect(() => {
    getStudentList();
    getClassList();
  }, []);

  return (
    <div>
      {/* 标题栏 */}
      <div className="title">
        <span>学生列表</span>
        <div>
          <Button
            style={{ marginRight: 8 }}
            type="primary"
            onClick={() => setstudentModalOpen(true)}
          >
            新增学生
          </Button>
          <Button
            type="primary"
            onClick={openAddClassModal}
            disabled={!selectedRowKeys.length > 0}
          >
            批量处理
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {selectedRowKeys.length > 0
              ? `已选择 ${selectedRowKeys.length} 项`
              : ""}
          </span>
        </div>
      </div>

      {/* 学生列表 */}
      <Table
        rowSelection={rowSelection}
        dataSource={studentList}
        columns={columns}
        rowKey="id"
      />

      {/* 新增学生弹窗 */}
      <Modal
        open={studentModalOpen}
        title="新增学生"
        okText="确认"
        cancelText="取消"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setstudentModalOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: "请输入学生姓名",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="性别">
          <Select
            style={{ width: 120 }}
            allowClear
            options={[
              { value: 0, label: "男" },
              { value: 1, label: "女" },
            ]}
          />
        </Form.Item>
      </Modal>
      
      {/* 批量班级管理弹窗 */}
      <Modal
        title="班级管理"
        open={addClassModalOpen}
        onOk={addToClass}
        onCancel={() => {
          setAddClassModalOpen(false);
          setSelectedClass(null);
        }}
        okText="确认"
        cancelText="取消"
      >
        <Select
          showSearch
          allowClear
          placeholder="请选择班级"
          optionFilterProp="label"
          style={{ width: 200 }}
          value={selectedClass}
          onChange={(value) => setSelectedClass(value)}
          options={classList.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
      </Modal>
    </div>
  );
}
