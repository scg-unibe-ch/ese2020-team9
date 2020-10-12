import { User } from './user.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface WalletAttributes {
    walletId: number;
    balance: number;
    currency: string;
}

export interface WalletCreationAttributes extends Optional<WalletAttributes, 'walletId'> { }

export class Wallet extends Model<WalletAttributes, WalletCreationAttributes> implements WalletAttributes {
    walletId!: number;
    balance!: number;
    currency!: string;

    public static initialize(sequelize: Sequelize) {
        Wallet.init({
            walletId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            balance: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { sequelize, tableName: 'walletTable' });
    }

    public static createAssociations() {
        Wallet.belongsTo(User, {
            targetKey: 'userId',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }
}
