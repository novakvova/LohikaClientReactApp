import classnames from "classnames"
import { useTypedSelector } from '../../hooks/useTypedSelector';

import "./index.css"

const FleshMessages = () => {
	const { messages } = useTypedSelector( store => store.fleshMessages);
	return (
    <>
      {messages.map(({ type, message }, idx) => (
        <div className="row" key={idx}>
          <div className="col-3 "></div>
          <div
            className={classnames("alert text-center col-6 flesh", {
              "alert-success": type === "success",
              "alert-danger": type === "error",
            })}
          >
            {message}
          </div>
          <div className="col-3"></div>
        </div>
      ))}
    </>
  );
}

export default FleshMessages;