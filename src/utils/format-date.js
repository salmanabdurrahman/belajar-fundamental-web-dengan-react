function showFormattedDate(date, locale = "id") {
  const mappedLocale = locale === "en" ? "en-US" : "id-ID";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(mappedLocale, options);
}

export default showFormattedDate;
