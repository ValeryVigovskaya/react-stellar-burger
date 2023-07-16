import ReactLoading from "react-loading";
import loader from "./loader.module.css"

function Loader() {
  return (
    <div className={loader.container}>
      <ReactLoading type={"spin"}
       height={100} width={100} />
    </div>
  );
}

export default Loader;
