function randomString(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function generateCheckoutData() {
  const suffix = `${Date.now()}${randomString(4)}`;

  return {
    firstName: `QA${suffix}`,
    lastName: `Test${randomString(5)}`,
    postalCode: String(Math.floor(10000 + Math.random() * 89999))
  };
}

module.exports = {
  generateCheckoutData
};
