import { User } from './user.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ProductAttributes {
    productId: number;
    productName: string;
    productDescription: string;
    productImage: String;
    productPrice: number;
    productCategory: string;
    productLocation: string;
    productDelivery: boolean;
    uploadDate: Date;
    sellDate: Date;
    isApproved: boolean;
    isService: boolean;
    isRentable: boolean;
    isAvailable: boolean;
    userId: number;
    userReview: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    productName!: string;
    productDescription!: string;
    productImage!: String;
    productPrice!: number;
    productCategory!: string;
    productLocation!: string;
    productDelivery: boolean;
    uploadDate!: Date;
    sellDate!: Date;
    isApproved!: boolean;
    isService!: boolean;
    isRentable!: boolean;
    isAvailable!: boolean;
    userId!: number;
    userReview!: string;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productDescription: {
                type: DataTypes.TEXT
            },
            productImage: {
                type: DataTypes.STRING
            },
            productPrice: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            productCategory: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productLocation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productDelivery: {
                type: DataTypes.BOOLEAN,
            },
            uploadDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            sellDate: {
                type: DataTypes.DATE,
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            isService: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            isRentable: {
                type: DataTypes.BOOLEAN,
            },
            isAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userReview: {
                type: DataTypes.TEXT,
            }
        },
        { sequelize, tableName: 'productTable' }
        );

    }

    public static createAssociations() {
        Product.belongsTo(User, {
            targetKey: 'userId',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }
}
