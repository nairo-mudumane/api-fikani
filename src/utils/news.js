const { isEmpty } = require("./empty");
const { formatUrlStr } = require("./url");

function checkNewsFields(news) {
  const errors = [];
  const msg = `must not be null`;

  if (isEmpty(news.title)) {
    errors.push(`title ${msg}`);
  }

  if (isEmpty(news.body)) {
    errors.push(`body ${msg}`);
  }

  if (isEmpty(news.author)) {
    errors.push(`author ${msg}`);
  }

  if (isEmpty(news.date)) {
    errors.push(`date ${msg}`);
  }

  if (isEmpty(news.media)) {
    errors.push(`no media provided or unsupported media`);
  }

  if (errors.length > 0) {
    throw new Error(errors.toString());
  } else {
    return true;
  }
}

function formatNews(news) {
  const { title, date } = news;
  const key = formatUrlStr(title).valid_url;
  const ISOStringDate = new Date(date).toISOString();

  const response = {
    ...news,
    date: ISOStringDate,
    key,
  };

  return response;
}

module.exports = {
  formatNews,
  checkNewsFields,
};
