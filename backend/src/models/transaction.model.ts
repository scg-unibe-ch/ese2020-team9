import { Product } from './product.model';
import { User } from './user.model';
import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';


export interface TransactionAttributes {
    transactionId: number;
    productId: number;
    userId: number;
    buyerId: number;
    transactionStatus: number;
    deliveryFirstName: string;
    deliveryLastName: string;
    deliveryStreet: string;
    deliveryPin: string;
    deliveryCity: string;
    deliveryCountry: string;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'transactionId'> {}

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {

    public static associations: {
        product: Association<Transaction, Product>;
        seller: Association<Transaction, User>;
        buyer: Association<Transaction, User>;
    };

    transactionId!: number;
    productId!: number;
    userId!: number;
    buyerId!: number;
    transactionStatus!: number;
    deliveryFirstName!: string;
    deliveryLastName!: string;
    deliveryStreet!: string;
    deliveryPin!: string;
    deliveryCity!: string;
    deliveryCountry!: string;

    public readonly product?: Product;
    public readonly seller?: User;
    public readonly buyer?: User;


    public static initialize(sequelize: Sequelize) {
        Transaction.init({
            transactionId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            buyerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            transactionStatus: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                allowNull: false
            },
            deliveryFirstName: {
                type: DataTypes.STRING
            },
            deliveryLastName: {
                type: DataTypes.STRING,
            },
            deliveryStreet: {
                type: DataTypes.STRING
            },
            deliveryPin: {
                type: DataTypes.STRING
            },
            deliveryCity: {
                type: DataTypes.STRING
            },
            deliveryCountry: {
                type: DataTypes.STRING
            }
        },
            {
                sequelize,
                tableName: 'transactionTable'
            }
        );
    }

    public static createAssociations() {
        Transaction.belongsTo(Product, {
            as : 'product',
            foreignKey: 'productId',
            targetKey: 'productId',
            onDelete: 'cascade'
        });

        Transaction.belongsTo(User, {
            as: 'seller',
            foreignKey: 'userId',
            targetKey: 'userId'
        });

        Transaction.belongsTo(User, {
            as: 'buyer',
            foreignKey: 'buyerId',
            targetKey: 'userId'
        });

    }

}
