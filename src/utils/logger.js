// src/utils/logger.js
const logger = {
  log: (msg) => {
    const logData = `[${new Date().toISOString()}] ${msg}`;
    // Save to localStorage or mock external service
    let logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push(logData);
    localStorage.setItem("logs", JSON.stringify(logs));
  },
};

export default logger;
