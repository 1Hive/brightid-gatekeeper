//SPDX-License-Identifier: GPLv3+
pragma solidity ^0.8.0;

interface IBrightIdRegister {
    function isVerified(address _brightIdUser) external view returns (bool);
}

contract BrightIdGatekeeper {
    IBrightIdRegister public brightIdRegister;

    constructor(address _brightIdRegister) {
        brightIdRegister = IBrightIdRegister(_brightIdRegister);
    }

    function canPerform(address who, address, bytes32, uint256[] calldata) external view returns (bool) {
        return brightIdRegister.isVerified(who);
    }

    function willPerform(bytes4, address who, bytes calldata) external view returns (bool allowed) {
        return brightIdRegister.isVerified(who);
    }
}
