// Source code to interact with smart contract

// web3 provider with fallback for old version
window.addEventListener('load', async () => {
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
      } else {
        // Handle the case where the user doesn't have Metamask installed
        // Probably show them a message prompting them to install Metamask
      }

      // Now you can start your app & access web3 freely:
      startApp()
  });
  console.log (window.web3.currentProvider)
  
  var account;

  function startApp() {
    // contractAddress and abi are setted after contract deploy
    var contractAddress = '0xb2c2923E5b42D9F040254132840f460cED01693a';
    var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );
    
    //contract instance
    contract = new web3js.eth.Contract(abi, contractAddress);

    // Accounts
    web3js.eth.getAccounts(function(err, accounts) {
        if (err != null) {
          alert("Error retrieving accounts.");
          return;
        }
        if (accounts.length == 0) {
          alert("No account found! Make sure the Ethereum client is configured properly.");
          return;
        }
        account = accounts[0];
        console.log('Account: ' + account);
        web3js.eth.defaultAccount = account;
      });
  }

  function connect() {
    if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');
    }

    if (account == undefined && window.ethereum) {
      const web3 = new Web3(window.ethereum);

      ethereum.enable().then((accounts) => {
        account = accounts;
        console.log(account);  
      });
    }
  }
  
  //Smart contract functions
  function registerSetInfo() {
    console.log(account);
    info = $("#newInfo").val();
    contract.methods.setInfo (info).send( {from: account} ).then( function(tx) {
      console.log("Transaction: ", tx);
    });
    $("#newInfo").val('');
  }
  
  function registerGetInfo() {
    console.log(account);
    contract.methods.getInfo().call().then( function( info ) {
      console.log("info: ", info);
      document.getElementById('lastInfo').innerHTML = info;
    });
  }