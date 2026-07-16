const investigation = {
  status: "Critical",

  summary:
    "Multiple failed login attempts were detected from an external IP address followed by a successful authentication attempt.",

  mitre: "T1110 - Brute Force",

  confidence: "96%",

  actions: [
    "Block the source IP address",
    "Force password reset",
    "Enable Multi-Factor Authentication",
  ],
};

export default investigation;