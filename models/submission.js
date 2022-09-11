const { DataTypes } = require('sequelize')

const sequelize = require('../lib/sequelize')

const Submission = sequelize.define('submission', {
  assignmentID: { type: DataTypes.INTEGER, allowNull: false },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  timestamp: { type: DataTypes.DATE, allowNull: false },
  grade: { type: DataTypes.STRING, allowNull: true },
  file: {type: DataTypes.STRING, allowNull: false}
})

exports.Submission = Submission
exports.SubmissionClientField = [
  'assignmentID',
  'studentID',
  'timestamp',
  'grade',
  'file'
]

exports.insertNewSubmission = async function (submission) {
  if(submission.grade){
    delete submission.grade
  }
  const result = await Submission.create(submission, exports.SubmissionClientField)
  return result.id
}