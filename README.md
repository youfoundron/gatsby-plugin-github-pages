# Gatsby Plugin GitHub Pages
A Gatsby plugin that deploys your build to Github Pages.

## Install
`$ npm install gatsby-plugin-github-pages`

## Usage
In your `gatsby-config.js` file:
```javascript
module.exports = {
  plugins: [
    /* ... */
    {
      resolve: 'gatsby-plugin-github-pages'
      options: {
        customDomain: 'mycustomdomain.com', // optional
        publishOptions: {                   // defaults
          src: '**/*',
          branch: 'gh-pages',
          dest: '.',
          repo: 'https://example.com/other/repo.git'
          // ...
        }
      }
    }
  ]
}
```

## Publish Options
The plugin uses `gh-pages` internally, publish options can be found in greater detail [here](https://github.com/tschaub/gh-pages#options).
