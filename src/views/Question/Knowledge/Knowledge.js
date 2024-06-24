import React, { useState, useEffect } from "react";
import "../Question.scss";
import { Button, Table, Modal, Input, message, Form } from "antd";
import {
  getKnowledge,
  saveKnowledge,
  modifyKnowledge,
} from "../../../request/api-question";

const { TextArea } = Input;
export default function Knowledge() {
  const knowledgeColumns = [
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
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "操作",
      key: "ope",
      render: (_, record) => (
        <Button
          size="small"
          onClick={() => {
            selectRow(record);
          }}
        >
          编辑
        </Button>
      ),
    },
  ];

  // 知识点列表
  const [knowledgeList, setKnowledgeList] = useState([]);
  const getKnowledgeList = () => {
    getKnowledge().then((res) => {
      setKnowledgeList(res.data);
    });
  };

  const [opeType, setOpeType] = useState("create");
  // 当前行数据，同时也用作编辑表单数据
  const [currentRow, setCurrentRow] = useState(null);
  // 新增知识点
  const [knowledgeModalOpen, setKnowledgeModalOpen] = useState(false);
  const [form] = Form.useForm();
  const onCreate = (values) => {
    if (opeType === "create") {
      saveKnowledge(values).then((res) => {
        if (res.code === 200) {
          message.success(res.msg);
          getKnowledgeList(); // 重新获取知识点列表数据
        } else {
          message.error(res.msg);
        }
        setKnowledgeModalOpen(false); // 关闭 Modal
        setCurrentRow(null);
      });
    } else {
      modifyKnowledge({ id: currentRow.id, ...values }).then((res) => {
        if (res.code === 200) {
          message.success(res.msg);
          getKnowledgeList(); // 重新获取知识点列表数据
        } else {
          message.error(res.msg);
        }
        setKnowledgeModalOpen(false); // 关闭 Modal
        setCurrentRow(null);
      });
    }
  };

  // 选择行进行编辑
  const selectRow = (record) => {
    setOpeType("edit");
    setCurrentRow(record);
    setKnowledgeModalOpen(true);
  };

  useEffect(() => {
    getKnowledgeList();
  }, []);

  return (
    <div>
      {/* 标题栏 */}
      <div className="title">
        <span>知识点列表</span>
        <Button
          type="primary"
          onClick={() => {
            setOpeType("create");
            setKnowledgeModalOpen(true);
          }}
        >
          新增知识点
        </Button>
      </div>

      {/* 知识点列表 */}
      <Table
        dataSource={knowledgeList}
        columns={knowledgeColumns}
        rowKey="id"
      />

      {/* 新增知识点弹窗 */}
      <Modal
        open={knowledgeModalOpen}
        title="新增知识点"
        okText="确认"
        cancelText="取消"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => {
          setKnowledgeModalOpen(false);
          setCurrentRow(null);
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            initialValues={currentRow}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: "请输入知识点名称",
            },
          ]}
        >
          <Input placeholder="请输入知识点名称" />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <TextArea
            placeholder="请输入知识点的相关描述"
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Form.Item>
      </Modal>
    </div>
  );
}
