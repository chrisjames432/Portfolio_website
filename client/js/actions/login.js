
var ccoin = ''

function createCoinWithText(game, THREE, position, textValue) {
    // Create a coin shape using the THREE.Shape class
    var scene = game.scene
    var coinShape = new THREE.Shape();
    coinShape.moveTo(0, 0);
    coinShape.absarc(0, 0, 0.5, 0, Math.PI * 2, false);

    // Create a 3D coin object using the THREE.ShapeGeometry class
    var coinGeometry = new THREE.ShapeGeometry(coinShape);
    var coinMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var coin = new THREE.Mesh(coinGeometry, coinMaterial);

    // Create a text object using the THREE.TextGeometry class
    var textGeometry = new THREE.TextGeometry(textValue, {
        font: new THREE.Font('./client/js/fonts/helvetiker_regular.typeface.json'),
        size: 0.2,
        height: 0.1
    });
    var textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    var text = new THREE.Mesh(textGeometry, textMaterial);

    // Position the text object next to the coin object
    text.position.x = coin.position.x + 1;
    text.position.y = coin.position.y;
    text.position.z = coin.position.z;

    // Create a group and add both objects to it
    var coinGroup = new THREE.Group();
    coinGroup.add(coin);
    coinGroup.add(text);
    ccoin=coin
    // Position the group
    coinGroup.position.set(position.x, position.y, position.z);

    // Add the group to the scene
    scene.add(coinGroup);

    return coinGroup;
}






export function metamask_login(game,THREE,position) {


    // First, check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        // Request user permission to access their MetaMask account
        window.ethereum.enable().then(() => {
            // Get the user's Ethereum address
            const address = window.ethereum.selectedAddress;

            // Use a web3 library to interact with the Ethereum blockchain
            const web3 = new Web3(window.ethereum);

            // Get the user's Ethereum balance
            web3.eth.getBalance(address).then((balance) => {
                console.log(`Your Ethereum balance is: ${web3.utils.fromWei(balance, 'ether')} ETH`);

               // createCoinWithText(game,THREE,position,`Your Ethereum balance is: ${web3.utils.fromWei(balance, 'ether')} ETH`)

            });



       


        });
    } else {
        console.log("MetaMask is not installed");
    }



}








export function tron_login(){


  
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            var ans = window.tronWeb.defaultAddress.base58;
            var address = ans;
    
            tronWeb.trx.getAccount(address).then(function (result) {
                console.log(result);
    
    
                let balance = tronWeb.fromSun(result.balance);
                console.log(balance);
                 
    
              
            }
    
            )
    
    
    
    
    
        }
        else {
    
            console.log('not logged in')
    
        }
    

    

}









/*

function postto(mdata) {


    $.post("login_req", mdata,
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });


}


//  https://developers.tron.network/reference#fromsun

function gettronweb() {
    var ans = ""
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        ans = window.tronWeb.defaultAddress.base58;
        address = ans;

        tronWeb.trx.getAccount(address).then(function (result) {
            console.log(result);


            let balance = tronWeb.fromSun(result.balance);
            console.log(balance);

            ans = ans + ' ' + balance;


            postto({ add: address, src: 'tron' })

            $("#info").append("<br>" + balance);
        }

        )





    }
    else {

        ans = "<br><br>PLEASE LOGIN TO TRONWEB";

    }

    return ans;
}




//----------------------------------------------------------


$(function () {


    var tronlink = $('#tronlink');

    tronlink.click(function () {

        $("#info").append(gettronweb());


    });


});



*/


