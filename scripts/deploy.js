const hre = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners()
    const intialValue = 10

    const Counter = await ethers.getContractFactory("counterDAPP")
    const counter = await Counter.deploy(intialValue)
    await counter.deployed()

    console.log(` Contract deployed at: ${counter.address} \n`)

    let transaction = await counter.connect(deployer).getCounterValue()
    
    console.log(` Initial value is: ${transaction} \n`)

    transaction = await counter.incrementCounter()
    let receipt = await transaction.wait()
    console.log(` After increment, counter value is: ${receipt.events[0].args[0].toNumber()}`)

    transaction = await counter.connect(deployer).decrementCounter()
    receipt = await transaction.wait()
    console.log(` After decrement, counter value is: ${receipt.events[0].args[0].toNumber()}`)

    transaction = await counter.connect(deployer).incrementBy(10)
    receipt = await transaction.wait()
    console.log(` After incrementBy, counter value is: ${receipt.events[0].args[0].toNumber()}`)

    transaction = await counter.connect(deployer).decrementBy(5)
    receipt = await transaction.wait()
    console.log(` After decrementBy, counter value is: ${receipt.events[0].args[0].toNumber()}`)

}

main().catch((error)=> {
    console.log(error);
    process.exitCode = 1;
})