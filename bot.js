require('dotenv').config()
const mongoose = require('mongoose')
const Band = require("./seed");
const User = require("./user");

mongoose.connect(
  process.env.DB_ATLAS_URL,
  {useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false},
  () => {
    console.log("Hello there, motherbase");
  }
);

const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN, { polling: true })



bot.start(async (msg) => {
  let user_id = msg.from.id;
  const user = await User.findOne({tgID: user_id})
  if (user === null) {
    const me = await User.create({tgID: user_id})
  }
  msg.reply('Привет и добро пожаловать в наше сырое подземелье! В покемонов играл когда-нибудь? Так вот...\nТы выбираешь жанр, а я тебе - твою первую группу. \n Что слушаешь, что хочешь послушать, с чего начнём, короче?',
  {"reply_markup": { "keyboard": [ [{"text": "рэп"}], [{ "text": "рок"}], [{ "text": "рэгги"}] ], }
})});


bot.hears('рэп', async (msg) => {
  const theBand = await Band.findOne({genre: 'рэп'})
  const meeeee = await User.findOne({tgID: msg.from.id})
  console.log(meeeee);
  const me = await User.findOneAndUpdate({tgID: msg.from.id}, {mybands: theBand})
  msg.reply(`Классный выбор! Начнём с ${theBand.bandName}. Хочешь послушать их прямо сейчас? Или зайди в свой /lichnii_kabinet и посмотри более подробную инфу об этих ребятах!`,
    {'reply_markup': JSON.stringify({
      hide_keyboard: true
    })}
  )
})

bot.hears('рэгги', async (msg) => {
  const theBand = await Band.findOne({genre: 'рэгги'})
  const meeeee = await User.findOne({tgID: msg.from.id})
  console.log(meeeee);
  const me = await User.findOneAndUpdate({tgID: msg.from.id}, {mybands: theBand})
  msg.reply(`Классный выбор! Начнём с ${theBand.bandName}. Хочешь послушать их прямо сейчас? Или зайди в свой /lichnii_kabinet и посмотри более подробную инфу об этих ребятах!`,
    {'reply_markup': JSON.stringify({
      hide_keyboard: true
    })}
  )
})

bot.hears('рок', async (msg) => {
  const theBand = await Band.findOne({genre: 'рок'})
  const meeeee = await User.findOne({tgID: msg.from.id})
  console.log(meeeee);
  const me = await User.findOneAndUpdate({tgID: msg.from.id}, {mybands: theBand})
  msg.reply(`Классный выбор! Начнём с ${theBand.bandName}. Хочешь послушать их прямо сейчас? Или зайди в свой /lichnii_kabinet и посмотри более подробную инфу об этих ребятах!`,
    {'reply_markup': JSON.stringify({
      hide_keyboard: true
    })}
  )
})

bot.hears('Да', async (msg) => {
  const me = await User.findOne({tgID: msg.from.id})
  msg.reply(`VK: ${me.mybands.ssilochkinamuzlo.vk}\nYandex.music: ${me.mybands.ssilochkinamuzlo.yandex}\nSpotify: ${me.mybands.ssilochkinamuzlo.spot}\n`)
})

bot.command('/lichnii_kabinet', async (msg) => {
  const me = await User.findOne({tgID: msg.from.id})
  msg.reply('Чем заинтересовался?',
  {"reply_markup": { "keyboard": [ [{"text": "Мои группы"}], [{ "text": "Мои ачивки"}], [{"text": "Куда я хотел сходить"}] ], }
})})

bot.hears('Мои группы', async (msg) => {
  const me = await User.findOne({tgID: msg.from.id})
  // console.log(me.mybands.length);
  if (me.mybands.length - 1 === 0){
    msg.reply(`${me.mybands[0].bandName}\n/${me.mybands[0].bandNameEnglish}_more_info`)
  } else {
    msg.reply('pusto ili slishkom mnogo')
  }
})

bot.hears('Мои ачивки', async (msg) => {
  const me = await User.findOne({tgID: msg.from.id})
  const achiv = me.achievements
  if (achiv === undefined) {
    msg.reply('Пусто? Рассказать, за что мы выдаём достижения?',
    {"reply_markup": { "keyboard": [ [{"text": "/rasskaji"}], [{ "text": "Нет"}] ], }
  })
  } else {
    msg.reply(`${achiv}`)
  }
})

bot.hears('Куда я хотел сходить', async (msg) => {
  const me = await User.findOne({tgID: msg.from.id})
  const gigs = me.mygigs
  if (gigs.length === 0) {
    msg.reply('Пусто? Может, сходишь куда-нибудь? Гиги, на которые можно сходить, можно найти по группа -> больше инфы -> гиги. Дерзай!',
    {"reply_markup": { "keyboard": [ [{"text": "Мои группы"}], [{ "text": "Нет"}] ], }
  })
  } else {
    msg.reply(`${gigs}`)
  }
})

bot.hears('Нет', (msg) => {
  msg.reply('Ну ладненько, дело твоё', {'reply_markup': JSON.stringify({
    hide_keyboard: true
  })}
)
})

bot.command('/Shame_more_info', async (msg) => {
  const theBand = await Band.findOne({bandName: 'Шейм'})
  msg.reply(`Название: ${theBand.bandName}\n\nСоцсети:\nvk - ${theBand.pablosiki.vk}\ninsta - ${theBand.pablosiki.insta}\n\nМузло:\nvk: ${theBand.ssilochkinamuzlo.vk}\nyandex.music: ${theBand.ssilochkinamuzlo.yandex}\nspotify: ${theBand.ssilochkinamuzlo.spot}\n\nБлижайште концы, гиги и фестивали: /Shame_gigs\nИ прочие новости: /Shame_news`,
  {'reply_markup': JSON.stringify({
    hide_keyboard: true
  })})
})

bot.command('/Shame_gigs', async(msg) => {
  const theBand = await Band.findOne({bandName: 'Шейм'})
  msg.reply('Чтобы посмотреть расположение бара/клуба на карте, нажми на нужный гиг',
  {"reply_markup": { "keyboard": [ [{"text":  `${theBand.gigs[0].datentime}\n${theBand.gigs[0].place}`}], [{ "text": `${theBand.gigs[1].datentime}\n${theBand.gigs[1].place}`}] ], }})
})

bot.hears('23 мая 2021, 19:00\nБункер47',async (ctx) => {
  const theBand = await Band.findOne({bandName: 'Шейм'})
  ctx.telegram.sendLocation(ctx.chat.id, latitude = theBand.gigs[0].latitude, longitude = theBand.gigs[0].longitude, reply_to_message_id = null, chat_id = null)
  ctx.reply('Придёшь?',
  {"reply_markup": { "keyboard": [ [{"text": "/da"}], [{ "text": "Нет"}] ], }}
  )
})

bot.hears('27 декабря 2020, 19:00\nГараж34',async (ctx) => {
  const theBand = await Band.findOne({bandName: 'Шейм'})
  ctx.telegram.sendLocation(ctx.chat.id, latitude = theBand.gigs[1].latitude, longitude = theBand.gigs[1].longitude, reply_to_message_id = null, chat_id = null)
  ctx.reply('Придёшь?',
  {"reply_markup": { "keyboard": [ [{"text": "/da"}], [{ "text": "Нет"}] ], }}
  )
})

bot.command('/Shame_news', async(msg) => {
  const theBand = await Band.findOne({bandName: 'Шейм'})
  msg.reply(`${theBand.news[0]}\n${theBand.news[1]}`,
  {'reply_markup': JSON.stringify({
    hide_keyboard: true
  })})})
  
  
  
  
bot.command('/MirMore_more_info', async (msg) => {
  const theBand = await Band.findOne({bandName: 'Миролюбивое Море'})
  msg.reply(`Название: ${theBand.bandName}\n\nСоцсети:\nvk - ${theBand.pablosiki.vk}\ninsta - ${theBand.pablosiki.insta}\n\nМузло:\nvk: ${theBand.ssilochkinamuzlo.vk}\nyandex.music: ${theBand.ssilochkinamuzlo.yandex}\nspotify: ${theBand.ssilochkinamuzlo.spot}\n\nБлижайште концы, гиги и фестивали: /MirMore_gigs\nИ прочие новости: /MirMore_news`,
  {'reply_markup': JSON.stringify({
    hide_keyboard: true
  })})
})

bot.command('/MirMore_gigs', async(msg) => {
  const theBand = await Band.findOne({bandName: 'Миролюбивое Море'})
  msg.reply('Чтобы посмотреть расположение бара/клуба на карте, нажми на нужный гиг',
  {"reply_markup": { "keyboard": [ [{"text":  `${theBand.gigs[0].datentime}\n${theBand.gigs[0].place}`}], [{ "text": `${theBand.gigs[1].datentime}\n${theBand.gigs[1].place}`}] ], }})
})

bot.hears('24 апреля 2021, 19:00\nгде-то в Новокосино',async (ctx) => {
  const theBand = await Band.findOne({bandName: 'Миролюбивое Море'})
  ctx.telegram.sendLocation(ctx.chat.id, latitude = theBand.gigs[0].latitude, longitude = theBand.gigs[0].longitude, reply_to_message_id = null, chat_id = null)
  ctx.reply('Придёшь?',
  {"reply_markup": { "keyboard": [ [{"text": "/da"}], [{ "text": "Нет"}] ], }}
  )
})

bot.hears('18 опреля 2021, 19:00\nPunkFiction',async (ctx) => {
  const theBand = await Band.findOne({bandName: 'Миролюбивое Море'})
  ctx.telegram.sendLocation(ctx.chat.id, latitude = theBand.gigs[1].latitude, longitude = theBand.gigs[1].longitude, reply_to_message_id = null, chat_id = null)
  ctx.reply('Придёшь?',
  {"reply_markup": { "keyboard": [ [{"text": "/da"}], [{ "text": "Нет"}] ], }}
  )
})

bot.command('/MirMore_news', async(msg) => {
  const theBand = await Band.findOne({bandName: 'Миролюбивое Море'})
  msg.reply(`${theBand.news[0]}\n${theBand.news[1]}`
)})



bot.command('/ParKulturi_more_info', async (msg) => {
  const theBand = await Band.findOne({bandName: 'Пар Культуры'})
  msg.reply(`Название: ${theBand.bandName}\n\nСоцсети:\nvk - ${theBand.pablosiki.vk}\ninsta - ${theBand.pablosiki.insta}\n\nМузло:\nvk: ${theBand.ssilochkinamuzlo.vk}\nyandex.music: ${theBand.ssilochkinamuzlo.yandex}\nspotify: ${theBand.ssilochkinamuzlo.spot}\n\nБлижайште концы, гиги и фестивали: /ParKulturi_gigs\nИ прочие новости: /ParKulturi_news`,
  {'reply_markup': JSON.stringify({
    hide_keyboard: true
  })})
})

bot.command('/ParKulturi_gigs', async(msg) => {
  const theBand = await Band.findOne({bandName: 'Пар Культуры'})
  msg.reply('Чтобы посмотреть расположение бара/клуба на карте, нажми на нужный гиг',
  {"reply_markup": { "keyboard": [ [{"text":  `${theBand.gigs[0].datentime}\n${theBand.gigs[0].place}`}], [{ "text": `${theBand.gigs[1].datentime}\n${theBand.gigs[1].place}`}] ], }})
})

bot.hears('5 апреля 2021, 19:00\nBolivar bar',async (ctx) => {
  const theBand = await Band.findOne({bandName: 'Пар Культуры'})
  ctx.telegram.sendLocation(ctx.chat.id, latitude = theBand.gigs[0].latitude, longitude = theBand.gigs[0].longitude, reply_to_message_id = null, chat_id = null)
  ctx.reply('Придёшь?',
  {"reply_markup": { "keyboard": [ [{"text": "/da"}], [{ "text": "Нет"}] ], }}
)})

bot.hears('28 марта 2021, 19:00\nкомбинатр', async(ctx) => {
  const theBand = await Band.findOne({bandName: 'Пар Культуры'})
  ctx.telegram.sendLocation(ctx.chat.id, latitude = theBand.gigs[1].latitude, longitude = theBand.gigs[1].longitude, reply_to_message_id = null, chat_id = null)
  ctx.reply('Придёшь?',
  {"reply_markup": { "keyboard": [ [{"text": "/da"}], [{ "text": "Нет"}] ], }}
)})

bot.command('/ParKulturi_news', async(msg) => {
  const theBand = await Band.findOne({bandName: 'Пар Культуры'})
  msg.reply(`${theBand.news[0]}\n${theBand.news[1]}`)})

bot.command('/da', (msg) => {
msg.reply('Класс! Будем ждать!', {'reply_markup': JSON.stringify({
  hide_keyboard: true
})})})

bot.hears('🤘', async (msg) => {
  const goats = ['https://storage.yandexcloud.net/moskvichmag/uploads/2019/09/shutterstock_232125613.jpg',
                 'https://hi-news.ru/wp-content/uploads/2014/03/Goat-750x477.jpg',
                 'https://cdn23.img.ria.ru/images/18527/59/185275913_0:47:500:328_600x0_80_0_0_0fd813bc3e8e422dd44438f4ae3db25e.jpg',
                 'https://i.ytimg.com/vi/JCSl3q2MwrI/maxresdefault.jpg',
                 'https://avatars.mds.yandex.net/get-zen_doc/1931555/pub_5cf1f19a84b0e900aee28798_5cf1f1dffce1b400af9d250e/scale_1200',
                 'https://www.agroxxi.ru/images/photos/large/article36104.jpg',
                 'https://cs10.pikabu.ru/post_img/2020/07/30/11/1596135993189667654.jpg',
                 'https://www.openbusiness.ru/upload/iblock/891/razvedenie-koz.jpg',
                 'https://syzran-small.ru/images/news/20190428-koza1.jpg',
                 'https://www.agroxxi.ru/images/photos/medium/article89849.jpg',
                 'https://lh3.googleusercontent.com/proxy/tBcgr7pFMpmXm56vAx6V-UMJ-S_QLhEm7-oYdH4m1RoBvwfqxPZ-K6gBQBjyPcL19zatiiARsyo2DH37rbiRFo6LwcFrJIewQWasTYYuX2NPQ8IntLnZ9sm1TE22MBPUXA9hU9n5siezVw6-d949LrkUyXNTAgSyIpinKk2dbBppH4S1DOWQQxyFN7WTtpQNtnWnK2nyHk380cy8BSNdRKxQf-Ba44HM3Q-sP5DA',
                 'https://static5.depositphotos.com/1030629/534/i/600/depositphotos_5344901-stock-photo-funny-goat-puts-out-its.jpg',
                 'https://s00.yaplakal.com/pics/pics_original/0/1/6/12334610.jpg'] 
  let num = Math.floor(Math.random() * goats.length);
  let theGoat = goats[num]
  if (num === goats.length-1) {
    msg.replyWithPhoto(theGoat)
    msg.reply('Ого! Тебе выпала рарная коза гулаби!\n🔥🔥🔥\nЧекни свои ачивки.')
    // const me = await User.findOneAndUpdate({tgID: msg.from.id})
    // const ach=me.achievements
    // ach.push({"🐐": 'За ловлю рарной козы гулаби!'})
  } else {
    msg.replyWithPhoto(theGoat)
    msg.reply('🤘')
  }
})

bot.hears('Го задачку', (msg) => {
  msg.reply('Все псы попадают в...')
})

bot.hears('Сибирь', async (msg) => {
  // const me = await User.findOneAndUpdate({tgID: msg.from.id})
  // const ach=me.achievements
  // ach.push({"🐶": 'Все псы попадают в Сибирь, а мы попадём на гиг.(с)Шеймы, Гиг на небесах'})
  msg.reply('А ты шаришь!\nЧекни свои ачивки.')
})

bot.help((ctx) => ctx.reply('/start\nХочешь начать свой путь по открытию для себя русского андерграунда с другой точки? Тебе сюда!\n\n/lichnii_kabinet\nЛичный кабинет. Просто личный кабинет.\n\nэй -> тебя как звать? -> и пр.\nМини-игра для любителей, ценителей и искушённых знатоков подземельской классики🤙🤙🤙\n\n🤘\nНу тут лишних слов не нужно.'))

bot.hears('Эй', (ctx) => ctx.reply('Слушаю'))
bot.hears('Тебя как звать?', (ctx) => ctx.reply('Тони'))
bot.hears('Нахуй пошёл, Тони', (ctx) => ctx.reply('Ты иди нахуй! тебя как звать?'))
bot.hears('Иезикиль', (ctx) => ctx.reply('Иезикиль? ну и уёбищное же имя'))


bot.launch()
