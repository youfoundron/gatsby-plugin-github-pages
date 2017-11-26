const { URL } = require('url')
const rimraf = require('rimraf')
const { resolve } = require('path')
const { publish } = require('gh-pages')
const { writeFile } = require('fs')
const { promisify } = require('bluebird')
const report = require('gatsby-cli/lib/reporter')

const publishAsync = promisify(publish)
const writeFileAsync = promisify(writeFile)
const rimrafAsync = promisify(rimraf)

function reportFailure (msg, err) {
  report.log(``)
  report.panic(msg, err)
}

exports.onPostBuild = async function (_, pluginOptions, cb) {
  const rootPath = resolve('public')
  const CNAMEPath = resolve(rootPath, 'CNAME')
  const { customDomain, publishOptions } = pluginOptions

  let activity
  activity = report.activityTimer(`Deploying to GitHub Pages`)
  activity.start()

  try {
    // add a CNAME file to ./public
    // https://help.github.com/articles/troubleshooting-custom-domains/#the-cname-file-isnt-properly-formatted
    if (customDomain) {
      const { hostname } = new URL(customDomain)
      await writeFileAsync(CNAMEPath, hostname)
    }
    // publish the site to github pages
    // https://github.com/tschaub/gh-pages#options
    await publishAsync(rootPath, publishOptions)
    // remove the CNAME file from ./public
    // https://github.com/isaacs/rimraf
    await rimrafAsync(CNAMEPath)
  } catch (err) {
    reportFailure('Deploying to GitHub Pages failed', err)
  }

  // continue plugin execution
  activity.end()
  return cb()
}
