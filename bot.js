'use strict';
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.disabledMembers = new Map();
const fetch = require('node-fetch');
client.login(token);

client.on('ready', async () => {
        console.log('Fuck you I\'m Jah!');
        setTimeout( () => client.user.setPresence({ status: 'online', game: { name: `with myself ;)` } }), 60000);
});

client.on('message', async (message) => {
        if(message.author.bot) return;
        const args = message.content.trim().split(/ +/g);
        if((args[0].toLowerCase() == 'i\'m' || args[0].toLowerCase() == 'im') && (args[1]) && !client.disabledMembers.has(message.author.id)){
                message.channel.send(`Hi ${args.slice(1).join(' ')}, I'm Jah`);
        }
        var owos = ['owo', 'ovo', 'uwu', 'uvu', 'unu', 'ono', 'umu', 'ene', 'nun'];
        if(owos.includes(args[0].toLowerCase()) && !client.disabledMembers.has(message.author.id)) message.channel.send(':object:');
        if(message.isMemberMentioned(client.user)){
                client.user.setPresence({ status: 'online', game: { name: `with myself ;)` } });
                if(message.content.indexOf('stop') !== -1) client.disabledMembers.set(message.author.id, message.guild.id)
                else if (message.content.indexOf('go') !== -1 && client.disabledMembers.has(message.author.id)) client.disabledMembers.delete(message.author.id);
        }
});

client.on('guildMemberAdd', member =>{
        makeWelcChan();
        makeLogs();

        function makeWelcChan(){
                //looks for channel called 'welcome'
                const welcChan = member.guild.channels.cache.find(ch => ch.name === 'welcome')
                if (!channel){
                        // creates welcome channel
                        guild.createChannel('welcome', { type: 'text'}, {
                                type: 'category',
                                permissionsOverwrites: [{
                                  id: guild.id,
                                  allow: ['READ_MESSAGES'],
                                  deny: ['SEND_MESSAGES']
                                }]
                              })
                                .then(console.log)
                                .catch(console.error);
                }
                else return;
        }
        function makeLogs(){
                const logsChan = member.guild.channels.cache.find(ch => ch.name === 'logs')
                if (!channel){
                        guild.createChannel('logs', { type: 'text'}, {
                                type: 'category',
                                permissionsOverwrites: [{
                                  id: guild.id,
                                  deny: ['READ_MESSAGES']
                                }]
                              })
                                .then(console.log)
                                .catch(console.error);
                }
                else return;
        }
}
)

// Create an event listener for new members
client.on('guildMemberAdd', member => {
        // Send the message to a designated channel on a server:
        const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
        // Do nothing if the channel wasn't found on this server
        if (!channel) return;
        // Send the message, mentioning the member
        channel.send(`Welcome to ${member.guild.name} <@${member.id}> My name is Jah.`);
      });


client.on('message', message => {

  // If the message content starts with "!kick"
  if (message.content.startsWith(`${prefix}kick`)) {

    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('reason')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user}`);
            const channel = message.guild.channel('logs');
            if(!channel) return;
            channel.send(`User @<${message.author.id}> kicked ${user.tag} at ${message.createdTimestamp}`);
            
          })
          .catch(err => {
            console.log('I was unable to kick the member');
            console.error(err);
          });
      } else {
        console.log(`The mentioned user isn't in this guild`);
      }

    } else {
      message.reply("Kick Usage: !kick @(name of user to be kicked) (reason)");
    }
  }
}
);
client.on("messageDelete", (messageDelete) => {
        const channel = messageDelete.guild.channels.resolve('logs');
        if(!channel) return;
        channel.send(`The message : "${messageDelete.content}" by ${messageDelete.author} with the ID of ${messageDelete.author.id}`);
       }); 

client.on("message", (message) => {
        if(message.content.startsWith(`${prefix}invite`)){
                message.reply('You may invite this bot to your server here: http://jahbot.pantsthaniel.tk');
        }

});

client.on('message', message => {
        if (!message.guild) return;
        if (message.content.startsWith(`${prefix}ban`)) {
          const user = message.mentions.users.first();
          if (user) {
            const member = message.guild.member(user);
            if (member) {
              member
                .ban({
                  reason: 'They were bad!',
                })
                .then(() => {
                  message.reply(`Successfully banned ${user.tag}`);
                })
                .catch(err => {
                  message.reply('I was unable to ban the member');
                  console.error(err);
                });
            } else {
              message.reply("That user isn't in this guild!");
            }
          } else {
            message.reply("You didn't mention the user to ban!");
          }
        }
      });

client.on('message', (message => {
        if(message.content.startsWith(`${prefix}help`)){
                message.reply("check your DMs!");
                message.author.send({embed: {
                        color: 3447003,
                        author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL

                        },
                        title: "JahBot Commands",
                        discription: "Here is a list of the commands you may use through me!",
                        fields: [
                                {
                                        name: "!invite",
                                        value: "Gives you the link to invite me to a server."
                                },
                                {
                                        name: "!kick",
                                        value: "Kicks a usser. Usage:!kick @User"
                                },
                                {
                                        name: "!ban",
                                        value: "Bans a user. Usage:!ban @User"
                                },
                                {
                                        name: "!help",
                                        value: "Sends you this message through DMs"
                                }
                        ],
                        footer: {
                                icon_url: client.user.avatar,
                                text: "©Pantsthaniel 2020"
                        }
                        }


                })
        }
}));

client.on('message', message => {
        if(message.content.startsWith(`${prefix}poopoo`)){
                message.channel.send("/tts poopy stinker hehehe xdddddd");
        }
});


client.on('message', message =>{
        if(message.content.startsWith(`${prefix}`)){
                message.delete(message);
                message.channel.send(message.content.slice(5, message.content.length));
        }
})
client.on('message', message =>{
        if(message.content.startsWith(`/tts`)){
                message.delete(message);
                message.channel.send(message.content.slice(5, message.content.length));
        }
})
