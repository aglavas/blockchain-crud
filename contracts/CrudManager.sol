// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CrudManager {
  struct User {
    uint id;
    string name;
  }
  User[] public users;
  uint public nextId = 1;

  function createUser(string memory name) public {
    users.push(User(nextId, name));
    nextId++;
  }

  function readUser(uint id) view public returns(uint, string memory) {
    uint i = findUser(id);
    return (users[i].id, users[i].name);
  }

  function updateUser(uint id, string memory name) public {
    uint i = findUser(id);
    users[i].name = name;
  }

  function deleteUser(uint id) public {
    uint i = findUser(id);
    delete users[i];
  }

  function findUser(uint id) view internal returns(uint) {
    for(uint i; i < users.length; i++) {
      if(users[i].id == id) {
        return i;
      }
    }
    revert('User does not exists');
  }
}
