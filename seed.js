const mongoose = require('mongoose')
const Genre = require("./genres");
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0
}
require('dotenv').config()
const {Schema, model} = require('mongoose')
const bandSchema = new Schema({
  genre: String,
  bandName: {type: String, unique: true},
  bandNameEnglish: String,
  pablosiki: Object,
  ssilochkinamuzlo: Object,
  gigs: Array,
  news: Array
})
const Band = model('Band', bandSchema)


function dbConnect() {
  mongoose.connect(process.env.DB_ATLAS_URL, options, (err) => {
    if (err) return console.log(err)
  })
}
dbConnect()

// function bandFabric() {
//   const bands = [
//     {
//       genre:  'рэп',
//       bandName: 'Шейм',
//       bandNameEnglish: 'Shame',
//       pablosiki:  {vk: 'https://vk.com/shamenshame', insta: 'https://www.instagram.com/shame.n.shame/'},
//       ssilochkinamuzlo: {vk: 'https://vk.com/artist/541909091171370338', yandex: 'https://music.yandex.ru/artist/7319042', spot: 'https://open.spotify.com/artist/4hvjbIXsJkHR3dzMCcFc1u'},
//       gigs: [{datentime: '23 мая 2021, 19:00', place: 'Бункер47', latitude: 55.7988843, longitude: 37.5312098}, {datentime: '27 декабря 2020, 19:00', place: 'Гараж34', latitude: 55.714287313832585, longitude: 37.69029378890992}],
//       news: ['а новостей нет', 'но вы держитесь']
//     },
//     {
//       genre:  'рэгги',
//       bandName: 'Миролюбивое Море',
//       bandNameEnglish: 'MirMore',
//       pablosiki:  {vk: 'https://vk.com/mirolubivoemore', insta: 'https://www.instagram.com/mirolubivoemore/'},
//       ssilochkinamuzlo: {vk: 'https://vk.com/artist/mirolyubivoemore', yandex: 'https://music.yandex.ru/artist/9320396', spot: 'https://open.spotify.com/artist/0GKO37O60jw63rD7nweBZn'},
//       gigs: [{datentime: '24 апреля 2021, 19:00', place: 'где-то в Новокосино', latitude: 55.7988843, longitude: 37.87025392055512}, {datentime: '18 опреля 2021, 19:00', place: 'PunkFiction', latitude: 55.7746059, longitude: 37.6709618}],
//       news: ['а новостей нет', 'но вы держитесь']
//     },
//     {
//       genre:  'рок',
//       bandName: 'Пар Культуры',
//       bandNameEnglish: "ParKulturi",
//       pablosiki:  {vk: 'https://vk.com/parkulturi', insta: 'https://www.instagram.com/par_kultury/'},
//       ssilochkinamuzlo: {vk: 'https://vk.com/artist/parkultury', yandex: 'https://music.yandex.ru/artist/7458304', spot: 'https://open.spotify.com/artist/5kVbi2CW7ETNbMRd0awxFY'},
//       gigs: [{datentime: '5 апреля 2021, 19:00', place: 'Bolivar bar', latitude: 55.76098374881016, longitude: 37.64075875282288}, {datentime: '28 марта 2021, 19:00', place: 'комбинатр', latitude: 55.75488938389049, longitude: 37.75138914585114}],
//       news: ['а новостей нет', 'но вы держитесь']
//     }
    
//   ]
//   return Promise.all(bands.map((data) => Band.create(data)))
// }

// function genreFabric() {
//   const genres = [
//     {genre: 'рок'},
//     {genre: 'рэп'},
//     {genre: 'рэгги'},
    
//   ]
//   return Promise.all(genres.map((data) => Genre.create(data)))
// }


// async function main() {
//   await bandFabric() 
//   await genreFabric()
// }
// main().then(() => {console.log('its work+')
// mongoose.disconnect()})

// module.exports = { bandFabric }
// module.exports = { genreFabric }
module.exports = Band
