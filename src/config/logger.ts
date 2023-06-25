// import { Logging } from "@google-cloud/logging";

// const projectId = "warehouse-389509"; // Your Google Cloud Platform project ID
// const logName = "my-logs"; // The name of the log to write to

// async function logger(
//   text: string,
// ) {
//   // Creates a client
//   const logging = new Logging({ projectId });

//   // Selects the log to write to
//   const log = logging.log(logName);

//   // The data to write to the log

//   // The metadata associated with the entry
//   const metadata = {
//     resource: { type: "global" },
//     // See: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
//     severity: "INFO",
//   };

//   // Prepares a log entry
//   const entry = log.entry(metadata, text);

//   async function writeLog() {
//     // Writes the log entry
//     await log.write(entry);
//     console.log(`Logged: ${text}`);
//   }
//   writeLog();
// }

// export default logger;

