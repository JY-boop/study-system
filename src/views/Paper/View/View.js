import React, { useState, useEffect } from "react";
import "../Paper.scss";
import {
  Button,
  Table,
  Drawer,
  Modal,
  Input,
  message,
  Form,
  Space,
} from "antd";
import { listPaper, delPaper, getPaper } from "../../../request/api-paper";
import {
  transform,
  answerType,
  questionType,
  difficultyType,
} from "../../const";

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
      title: "出卷人",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "总分",
      dataIndex: "totalScore",
      key: "totalScore",
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
        return record.difficulty ? difficulty[record.difficulty] : "-";
      },
    },
    {
      title: "操作",
      key: "ope",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              getPaperDetail(record);
            }}
          >
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

  // 获取试卷列表
  const getPaperList = () => {
    listPaper({ current: 1, size: 999 }).then((res) => {
      console.log(res);
      setpaperList(res?.data?.records || []);
    });
  };

  // 查看试卷详情
  const [paperDrawerOpen, setPaperDrawerOpen] = useState(false);
  const [paperDetail, setPaperDetail] = useState({});
  // 根据试卷id获取试卷详情
  const getPaperDetail = (record) => {
    setPaperDrawerOpen(true);
    getPaper(record.id).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        setPaperDetail(res.data);
        console.log(res.data);
      } else {
        message.error(res.msg);
      }
    });
  };

  //   删除试卷
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

      <Drawer
        title="试卷详情"
        onClose={() => setPaperDrawerOpen(false)}
        open={paperDrawerOpen}
        size="large"
      >
        <div>
          <div style={{ marginBottom: 10 }}>试卷编号：{paperDetail.id}</div>
          <div style={{ marginBottom: 10 }}>试卷名称：{paperDetail.name}</div>
          <div style={{ marginBottom: 10 }}>
            出卷人：{paperDetail.teacherName}
          </div>
          <div style={{ marginBottom: 10 }}>总分：{paperDetail.totalScore}</div>
          <div>
            难度：{paperDetail.difficulty ? paperDetail.difficulty : "-"}
          </div>
          <hr></hr>
          <div>
            <div>单选题</div>
            {paperDetail.singleSelectQuestionVos?.length === 0 ? (
              "无单选题"
            ) : (
              <ul>
                {paperDetail.singleSelectQuestionVos?.map((item) => (
                  <li>
                    <div>题目：{item.description}</div>
                    <div>分值：{item.score}</div>
                    <div>
                      选项：
                      <br />
                      {item.selectItems.map((item) => (
                        <>
                          {answerType[item.code]}: {item.description} <br />
                        </>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <hr></hr>
          </div>
          <div>
            <div>多选题</div>
            {paperDetail.multiSelectQuestionVos?.length === 0 ? (
              "无多选题"
            ) : (
              <ul>
                {paperDetail.multiSelectQuestionVos?.map((item) => (
                  <li>
                    <div>题目：{item.description}</div>
                    <div>分值：{item.score}</div>
                    <div>
                      选项：
                      <br />
                      {item.selectItems.map((item) => (
                        <>
                          {answerType[item.code]}: {item.description} <br />
                        </>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <hr></hr>
          </div>
          <div>
            <div>填空题</div>
            {paperDetail.fillQuestionVos?.length === 0 ? (
              "无填空题"
            ) : (
              <ul>
                {paperDetail.fillQuestionVos?.map((item) => (
                  <li>
                    <div>题目：{item.description}</div>
                    <div>分值：{item.score}</div>
                  </li>
                ))}
              </ul>
            )}
            <hr></hr>
          </div>
          <div>
            <div>主观题</div>
            {paperDetail.subjectQuestionVos?.length === 0 ? (
              "无主观题"
            ) : (
              <ul>
                {paperDetail.subjectQuestionVos?.map((item) => (
                  <li>{JSON.stringify(item)}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
