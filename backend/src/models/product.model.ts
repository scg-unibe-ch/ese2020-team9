import { User } from './user.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ProductAttributes {
    productId: number;
    name: string;
    description: string;
    price: number;
    approved: boolean;
    category: string;
    userId: number;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    name!: string;
    description!: string;
    price!: number;
    approved!: boolean;
    category!: string;
    userId!: number;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT
            },
            price: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            approved: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
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
