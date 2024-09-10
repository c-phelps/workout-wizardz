const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

class Exercises extends Model {}

Exercises.init(
  // ID PK, MuscleGroup, Description
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    MuscleGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "exercise",
  }
);

module.exports = Exercises;
