export const makeImgPath = (imgURL : string, width : string = "w500") => {
  return `https://image.tmdb.org/t/p/${width}${imgURL}`;
}