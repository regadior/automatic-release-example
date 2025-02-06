export default {
  '*.{js,ts}': [
    'prettier --check --ignore-unknown .',
    'eslint --cache --color',
    'cspell .',
    () => 'tsc --pretty --noEmit',
  ],
};
