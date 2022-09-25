# eslint-plugin-import-path-plus

import path rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-import-path-plus`:

```sh
npm install eslint-plugin-import-path-plus --save-dev
```

## Usage

Add `import-path-plus` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["import-path-plus"]
}
```

Then configure the rules you want to use under the rules section.

```javascript
{
    "rules": {
        "import-path-plus/no-internal-modules": [
            "error",
            {
                target: "**/.umi/**",
                replace: "umi"
            },
            {
                target: "umi",
                replace: "@/utils/router",
                modules: ["Link", "useHistory"]
            }
        ]
    }
}
```

## Supported Rules

- no-internal-modules
