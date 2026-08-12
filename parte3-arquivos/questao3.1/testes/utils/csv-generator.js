const fs = require("fs");
const path = require("path");

function buildRow(index) {
  return [
    `Pessoa ${index}`,
    `qa${index}@example.com`,
    18 + (index % 60),
    `Cidade ${index % 20}`
  ];
}

function generateCsv(rowCount) {
  const header = ["nome", "email", "idade", "cidade"];
  const rows = [header];

  for (let i = 1; i <= rowCount; i += 1) {
    rows.push(buildRow(i));
  }

  return rows.map((row) => row.join(",")).join("\n");
}

function writeCsvFile(rowCount, fileName = `generated-${rowCount}.csv`) {
  const targetDir = path.resolve("parte3-arquivos/questao3.1/testes/fixtures/generated");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);
  fs.writeFileSync(filePath, generateCsv(rowCount), "utf8");

  return filePath;
}

module.exports = {
  generateCsv,
  writeCsvFile
};
