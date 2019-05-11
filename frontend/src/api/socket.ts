import io from "socket.io-client";
import { default as serverAddress } from "./serverAddress";

export default io.connect(serverAddress);
