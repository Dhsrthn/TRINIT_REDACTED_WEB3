const fs = require("fs");
const Identity = artifacts.require("./Identity.sol");
const Token = artifacts.require("./Token.sol");
const configObjectRegex = /{[^]+}/;

function parseJsonFromFile(data) {
  const configObject = data.match(configObjectRegex);
  if (!configObject) {
    console.log("No config object found \n");
    return;
  }
  const JsonParsedConfig = configObject[0].replace(
    /([{,]\s*)([A-Za-z0-9_]+)(\s*:)/g,
    '$1"$2"$3'
  );
  return JsonParsedConfig;
}

async function updateAddress(address, contractName) {
  fs.readFile(
    "../client/src/api/contracts/address.js",
    "utf8",
    function (err, data) {
      if (err) {
        console.log("Error reading address file ", err);
        return;
      }
      const addressConfigToParse = parseJsonFromFile(data);
      const addressConfig = JSON.parse(addressConfigToParse);

      if (!addressConfig[contractName]) {
        addressConfig[contractName] = "";
        console.log(
          "Contract not found in addressConfig, adding new contract address..." , " \n"
        );
      }
      addressConfig[contractName] = address;

      const updatedAddressConfig = `const address = ${JSON.stringify(
        addressConfig,
        null,
        2
      )};\n\nexport default address;`;
      fs.writeFile(
        "../client/src/api/contracts/address.js",
        updatedAddressConfig,
        "utf8",
        function (err, data) {
          if (err) {
            console.error("Error writing addressConfig file:", err);
            return;
          }
          console.log(
            `addressConfig file updated with ${contractName} `,
            address , " \n"
          );
        }
      );
    }
  );
}

module.exports = async function (deployer) {
  let tokenInstance;
  let identityInstance;

  await deployer.deploy(Token).then(async () => {
    tokenInstance = await Token.deployed();
    console.log("Tokens contract deployed at address ", tokenInstance.address, " \n");
    await updateAddress(tokenInstance.address, "TokenAddress");
  });

  await deployer.deploy(Identity, tokenInstance.address).then(async () => {
    identityInstance = await Identity.deployed();
    console.log(
      "Identity contract deployed at address ",
      identityInstance.address , " \n"
    );
    await updateAddress(identityInstance.address, "IdentityAddress");
  });

  await tokenInstance.addAllowedAddress(identityInstance.address);
  console.log("Identity contract is now an allowed address in tokens contract \n");
};
