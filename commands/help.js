exports = module.exports = (bot, msg, args) => {
  args = args.join(" ");
  if(!args) {
    return msg.channel.send({
      embed: {
        thumbnail: {
          url: msg.author.avatarURL
        },
        color: 0x00FFFF,
        title: "Commands",
        description: `✅ Try \`${bot.prefixes[0]}help <command>\` to get information about my commands. \nTry \`${bot.prefixes[0]}commands\` to see my commands!`,
      }
    });
  }
  const cmd = bot.commands.get(bot.aliases.get(args) || args);
  if(!cmd) {
    return msg.channel.send({
      embed: {
        thumbnail: {
          url: msg.author.avatarURL
        },
        color: 0xaf2220,
        title: "❌ Not found",
        description: `❌ Command ${args} not found. \nTry \`${bot.prefixes[0]}commands\` to see my commands!`,
      }
    });
  }
  if(cmd.permLevel === 5 && !~bot.devs.indexOf(msg.author.id)) {
    return msg.channel.send({
      embed: {
        color: 0xaf2220,
        title: "❌ Private",
        description: `❌ Command ${args} is private, and therefore only my developers can see it. \nTry \`${bot.prefixes[0]}commands\` to see my commands!`,
      }
    });
  }
  msg.channel.send({
    embed: {
      title: `✅ ${cmd.call}`,
      color: 0x5fdf24,
      description: cmd.description || "No description.",
      thumbnail: {
        url: msg.author.avatarURL
      },
      fields: [{
        name: "Usage",
        value: "`" + (cmd.usage || `${bot.prefixes[0] + cmd.call} ${cmd.argsRequired ? "<args>" : ""}`) + "`"
      }],
    }
  });
};
exports.call = "help";
exports.permLevel = 0;
exports.description = "Shows information about commands.";
exports.aliases = [];
exports.caseInsensitive = true;
exports.argsRequired = false;
exports.enabled = true;
exports.disabled = (client, msg, args) => {
  return {
    embed: {
      color: client.colors.RED,
      description: `${msg.author.mention}, I'm sorry, but this command is disabled. If this shouldn't be the case, please contact one of my creators.`,
      footer: {
          text: `Thank you for using Contestor | ${client.prefixes[0]}help`
        }
    }
  }
};
