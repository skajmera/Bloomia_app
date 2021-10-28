const Report = require("./report.model");
require("../utils/jwt");

const storeTime = async (reportToStore) => {
  const storedReports = await Report.create(reportToStore);
  return storedReports;
};

const findGoal = async (data) => {
  const reports = await Report.find(data);
  return reports;
};

const updateTime = async (reportData) => {
  const reports = await Report.findOneAndUpdate(
    { creatTime: reportData.creatTime },
    reportData.toUpdate,
    { new: true }
  );
  return reports;
};

const findAll = async () => {
  const reports = await Report.find({});
  return reports;
};

module.exports = {findGoal,storeTime,updateTime,findAll};
