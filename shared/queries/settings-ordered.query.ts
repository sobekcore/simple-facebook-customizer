export default `{
  "settings": *[_type=="section"]|order(orderRank) {
    title,
    options[]-> {
      label,
      name,
      selector,
      style,
      depends-> {
        name
      }
    }
  }
}`;
