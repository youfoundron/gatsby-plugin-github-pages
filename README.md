# Gatsby Plugin GitHub Pages
A Gatsby plugin that deploys your public folder to Github Pages on build.  

With no configuration the destination is root to a `gh-pages` branch on the current repository.  

The branch, directory, and repository my all be changed via the `publishOptions` config.  

The Gatsby site in the example directory is hosted at  [https://rongierlach.github.io/gatsby-plugin-github-pages](https://rongierlach.github.io/gatsby-plugin-github-pages).  

## Install
`$ npm install gatsby-plugin-github-pages`

## Usage
Place the plugin *last* in your plugins array.  

#### **[User and Organization Pages](https://help.github.com/articles/user-organization-and-project-pages/#project-pages)**
If you are using a custom domain for your page you must specify it in the `gatsby-config.js` file like so:
```javascript
module.exports = {
  plugins: [
    /* other plugins */
    {
      resolve: 'gatsby-plugin-github-pages'
      options: {
        customDomain: 'mycustomdomain.com'
        publishOptions: {
          /* ... */
        }
      }
    }
  ]
}
```

#### **[Project Pages](https://help.github.com/articles/user-organization-and-project-pages/#project-pages)**
You must build with the prefix-paths flag like so:  
`$ gatsby build --prefix-paths`  

You must also specify a [`pathPrefix`](https://www.gatsbyjs.org/docs/path-prefix/) in your `gatsby-config.js` file:
```javascript
module.exports = {
  pathPrefix: '/name-of-your-repo',
  plugins: [
    /* other plugins */
    {
      resolve: 'gatsby-plugin-github-pages'
      options: {
        publishOptions: {
          /* ... */
        }
      }
    }
  ]
}
```

## Publish Options
The plugin uses `gh-pages` internally, publish options can be found in greater detail [here](https://github.com/tschaub/gh-pages#options).
