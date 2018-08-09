import debugLog from "../../../src/debug-log";

export default function DbClientManager(
  Client,
  clientConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
) {
  let _client = null;

  if (typeof Client === "undefined") {
    throw debugLog(new Error("1st argument 'Client' required (Dependency Injection)"), "db");
  }

  const connect = async function connect() {
    let client = retrieveClient();
    if (client === null) {
      try {
        client = new Client(clientConfig);
        await client.connect();
        saveClient(client);
        debugLog("test:integration:db", "client successfully connected");
      } catch (err) {
        debugLog(err, "test:integration:db", "failed to connect client!");
      }
    } else {
      debugLog("test:integration:db", "use existing client connection");
    }
    return client;
  };

  const disconnect = async () => {
    const client = retrieveClient();
    if (client !== null) {
      try {
        await client.end();
        saveClient(client);
        debugLog("test:integration:db", "client successfully disconnected");
      } catch (err) {
        debugLog(err, "test:integration:db", "failed to disconnect client!");
      }
    } else {
      debugLog("test:integration:db", "client not found to disconnect");
    }
    return client;
  };

  const query = async (text, params) => {
    let client = retrieveClient();
    try {
      client = await connect();
    } catch (err) {
      debugLog(err, "test:integration:db", "client query failed!");
    }
    return client.query(text, params);
  };

  const saveClient = (client) => {
    client.on("error", (err) => {
      debugLog(err, "test:integration:db", "an unknown error has occurred!");
    });
    client.on("end", () => {
      debugLog("test:integration:db", "client is disconnecting...");
    });
    client.on("notice", (msg) => {
      debugLog("test:integration:db", msg);
    });

    _client = client;
    return client;
  };
  const retrieveClient = () => _client;

  return Object.freeze({
    query,
    disconnect,
  });
}
