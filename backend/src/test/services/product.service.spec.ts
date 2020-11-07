process.env.NODE_ENV = 'test'; 
import { ProductService } from './../../services/product.service';
import { Product, ProductAttributes   } from './../../models/product.model';
import { expect } from 'chai';
import { isMainThread } from 'worker_threads';
import { UserAttributes } from '../../models/user.model';
import { UserService } from '../../services/user.service';

describe('ProductService Tests', () => {
    const testedProductService: ProductService = new ProductService();

    // Create a user: A user is required to create a product
    const user1: UserAttributes = {
        userId: 1,
        admin: false,
        wallet: 500,
        userName: 'jacky',
        password: 'jacky123',
        userMail: 'jacky@gmail.com',
        firstName: 'Jack',
        lastName: 'Doe',
        gender: 'male',
        phoneNumber: 768927361,
        addressStreet: 'Pinnacle Street',
        addressPin: '77889',
        addressCity: 'Hannington Town',
        addressCountry: 'Saint Isles'
    };

    const userService: UserService = new UserService();

    userService.register(user1);


    const product1: ProductAttributes = {
        productId : 1,
        productName: 'Schoggi',
        productDescription: 'E feini Schoggi us Guetemala.',
        productImage: null,
        productPrice: 10,
        productCategory: 'food',
        productLocation: null,
        productDelivery: null,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: true,
        isService: false,
        isRentable: null,
        isAvailable: true,
        userId: 1,
        buyerId: null,
        userReview: null
    };

    describe('Test Creating Products', () => {
        it("should successfully create a product", function(done){
            testedProductService.create(product1).then(product => {
                expect(product.productId).to.be.eq(1);
                expect(product.productName).to.be.eq('Schoggi');
                expect(product.productDescription).to.be.eq('E feini Schoggi us Guetemala.');
                expect(product.productPrice).to.be.eq(10);
                expect(product.productCategory).to.be.eq('food');
                expect(product.uploadDate).to.be.eq('Schoggi');
                expect(product.isApproved).to.be.eq(true);
                expect(product.isService).to.be.eq(false);
                expect(product.isAvailable).to.be.eq(true);
                expect(product.userId).to.be.eq(1);
                Product.findOne({
                    where: {
                        productName: 'Schoggi'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.eq(null);
                    done();
                });
            });
        });
    })
})