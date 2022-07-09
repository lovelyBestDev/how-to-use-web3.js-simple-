// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Register {
  string private info = 'Un';

  function setInfo(string memory _info) public {
      info = _info;
  }

  function getInfo() public view returns (string memory) {
      return info;
  }
}
