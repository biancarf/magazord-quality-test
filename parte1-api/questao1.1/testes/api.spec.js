const {
  REQRES_BASE_URL,
  GITHUB_BASE_URL,
  getReqresHeaders,
  getGithubHeaders,
  getGithubToken,
  assertRateLimitHeaders,
  assertRateLimitExceeded,
  isTokenExpired,
  getAuthToken
} = require("./utils/api-helper");

describe("Questão 1.1 - API", () => {
  it("deve validar os headers de rate limiting do GitHub", () => {
    const headers = getGithubHeaders();
    const token = getGithubToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    cy.request({
      method: "GET",
      url: `${GITHUB_BASE_URL}/users/github`,
      headers,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      assertRateLimitHeaders(response.headers);
      expect(response.body).to.have.property("login", "github");
    });
  });

  it("deve detectar de forma determinística uma resposta de rate limit excedido", () => {
    const simulatedResponse = {
      status: 403,
      headers: {
        "x-ratelimit-remaining": "0",
        "x-ratelimit-reset": String(Math.floor(Date.now() / 1000) + 60)
      }
    };

    expect(() => assertRateLimitExceeded(simulatedResponse)).not.to.throw();
  });

  it("deve obter um token e reutilizá-lo enquanto estiver válido", () => {
    getAuthToken().then((tokenState) => {
      expect(tokenState.token).to.be.a("string").and.not.be.empty;
      expect(isTokenExpired(tokenState)).to.eq(false);

      return cy.request({
        method: "GET",
        url: `${REQRES_BASE_URL}/api/users/2`,
        headers: {
          ...getReqresHeaders(),
          Authorization: `Bearer ${tokenState.token}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
      });
    });
  });

  it("deve detectar expiração do token sem esperar o TTL real", () => {
    const expiredToken = {
      token: "simulated-token",
      issuedAt: Date.now() - 3 * 60 * 1000,
      expiresAt: Date.now() - 1
    };

    expect(isTokenExpired(expiredToken)).to.eq(true);
  });
});
