module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "layer"],
      },
    ],
    "import-notation": "string",
    "selector-class-pattern": null,
    "declaration-block-single-line-max-declarations": null,
    "color-function-notation": null,
    "alpha-value-notation": null,
    "value-keyword-case": null,
    "no-descending-specificity": null,
    "rule-empty-line-before": null,
    "at-rule-empty-line-before": null,
    "media-feature-range-notation": null,
    "color-hex-length": null,
  },
};
