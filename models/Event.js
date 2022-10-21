const router = require('express').Router();
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    event_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expected_attendance: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    event_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'event',
        key: 'id',
        },
    },
},
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
}
);

module.exports = Event;