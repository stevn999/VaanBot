var tmi = require("tmi.js");
//var mineflayer = require('mineflayer');
//var banned = []


var veryBanned = [""]
var banned = ["magma_block", "wither_rose", "jigsaw", "kelp_plant", "brain_coral_block", "brain_coral_fan",
  "brain_coral_wall_fan", "bubble_coral_block", "bubble_coral_fan", "bubble_coral_wall_fan", "dead_brain_coral_block",
  "dead_brain_coral_fan", "dead_brain_coral_wall_fan", "dead_bubble_coral_block", "dead_bubble_coral_fan",
  "dead_bubble_coral_wall_fan", "dead_fire_coral_block", "dead_fire_coral_fan", "dead_fire_coral_wall_fan",
  "dead_horn_coral_block", "dead_horn_coral_fan", "dead_horn_coral_wall_fan", "dead_tube_coral_block",
  "dead_tube_coral_fan", "dead_tube_coral_wall_fan", "fire_coral_block", "fire_coral_fan", "fire_coral_wall_fan",
  "horn_coral_block", "horn_coral_fan", "horn_coral_wall_fan", "tube_coral_block", "tube_coral_fan",
  "tube_coral_wall_fan", 'end_portal_frame', 'bedrock', 'cave_air', 'void_air', 'moving_piston', 'piston_head',
  'tall_seagrass', 'bubble_column', 'lava', 'flowing_lava', 'end_portal', 'fire', 'barrier', 'structure_block',
  'repeating_command_block', 'chain_command_block', 'structure_void', 'mob_spawner', 'spawner', 'command_block'
]
var infor = require("./info")
console.log('\033[2J');
var blocks = require("./blocks")
var colors = ["blue", "yellow", "red", "green", "white", "dark_blue", "dark_red", "dark_aqua"]
var sleep = false
var banMode = 2 //0=allow, 1=stone, 2= place random
var userT = infor.user
var passT = infor.pass
var rateLimit = 1 * 2000
var users = []
var pc = 1
class User {
  constructor(name, lastMessage) {
    this.name = name;
    this.last = lastMessage;
  }
}
var options = {
  options: {
    debug: false
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: userT,
    password: passT
  },
  channels: ["vaanultra"]
}
class Bot {
  constructor() {

  }
  chat(msg) {
    //console.log(msg);
    bot.write('chat', {
      message: msg
    });
  }
  on(def) {

  }
}
cbot = new Bot // Connect the client to the server..

var client = new tmi.client(options)
client.connect();

var mc = require('minecraft-protocol');
var bot = mc.createClient({
  host: "localhost", // optional
  port: 25565, // optional
  username: infor.mcuser,
  password: infor.mcpass
});
bot.on('login', (a) => {
  cbot.chat("/tp @p 0 200 0")
  cbot.chat("/gamemode spectator")
  cbot.chat("/gamerule sendCommandFeedback false")
  cbot.chat("ready")
  //
})

bot.on('chat', function (packet) {

  // Listen for chat messages and echo them back.
  var jsonMsg = JSON.parse(packet.message);

  if (username === bot.username) return;
  try {
    var username = jsonMsg.with[0].text;
  } catch (e) {} finally {}
  if (username) {
    console.log(`<${username}> ${jsonMsg.with[1]}`);
  }
});

client.on('connected', function (address, port) {
  console.log("connected to twitch")
});
client.setMaxListeners(512)
client.on("chat", function (channel, userstate, message, self) {
  // Don't listen to my own messages..
  var ch = channel
  var command = "";
  if (self) return;
  var username = userstate.username

  //console.log(message);
  //console.log(userstate);
  if (userstate.usertype == 'mod' || '#' + userstate.username == (ch)) {
    if (message.toLowerCase() == '!feedback') {
      if (announce) {
        announce = false
        client.say(ch, "Feeback Disabled")
      } else {
        announce = true
        client.say(ch, "Feeback Enabled")
      }
    }
  }
  if (message.startsWith("!help")) {
    if (!sleep) {
      sleep = true
      client.say(ch, "!mcp [block] {relX} {relY} {relZ} Or you can go to https://github.com/stevn999/VaanBot for the full usage")
      setTimeout(function () {
        sleep = false
      }, 500);
    }
  }
  let mess2 = message
  mess2 = mess2.toLowerCase()
  if (mess2.startsWith("!mcp")) {
    if (users.find(x => x.name === username) == undefined) {
      users.push(new User(username, Date.now()))
    } else {
      let temp = users.find(x => x.name === username)
      if ((Date.now() - temp.last) < rateLimit) {
        console.log(`stopped spam from ${temp.name}, ${(Date.now() - temp.last)}>${rateLimit}`);
        temp.last = Date.now()
        return
      } else {
        temp.last = Date.now()
      }
    }
    let filtered = users.filter(u => (Date.now() - u.last) < (rateLimit * 20))
    users = filtered
    var temp = message
    temp = message.replace(/[\”]/g, '"')
    var elem = temp.split(" ")
    if (elem[6]) {
      command = elem[6]
    }
    for (var i = 0; i < 1; i++) {
      elem[i] = elem[i].toLowerCase()
    }
    if (banned.indexOf(elem[1]) !== -1) {
      if (banMode == 1) {
        client.say(ch, elem[1] + " is a banned block")
        elem[1] = "stone"
      } else if (banMode == 2) {
        if (veryBanned.indexOf(elem[1]) !== -1) {
          elem[1] = "stone"
        }
        elem[2] = (random(-40, 40, true)).toString(10)
        elem[3] = (random(-5, 20, true)).toString(10)
        elem[4] = (random(-40, 40, true)).toString(10)
      }
    }
    let m = ''
    if (elem[1]) {
      if (elem[1].indexOf('[') > -1) {
        console.log("modifier found");
        m = elem[1].slice(elem[1].indexOf('['))
        elem[1] = elem[1].slice(0, elem[1].indexOf('['))
      }
    }
    if (!blocks.blocks.includes(elem[1]) && elem[1] && !sleep) {
      sleep = true
      setTimeout(function () {
        sleep = false
      }, 2500)
      m = ''
      client.say(ch, "\"" + elem[1] + "\" is Not a valid block. Please try https://minecraft.gamepedia.com/Java_Edition_data_values#Blocks")
      //elem[1] = "stone"
    }
    // setting missing variables to relative ones

    for (var i = 2; i <= 5; i++) {
      if (elem[2]) {
        if (elem[2].startsWith("f") && !elem[2].startsWith("f0")) {
          elem[4] = ("^" + elem[2].slice(1, elem[2].length))
          elem[2] = "^"
          elem[3] = "^"
        }
      }
      //console.log(i, elem[i]);
      //swapping relative to absolute
      if (elem[i] != undefined && elem[i].startsWith("~")) {
        if (elem[i] == '~') {
          elem[i] = '~0'
        }
        elem[i] = elem[i].slice(1, elem[i].length)
        pc = 1
        //
      } else if (elem[i] != undefined && !elem[i].startsWith("^")) {
        elem[i] = ('~' + elem[i])
      }
      if (!elem[i]) {
        elem[i] = "~"
        if (i == 3) {
          elem[3] = "~2"
        }
      }
      //console.log(elem[1], elem[2], elem[3]);
      if (elem[3] == '~1' && elem[2] == '~0' && elem[4] == `~0`) {
        elem[3] = '~2'
        //console.log("nop");
      } else if (elem[3] == '~-1' && elem[2] == '~0' && elem[4] == `~0` && elem[1] == "cobweb") {
        elem[3] = '~2'
        //console.log("nop");
      }
    }
    // setting data value to 0 as default
    if (!elem[5]) {
      elem[5] = 0
    }
    if (!elem[1]) {
      elem[1] = "stone"
    }
    //assigning temporary variavles
    block = elem[1]

    x = elem[2]
    y = elem[3]
    z = elem[4]
    dv = elem[5]
    if (x == '~...') {
      dv = elem[3].slice(1, elem[3].length)
      x = '~'
      y = '~2'
      z = '~'
    }
    const notAllowed = ["spawner"]
    if (notAllowed.indexOf(block) != -1) {
      console.log("chests detected");
      m = "[]"
    }
    final = ("/execute as @a[gamemode=survival] at @s anchored eyes run fill " + x + " " + y + " " + z + " " + x + " " + y + " " + z + " " + "minecraft:" + block + m + " " + "destroy " + command)
    console.log(final);
    if (final.length < 256) {
      cbot.chat(final)
    } else {
      client.say(ch, "That command is too long.")
    }
  } else if (mess2.startsWith("!mcc")) {
    if (users.find(x => x.name === username) == undefined) {
      users.push(new User(username, Date.now()))
    } else {
      let temp = users.find(x => x.name === username)
      if ((Date.now() - temp.last) < rateLimit) {
        console.log(`stopped spam from ${temp.name}, ${(Date.now() - temp.last)}>${rateLimit}`);
        temp.last = Date.now()
        return
      } else {
        temp.last = Date.now()
      }
    }
    let filtered = users.filter(u => (Date.now() - u.last) < (rateLimit * 20))
    users = filtered
    var temp = message
    temp = message.replace(/[\”]/g, '"')
    var elem = temp.split(" ")
    if (elem[6]) {
      command = elem[6]
    }
    for (var i = 0; i < 1; i++) {
      elem[i] = elem[i].toLowerCase()
    }
    let m = ''

    // setting missing variables to relative ones

    for (var i = 2; i <= 5; i++) {
      if (elem[2]) {
        if (elem[2].startsWith("f") && !elem[2].startsWith("f0")) {
          elem[4] = ("^" + elem[2].slice(1, elem[2].length))
          elem[2] = "^"
          elem[3] = "^"
        }
      }
      //console.log(i, elem[i]);
      //swapping relative to absolute
      if (elem[i] != undefined && elem[i].startsWith("~")) {
        if (elem[i] == '~') {
          elem[i] = '~0'
        }
        elem[i] = elem[i].slice(1, elem[i].length)
        pc = 1
        //
      } else if (elem[i] != undefined && !elem[i].startsWith("^")) {
        elem[i] = ('~' + elem[i])
      }
      if (!elem[i]) {
        elem[i] = "~"
        if (i == 3) {
          elem[3] = "~2"
        }
      }
      //console.log(elem[1], elem[2], elem[3]);
      if (elem[3] == '~1' && elem[2] == '~0' && elem[4] == `~0`) {
        elem[3] = '~2'
        //console.log("nop");
      } else if (elem[3] == '~-1' && elem[2] == '~0' && elem[4] == `~0` && elem[1] == "cobweb") {
        elem[3] = '~2'
        //console.log("nop");
      }
    }
    // setting data value to 0 as default
    if (!elem[5]) {
      elem[5] = 1
    }
    if (!elem[1]) {
      elem[1] = "stone"
    }
    //assigning temporary variavles
    block = elem[1]

    x = elem[2]
    y = elem[3]
    z = elem[4]
    dv = elem[5]
    if (x == '~...') {
      dv = elem[3].slice(1, elem[3].length)
      x = '~'
      y = '~2'
      z = '~'
    }
    if (elem[5].startsWith("~")) {
      elem[5] = elem[5].slice(1, elem[5].length)
    }
    final = (`/execute as @a[gamemode=survival] at @s anchored eyes run fill ${x} ${y} ${z} ${x} ${y} ${z} minecraft:chest{Items:[{Slot:0b,id:"minecraft:${elem[1]}",Count:${elem[5]}b}]}`)
    console.log(final);
    if (final.length < 256) {
      cbot.chat(final)
    } else {
      client.say(ch, "That command is too long.")
    }
  } else {
    //console.log(userstate, message);
    let sendToMC = `/tellraw @a ["",{"text":"<${userstate.username}> ","color":"${colors[parseInt(userstate['user-id'])%(colors.length)]}"},{"text":"${message}","color":"none"}]`
    if (sendToMC.length < 256) {
      cbot.chat(sendToMC)
    }
    ///tellraw @a ["",{"text":"<name> ","color":"yellow"},{"text":"message","color":"none"}]
  }
})

function random(min = 0, max = 1, int = false) {
  res = 0
  if (Array.isArray(min)) {
    return min[Math.floor(Math.random() * min.length)]
  } else {
    res = Math.random() * (max - min) + min
    if (int == true) {
      return Math.round(res)
    } else {
      return res
    }
  }
}


// var mc = require('minecraft-protocol');
// var bot = mc.createClient({
//   host: "hostIP", // optional
//   port: 25565, // optional
//   username: 'usernameInEmailForm',
//   password: 'password'
// });
// bot.on('login', (a) => {
//   bot.write('chat', {
//     message: 'your message or command'
//   })
// })