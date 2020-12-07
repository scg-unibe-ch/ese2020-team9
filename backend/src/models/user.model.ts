import { Product } from './product.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';


export interface UserAttributes {
    userId: number;
    admin: boolean;
    wallet: number;
    userName: string;
    password: string;
    userMail: string;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: number;
    addressStreet: string;
    addressPin: string;
    addressCity: string;
    addressCountry: string;
    gameScore: number;
    activityScore: number;
    overallScore: number;
}

export interface UserEditingAttributes {
    userId: number;
    userName: string;
    userMail: string;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: number;
    addressStreet: string;
    addressPin: string;
    addressCity: string;
    addressCountry: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    admin!: boolean;
    wallet!: number;
    userName!: string;
    password!: string;
    userMail!: string;
    firstName!: string;
    lastName!: string;
    gender!: string;
    phoneNumber!: number;
    addressStreet!: string;
    addressPin!: string;
    addressCity!: string;
    addressCountry!: string;
    gameScore!: number;
    activityScore!: number;
    overallScore!: number;


    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            wallet: {
                type: DataTypes.INTEGER,
                defaultValue: 500,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userMail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phoneNumber: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            addressStreet: {
                type: DataTypes.STRING,
                allowNull: true
            },
            addressPin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            addressCity: {
                type: DataTypes.STRING,
                allowNull: true
            },
            addressCountry: {
                type: DataTypes.STRING,
                allowNull: true
            },
            gameScore: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            activityScore: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            overallScore: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }

        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }


    /*public static calculateOverallScore(gameScore: number, activityScore: number) {
        User.rawAttributes;
        const overallScore = gameScore + activityScore;
        return overallScore;
    } */


    public static createAssociations() {
        User.hasMany(Product, {
            as: 'products',
            foreignKey: 'userId',
            onDelete: 'cascade'
        });
    }
}
