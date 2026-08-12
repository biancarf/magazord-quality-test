const REQRES_BASE_URL = "https://reqres.in";
const GITHUB_BASE_URL = "https://api.github.com";

function getReqresHeaders() {
  const apiKey = Cypress.env("reqresApiKey");

  const headers = {
    "Content-Type": "application/json",
    "X-Reqres-Env": Cypress.env("reqresEnv") || "prod"
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  return headers;
}

function getGithubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2026-03-10"
  };
}

function getGithubToken() {
  return Cypress.env("githubToken");
}

function assertRateLimitHeaders(headers) {
  expect(headers).to.have.property("x-ratelimit-limit");
  expect(headers).to.have.property("x-ratelimit-remaining");
  expect(headers).to.have.property("x-ratelimit-reset");

  const limit = Number(headers["x-ratelimit-limit"]);
  const remaining = Number(headers["x-ratelimit-remaining"]);
  const reset = Number(headers["x-ratelimit-reset"]);

  expect(limit, "rate limit").to.be.greaterThan(0);
  expect(remaining, "remaining").to.be.at.least(0);
  expect(remaining, "remaining <= limit").to.be.at.most(limit);
  expect(reset, "reset timestamp").to.be.greaterThan(0);
}

function assertRateLimitExceeded(response) {
  expect([403, 429]).to.include(response.status);
  expect(response.headers["x-ratelimit-remaining"]).to.eq("0");
}

function isTokenExpired(tokenState, now = Date.now()) {
  if (!tokenState || !tokenState.token) {
    return true;
  }

  return now >= tokenState.expiresAt;
}

function getAuthToken(tokenState = null) {
  if (tokenState && !isTokenExpired(tokenState)) {
    return cy.wrap(tokenState);
  }

  return cy.request({
    method: "POST",
    url: `${REQRES_BASE_URL}/api/login`,
    headers: getReqresHeaders(),
    body: {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status, "login status").to.eq(200);
    expect(response.body).to.have.property("token");

    const ttlMs = 2 * 60 * 1000;

    return {
      token: response.body.token,
      issuedAt: Date.now(),
      expiresAt: Date.now() + ttlMs
    };
  });
}

module.exports = {
  REQRES_BASE_URL,
  GITHUB_BASE_URL,
  getReqresHeaders,
  getGithubHeaders,
  getGithubToken,
  assertRateLimitHeaders,
  assertRateLimitExceeded,
  isTokenExpired,
  getAuthToken
};
