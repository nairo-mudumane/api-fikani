const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

async function getEmailTemplate(filename, data) {
  const ejs_html = await new Promise((resolve, reject) => {
    return ejs.renderFile(filename, data, (error, htmlString) => {
      if (error) {
        return reject(error);
      }
      return resolve(htmlString);
    });
  });

  fs.writeFile(`${path.resolve(`${filename}.html`)}`, ejs_html, (err) => {
    if (err) {
      throw err;
    }
  });
  // const html_file = fs.readFileSync(`${filename}.html`, "utf-8");

  return ejs_html;
}

module.exports = {
  getEmailTemplate,
};
