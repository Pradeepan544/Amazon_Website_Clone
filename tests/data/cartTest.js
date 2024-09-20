import {addTocart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

describe('test suite: addTocart', ()=>{
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');
    });
    it('adds an existing product to cart',()=>{
        //mocking localstorage to check whther first added product is there or not. putting a product inside to test 
        
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        console.log(localStorage.getItem('cart'));
        loadFromStorage();

        addTocart('e43638ce-6aa0-ab85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
        }]));
        expect(cart[0].productId).toEqual('e43638ce-6aa0-ab85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);

    });

    it('adds a new product to the cart',()=>{
        //testing the localstorage, duplicating it so that cart is empty adding a product testing it


        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('cart'));
        loadFromStorage();
        
        addTocart('e43638ce-6aa0-ab85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
        }]));
        expect(cart[0].productId).toEqual('e43638ce-6aa0-ab85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});

describe('test suite: removeFromCart', ()=>{
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');
    });
    it('removes a product from cart',()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        removeFromCart('e43638ce-6aa0-ab85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });
    it('does nothing if product is not in the cart', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        removeFromCart('does not exists');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
        }]));
    });
});

describe('test suite: updateDeliveryOption', ()=>{
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');
    });
    it('Updates the delivery option',()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        updateDeliveryOption('e43638ce-6aa0-ab85-b27f-e1d07eb678c6', '3');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-ab85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '3'
        }]));

    });

    it('does nothing if the product is not in the cart', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        updateDeliveryOption('does-not-exits', '3');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-ab85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    it('does nothing if the delivery optioin does not exists', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-ab85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        updateDeliveryOption('e43638ce-6aa0-ab85-b27f-e1d07eb678c6', 'does-not-exist');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-ab85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});