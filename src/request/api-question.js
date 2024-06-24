import request from "./index";

// 1-新增选择题
export const saveSelect = function (params) {
  return request.post("/teacherManagement/saveSelect", params);
};

// 2-新增填空题
export const saveFill = function (params) {
  return request.post("/teacherManagement/saveFill", params);
};

// 3-新增主观题
export const saveSubjective = function (params) {
  return request.post("/teacherManagement/saveSubjective", params);
};

// 5270-修改题目（无法修改题目类型）(未测试)
export const modifyQuestion = function (params) {
  return request.put("/teacherManagement/modifyQuestion", params);
};

// 5260-删除题目
export const delQuestion = function (questionId) {
  return request.delete(`/teacherManagement/delQuestion/${questionId}`);
};

// 5261-查询并展示题目
export const getQuestions = function (params) {
  return request.get("/teacherManagement/getQuestions", {params});
};

// 5240-获取[题目类型]参数字典
export const getTypeDict = function () {
  return request.get("/teacherManagement/getTypeDict");
};

// 5241-获取[答案正确与否]参数字典
export const getDifficultyDict = function () {
  return request.get("/teacherManagement/getDifficultyDict");
};

// 52207-新增知识点
export const saveKnowledge = function (params) {
  return request.post("/knowledge/saveKnowledge", params);
};

// 52209-获取知识点列表
export const getKnowledge = function () {
  return request.get("/knowledge/getKnowledge");
};

// 52208-修改知识点
export const modifyKnowledge = function (params) {
  return request.put("/knowledge/modifyKnowledge", params);
};
