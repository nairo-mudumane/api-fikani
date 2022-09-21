function isValidYear(year) {
  if (year) {
    if (year >= 2020 && year <= 2022) {
      return true;
    }
  }
  return false;
}

function createYoutubeUrlId(url) {
  const youTubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const matchId = url.match(youTubeRegex);
  const embedId = matchId && matchId[1];
  return embedId;
}

module.exports = {
  isValidYear,
  createYoutubeUrlId,
};
