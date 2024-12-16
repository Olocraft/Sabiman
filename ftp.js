const ftp = require("basic-ftp");
var config = {
  host: "xxxxxxxx", // give your FTP host name
  user: "xxxxxxxx", // give your FTP username
  password: "xxxxxxxx", // give your FTP password
  port: 21, // change this to 22 or anything else only if you are using SFTP or something else
  localRoot: __dirname + "/build",
  remoteRoot: "/",
  include: ["*", ".htaccess"],
  exclude: ["images/**"],
  deleteRemote: false,
};

// Define your FTP server settings
const ftpConfig = {
  host: config.host,
  user: config.user,
  password: config.password,
  secure: false, // Set to true if your FTP server requires secure connection (e.g., FTPS)
};

// Local path to your React app's build directory
const localBuildPath = "./build";

// Remote path on the FTP server where you want to deploy the app
const remoteDeployPath = "/";

async function deploy() {
  const client = new ftp.Client();

  try {
    // Connect to the FTP server
    await client.access(ftpConfig);

    // Upload all files from the local build directory to the remote directory
    await client.uploadFromDir(localBuildPath, remoteDeployPath, {
      baseDir: localBuildPath,
      overwrite: true,
      step: (info) => {
        console.log("info", info)
      },
    });

    // console.log("Deployment successful!");
  } catch (err) {
    console.error("Error deploying the app:", err);
  } finally {
    // Close the FTP connection
    client.close();
  }
}

deploy().then(() => "");
