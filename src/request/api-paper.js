import request from "./index";

// 5280-自动组卷
export const addAutoPaper = function (params) {
  return request.post("/paper/addAutoPaper", params);
};

// 60101-手动组卷
export const saveManualPaper = function (params) {
  return request.post("/paper/saveManualPaper", params);
};

// 60102-获取单张试卷
export const getPaper = function (paperId) {
  return request.get(`/paper/getPaper/${paperId}`);
};

// 60103-删除试卷
export const delQuestion = function (paperId) {
  return request.delete(`/paper/deletePaper/${paperId}`);
};

// 5270-修改题目（无法修改题目类型）
export const modifyPaper = function (params) {
  return request.put("/paper/modifyPaper", params);
};

// 60105-根据条件分页获取试卷
export const listPaper = function (params) {
  return request.get("/paper/listPaper", params);
};

