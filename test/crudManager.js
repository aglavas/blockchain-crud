const CrudManager = artifacts.require('CrudManager');
const truffleAssert = require('truffle-assertions');

contract('CrudManager', () => {
    let crudManager = null;
    
    before(async () => {
        crudManager = await CrudManager.deployed();
    });

    it('Should create a new user', async () => {
        await crudManager.createUser('John');
        const user = await crudManager.readUser(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'John');
    });

    it('Should update a user', async () => {
        await crudManager.updateUser(1, 'JohnXX');
        const user = await crudManager.readUser(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'JohnXX');
    });

    it('Should NOT update non-existing user', async () => {
        await truffleAssert.reverts(crudManager.updateUser(10, 'JohnXX'), "User does not exists");
    });

    it('Should delete a user', async () => {
        await crudManager.deleteUser(1);
        await truffleAssert.reverts(crudManager.deleteUser(1), "User does not exists");
    });

    it('Should NOT delete non-existing user', async () => {
        await truffleAssert.reverts(crudManager.deleteUser(1), "User does not exists");
    });
});