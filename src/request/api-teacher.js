import request from "./index";

// 用户登录
export const userLogin = function (params) {
  return request.post("/user/login", params);
};

// 61700-新增学生
export const saveStudent = function (params) {
  return request.post("/teacherManagement/saveStudent", params);
};

// 61701-删除学生
export const delStudent = function (studentId) {
  return request.delete(`/teacherManagement/delStudent/${studentId}`);
};

// 52202-查看学生列表
export const getStudent = function () {
  return request.get("/teacherManagement/getStudent");
};

// 52206-根据班级id获取学生列表
export const getStuByClass = function (classId) {
  return request.get(`/teacherManagement/getStuByClass?classId=${classId}`);
};

// 52201-教师查看班级列表
export const getClass = function () {
  return request.get("/teacherManagement/getClass");
};

// 52200-新增班级
export const saveClass = function (params) {
  return request.post("/teacherManagement/saveClass", params);
};

// 52204-班级添加n个学生
export const addStuToClass = function (params) {
  return request.put("/teacherManagement/addStuToClass", params);
};

// 52205-班级删除n个学生
export const delStuFromClass = function (params) {
  return request.put("/teacherManagement/delStuFromClass", params);
};

// 5271-发起考试
export const exam = function (params) {
  return request.post("/teacherManagement/exam", params);
};
