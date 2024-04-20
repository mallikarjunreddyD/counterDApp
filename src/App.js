import { useEffect, useState } from "react";
import { ethers } from "ethers";
import config from "./config.json";
import CounterDAPP from "./abis/counterDAPP.json";
import "./index.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);
  const [decrementValue, setDecrementValue] = useState(1);

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDecrement = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  const handleIncrementByValue = () => {
    setCounter((prevCounter) => prevCounter + parseInt(incrementValue));
  };

  const handleDecrementByValue = () => {
    setCounter((prevCounter) => prevCounter - parseInt(decrementValue));
  };
  const reset = () => {
    setCounter(0);
  };

  async function loadBlockchainData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    window.ethereum.on("accountsChanged", async () => {
      loadAccount();
    });
  }
  async function loadAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  }
  useEffect(() => {
    loadBlockchainData();
    loadAccount();
  }, []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <tr>
            <td></td>
            <td>
              <button onClick={handleIncrement}>Increment</button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={handleDecrement}>Decrement</button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                value={incrementValue}
                onChange={(e) => setIncrementValue(e.target.value)}
              />
            </td>
            <td>
              <button onClick={handleIncrementByValue}>
                Increment by Value
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                value={decrementValue}
                onChange={(e) => setDecrementValue(e.target.value)}
              />
            </td>
            <td>
              <button onClick={handleDecrementByValue}>
                Decrement by Value
              </button>
            </td>
          </tr>
          <tr>
            {" "}
            <td></td>
            <td>
              <button onClick={reset}>Reset</button>
            </td>
          </tr>
        </table>
      </div>
      <div className="centered">
        <div className="beautiful-counter">Counter: {account}</div>
      </div>
    </div>
  );
}

export default App;
