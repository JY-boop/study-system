export const questionType = {
  0: "单选",
  1: "多选",
  2: "填空题",
  3: "主观题",
};

export const difficultyType = {
  0: "简单",
  1: "中等",
  2: "困难",
};

export const transform = (obj, addAll = true) => {
  const result = Object.keys(obj).map((item) => ({
    value: parseInt(item),
    label: obj[item],
  }));
  if (addAll)
    result.unshift({
      value: "all",
      label: "全部",
    });
  return result;
};

export const transform1 = (arr) => {
  return arr.map((item) => ({
    value: parseInt(item.id),
    label: item.name,
  }));
};
