module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        'airbnb-typescript',
        "plugin:react/recommended"
    ],
    "ignorePatterns": [".eslintrc.cjs", "vite.config.ts", "dist"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            },
        },

    ],
    "parserOptions": {
        "project": './tsconfig.json',
        "ecmaVersion": "latest",
        "sourceType": "module",
        "plugin": "prettier/recommended"
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "react/function-component-definition": [
            2,
            {
                namedComponents: ["arrow-function", "function-declaration"],
                unnamedComponents: "arrow-function",
            },
        ],
        "consistent-return": "off"
    },
}
