const { createCanvas } = require("canvas");

exports.generateAvatar = function(user_name, foregroundColor, backgroundColor) {
  const canvas = createCanvas(200, 200)
  const context = canvas.getContext("2d");
  // Draw background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 100px";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";

  charDisplay = user_name.split(' ').slice(-1).join(' ').charAt(0).toUpperCase()

  context.fillText(charDisplay, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
}