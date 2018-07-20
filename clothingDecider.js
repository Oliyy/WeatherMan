exports.decideClothing = function(temperature, units) {
    if (temperature < 10 && units === "metric") {
    let ops = ["You'll need a coat!", "Make sure to bring your coat!", "Better get that coat"]
    return ops[Math.floor(Math.random() * ops.length)];
  } else if (temperature < 19 && units === "metric") {
    let ops = ["You should probably take a hoodie", "Take something warm, just in case :)", "Looks like a precautionary sweater is needed"]
    return ops[Math.floor(Math.random() * ops.length)];
  } else if (temperature > 20 && units === "metric") {
    let ops = ["Shorts and a shirt? You'll look amazing!", "No warm clothing required today! :)", "Hot, hot, hot! No hoodie needed :)"]
    return ops[Math.floor(Math.random() * ops.length)];
  }
}
