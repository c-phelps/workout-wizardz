const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

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
      references: {
        model: "Exercises",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Exercises",
        key: "id",
      },
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