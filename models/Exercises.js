const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

class Exercises extends Model{}

Exercises.init( // ID PK, MuscleGroup, Description
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
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Exercises",
  }
);

module.exports = Exercises;