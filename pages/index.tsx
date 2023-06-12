import { useEffect, useState } from "react";
import RegexParser from "regex-parser";

import Pin from "@/components/Pin";
import axios from "axios";
import SuccessIcon from "@/components/SuccessIcon";

const Home = () => {
  const [pin, setPin] = useState("9999");
  const [pinLength, setPinLength] = useState(4);
  const [pinRegex, setPinRegex] = useState("/^\\d+$/");
  const [isSecretMode, setSecretMode] = useState(false);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (pin?.trim().length === pinLength) {
      setError(null);
      setMessage("");
      verifyPinCode(pin);
    }
  }, [pinLength, pin]);

  const verifyPinCode = (value: any) => {
    axios
      .post(
        "https://riokidstore.online/input-pin/",
        { pin: value, n_pin: pinLength },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setError(response?.data?.error);
        console.log(response?.data?.message)
        setMessage(response?.data?.message);
      })
      .catch((error) => {
        setError(error?.response?.data?.error);
        setMessage(error?.response?.data?.message);
      });
  };

  return (
    <div className="pin-container">
      <h1 className="main-title">PIN Input</h1>
      <div className="">
        <Pin
          value={pin}
          length={pinLength}
          isSecret={isSecretMode}
          regex={pinRegex ? new RegExp(RegexParser(pinRegex)) : ""}
          onChange={setPin}
        />

        <div className="request-status-container">
          {
            message && (
              <>
                <p className={`${error === true ? 'error' : 'success'}-message alert`}>{message}</p>
              </>
            )
          }
        </div>
      </div>
      <div className="pin-config-container">
        <h3>PIN Configuration</h3>
        <ul>
          <li>
            <label>PIN Length</label>
            <input
              type="number"
              name="pinLength"
              value={pinLength}
              onChange={(e) => setPinLength(parseInt(e.target.value, 10))}
            />
          </li>
          <li>
            <label>PIN Regex</label>
            <input
              type="text"
              name="pinRegex"
              value={pinRegex}
              onChange={(e) => setPinRegex(e.target.value)}
            />
          </li>
          <li>
            <label>Secret Mode</label>
            <input
              type="checkbox"
              name="secretMode"
              checked={isSecretMode}
              onChange={(e) => setSecretMode(!isSecretMode)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
