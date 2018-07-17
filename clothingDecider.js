exports.decideClothing = function(temperature, units) {
  if (temperature < 10 && units === "metric") {
    return "You'll need a coat!";
  } else if (temperature < 19 && units === "metric") {
    return "You should probably take a hoodie";
  } else if (temperature > 20 && units === "metric") {
    return "Shorts and a shirt? You'll look amazing!"
  }
}
