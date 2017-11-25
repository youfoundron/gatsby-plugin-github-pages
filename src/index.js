const { URL } = require('url')
const { rimraf } = require('rimraf')
const { resolve } = require('path')
const { publish } = require('gh-pages')
const { writeFile } = require('fs')
const { promisify } = require('bluebird')

const publishAsync = promisify(publish)
const writeFileAsync = promisify(writeFile)
const rimrafAsync = promisify(rimraf)

const publicDir = resolve(__dirname, 'public')
const CNAMEPath = resolve(publicDir, 'CNAME')

exports.onPostBuild = async function (_, pluginOptions, cb) {
  const { customDomain, publishOptions } = pluginOptions

  // add a CNAME file to ./public
  // https://help.github.com/articles/troubleshooting-custom-domains/#the-cname-file-isnt-properly-formatted
  if (customDomain) {
    const { hostname } = new URL(customDomain)
    await writeFileAsync(CNAMEPath, hostname)
  }

  // publish the site to github pages
  // https://github.com/tschaub/gh-pages#options
  try {
    await publishAsync(publicDir, publishOptions)
  } catch (err) {
    console.error(err)
    throw new Error('Deploy to GitHub Pages was unsuccessful')
  }

  // remove the CNAME file from ./public
  // https://github.com/isaacs/rimraf
  await rimrafAsync(CNAMEPath)

  // continue plugin execution
  return cb()
}
