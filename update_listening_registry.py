import os

# Update index.js
index_path = os.path.join("src", "data", "listening", "tests", "index.js")
imports = []
exports = []

for i in range(1, 26):
    name = f"listeningTest{i:03d}"
    imports.append(f'import {name} from "./{name}";')
    exports.append(f'  {name},')

index_content = "\n".join(imports) + "\n\nexport default [\n" + "\n".join(exports) + "\n];\n"

with open(index_path, "w", encoding="utf-8") as f:
    f.write(index_content)

print(f"Updated {index_path} with 25 test entries.")

# Update listeningTests.js
main_path = os.path.join("src", "data", "listeningTests.js")
m_imports = []
m_exports = []

for i in range(1, 26):
    name = f"test{i:03d}"
    m_imports.append(f'import {name} from "./listening/tests/listeningTest{i:03d}";')
    m_exports.append(f'  {name},')

main_content = "\n".join(m_imports) + "\n\nconst listeningTests = [\n" + "\n".join(m_exports) + "\n];\n\nexport default listeningTests;\n"

with open(main_path, "w", encoding="utf-8") as f:
    f.write(main_content)

print(f"Updated {main_path} with 25 test entries.")
