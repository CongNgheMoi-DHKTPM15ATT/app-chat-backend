const QRCode = require('qrcode')

function generateURL(id) {
  return `https://halo-chat.herokuapp.com/${id}`
}

exports.generateQR = async (id) => {
  try {
    String url = generateURL(id);
    console.log(await QRCode.toDataURL(text))
  } catch (err) {
    console.error(err)
  }
}

exports.generateURL = generateURL;