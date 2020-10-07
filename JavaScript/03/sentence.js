const keywords = ["var", "const", "let", "class", "function", "for", "if", "return", "continue"];

function getKeywords() {
  return keywords.map(keyword => keyword.toUpperCase());
}

const tokenMatch = {
  whiteSpace: /(?:\s+|#.*|-- +.*|\/\*(?:[\s\S])*?\*\/)+/,
  equal: "=",
  semicolon: ";",
  doubleQuote: `"`,
  singleQuote: `'`,
  backtick: "`",
  keywords: getKeywords(),
  string: /[a-z0-9_]/i,
  unknown: /.+/
};

function tokenizer(input) {
  let current = 0;

  const tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (tokenMatch.whiteSpace.test(char)) {
      current++;
      continue;
    }

    if (char === tokenMatch.equal) {
      tokens.push({
        type: "equal",
        value: "=",
      });
      current++;
      continue;
    }

    if (char === tokenMatch.semicolon) {
      tokens.push({
        type: "semicolon",
        value: ";",
      });
      current++;
      continue;
    }

    if (char === tokenMatch.doubleQuote) {
      let value = "";

      char = input[++current];

      while (char !== tokenMatch.doubleQuote) {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: "doubleQuoteString", value });

      continue;
    }

    if (char === tokenMatch.singleQuote) {
      let value = "";

      char = input[++current];

      while (char !== tokenMatch.singleQuote) {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: "singleQuoteString", value });

      continue;
    }

    if (char === tokenMatch.backtick) {
      let value = "";

      char = input[++current];

      while (char !== tokenMatch.backtick) {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: "backtickString", value });

      continue;
    }

    if (tokenMatch.string.test(char)) {
      let value = "";

      while (tokenMatch.string.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "string", value });

      continue;
    }

    if (tokenMatch.unknown.test(char)) {
      let value = "";

      while (tokenMatch.unknown.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "unknown", value });

      continue;
    }

    current++;
  }

  tokens.forEach((token) => {
    if (isExtraString(token)) {
      token.type = "string";
    } else if (isStringKeyword(token)) {
      token.type = "keyword";
    }
  });

  return tokens;
}

function isExtraString(token) {
  if (!token) return false;
  return (
    token.type === "doubleQuoteString" ||
    token.type === "singleQuoteString" ||
    token.type === "backtickString"
  );
}

function isStringKeyword(token){
  if (!token) return false;
  const value = token.value.toUpperCase();
  return token.type === "string" && tokenMatch.keywords.includes(value);
}

function isSemicolon(token) {
  if (!token) return false;
  return token.type === "semicolon";
}

function keywordEqual(token, value) {
  return (
    token.type === "keyword" &&
    token.value.toUpperCase() === value.toUpperCase()
  );
}

const newStatementKeywords = ["var", "let", "const", "class", "function", "for", "if", "return"];
function isNewStatement(token) {
  if (!token) return false;
  return newStatementKeywords.some(keyword => keywordEqual(token, keyword));
}

function parser(tokens) {
  let current = 0;

  const tokenStatements = [];

  while (current < tokens.length) {
    let token = tokens[current];

    if (isNewStatement(token)) {
      const statement = [];

      statement.push(token);
      token = tokens[++current];

      while (
        current < tokens.length &&
        !isSemicolon(token) &&
        !isNewStatement(token)
      ) {
        statement.push(token);
        token = tokens[++current];
      }

      tokenStatements.push(statement);
    }

    if (token && isNewStatement(token)) {
      continue;
    }

    current++;
  }

  return tokenStatements;
}

function test() {
  const javaScript = `
    const a = "1"
    var b = '1'
    let c = 1
  `;

  const tokens = tokenizer(javaScript);
  const statements = parser(tokens);

  console.log("tokens", tokens);
  console.log("statements", statements);
}

test();