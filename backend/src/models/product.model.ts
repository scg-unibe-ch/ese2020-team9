import { User } from './user.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { Transaction} from './transaction.model';
import { ProductImage } from './productimage.model';

export interface ProductAttributes {
    productId: number;
    productName: string;
    productDescription: string;
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
    buyerId: number;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    productName!: string;
    productDescription!: string;
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
    buyerId!: number;

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
            productPrice: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            productCategory: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productLocation: {
                type: DataTypes.STRING
            },
            productDelivery: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            uploadDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            sellDate: {
                type: DataTypes.DATE
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            isService: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            isRentable: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            isAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            buyerId: {
                type: DataTypes.INTEGER
            }
        },
        { sequelize, tableName: 'productTable' }
        );

    }

    public static createAssociations() {
        Product.belongsTo(User, {
            as : 'user',
            foreignKey: 'userId',
            targetKey: 'userId',
            onDelete: 'cascade'
        });
        Product.hasMany(Transaction, {
            as: 'transactions',
            foreignKey: 'productId',
            onDelete: 'cascade'
        });
        Product.hasMany(ProductImage, {
            as: 'productImages',
            foreignKey: 'productId',
            onDelete: 'cascade'
        });
    }
}
