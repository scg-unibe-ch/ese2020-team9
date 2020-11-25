import { Product } from './product.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';


export interface ImageAttributes {
    imageId: number;
    imageType: string;
    imageName: string;
    data: Blob;
    productId: number;
}

export interface ImageGetAttributes {
    filename: string;
    path: string;
}

export interface ImageCreationAttributes extends Optional<ImageAttributes, 'imageId'> { }

export class ProductImage extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
    imageId!: number;
    imageType!: string;
    imageName!: string;
    data!: Blob;
    productId!: number;

    public static initialize(sequelize: Sequelize) {
        ProductImage.init({
            imageId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            imageType: {
                type: DataTypes.STRING,
            },
            imageName: {
                type: DataTypes.STRING
            },
            data: {
                type: DataTypes.BLOB('long')
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        { sequelize, tableName: 'productImageTable' }
        );

    }

    public static createAssociations() {
        ProductImage.belongsTo(Product, {
            as : 'product',
            foreignKey: 'productId',
            targetKey: 'productId',
            onDelete: 'cascade'
        });

    }
}
