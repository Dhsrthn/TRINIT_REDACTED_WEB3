const fs = require("fs");
const Identity = artifacts.require("./Identity.sol");
const configObjectRegex = /{[^]+}/;

function parseJsonFromFile(data) {
  const configObject = data.match(configObjectRegex);
  if (!configObject) {
    console.log("No config object found");
    return;
  }
  const JsonParsedConfig = configObject[0].replace(
    /([{,]\s*)([A-Za-z0-9_]+)(\s*:)/g,
    '$1"$2"$3'
  );
  console.log(JsonParsedConfig);
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
          "Contract not found in addressConfig, adding new contract address..."
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
            address
          );
        }
      );
    }
  );
}

async function updateAbi(contractName) {
  let abi;
  fs.readFile(
    "./build/contracts/" + contractName + ".json",
    "utf8",
    function (err, data) {
      const json = JSON.parse(data);
      abi = json.abi;
    }
  );
  fs.readFile(
    "../client/src/api/contracts/abi.js",
    "utf8",
    function (err, data) {
      if (err) {
        console.log("Error reading abi file ", err);
        return;
      }

      let abiConfig = parseJsonFromFile(data);
      abiConfig = abiConfig.replace(/,\s*([\]}])/g, "$1");
      const parsed = JSON.parse(abiConfig);
      if (!parsed[contractName]) {
        console.log(
          "Contract not found in abiConfig, adding new contract abi..."
        );
        parsed[contractName] = "";
      }
      parsed[contractName] = abi;

      const updatedAbi = `const abi = ${JSON.stringify(
        parsed,
        null,
        2
      )};\n\nexport default abi;`;

      fs.writeFile(
        "../client/src/api/contracts/abi.js",
        updatedAbi,
        "utf8",
        function (err, data) {
          if (err) {
            console.error("Error writing addressConfig file:", err);
            return;
          }
          console.log(`ABI file updated for ${contractName} contract`);
        }
      );
    }
  );
}

module.exports = function (deployer) {
  deployer.deploy(Identity).then(async () => {
    console.log("Identity contract deployed at address ", Identity.address);
    await updateAddress(Identity.address, "IdentityAddress");
    await updateAbi("Identity");
  });
};
