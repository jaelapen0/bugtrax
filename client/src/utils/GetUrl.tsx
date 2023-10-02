export const getUrl = () => {
  const url = window.location.href.split('/')
  const id = url[url.length-1]
  return id;
}
