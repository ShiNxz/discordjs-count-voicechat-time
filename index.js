// Should it count commands as messages? (true = yes, false = no)
let CountCMDS = true;

// ============================================================================================================== \\

const Discord = require('discord.js');
const { Client } = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'REACTION'] });
const mysql = require("mysql2");
const chalk = require("chalk");
const figlet = require("figlet");
require('dotenv').config();

// - Login -
const PREFIX = '!';
client.login(process.env.BOT_TOKEN);

// - Database -
var conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});

function Time() {
	// Get unix time
	return Math.floor(new Date().getTime() / 1000);
}

// - Ready -
client.on('ready', () =>
{
	// Start
	console.log('─────────────────────────────────────────────');
	console.log(chalk.green(figlet.textSync('TimeSpent', { horizontalLayout: 'full' })+'ShiNxz#0001'));
	console.log('─────────────────────────────────────────────');
	console.log(chalk.red(`Bot started!\n---\n`
	+ `> Users: ${client.users.cache.size}\n`
	+ `> Channels: ${client.channels.cache.size}\n`
	+ `> Servers: ${client.guilds.cache.size}`));
	console.log('─────────────────────────────────────────────');
	client.user.setActivity(`${PREFIX}shop`, {type: 'WATCHING'});

	// Check Databases
	conn.connect(err => {
		if(err) throw err;
		console.log("- Database Connected.");
		console.log("- Checking if Msgs Table exist...");
		conn.query(`SHOW TABLES LIKE 'Msgs'`, (err, rows) => {
			if(err) throw err;
			if(rows.length < 1) {
				conn.query(`CREATE TABLE Msgs (UserID varchar(30) NOT NULL,Msgs int(11) DEFAULT 1) ENGINE=InnoDB DEFAULT CHARSET=latin1;`);
				console.log("- Msgs Database Built.");
				console.log("- Msgs database will be where the user messages count will be stored.");
			} else {
				console.log("- Msgs Database Exists.");
			}
		});
		console.log('─────────────────────────────────────────────');
		conn.query(`SHOW TABLES LIKE 'Activity'`, (err, rows) => {
			if(err) throw err;
			if(rows.length < 1) {
				conn.query(`CREATE TABLE Activity (ID int(11) NOT NULL,UserID varchar(30) NOT NULL,ChannelID varchar(25) NOT NULL,JoinTime int(11) NOT NULL,LeftTime int(11) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
				conn.query(`ALTER TABLE Activity ADD PRIMARY KEY (ID);`);
				conn.query(`ALTER TABLE Activity MODIFY ID int(11) NOT NULL AUTO_INCREMENT;`);
				console.log("- Activity Database Built.");
				console.log("- Activity database will be where the voice chat time for each user will be stored.");
			} else {
				console.log("- Activity Database Exists.");
			}
		});
		console.log('─────────────────────────────────────────────');
	});
});

// User Commands
client.on('message', async message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	let args = message.content.substring(PREFIX.length).split(" ");

	switch(args[0]) {
		case 'time': case 'Time':  // Aliasses
			let person;
			if(!args[1]) {
				person = message.author;
			} else {
				person = message.guild.member(message.mentions.users.first());
			}
			
			conn.query(`SELECT * FROM Activity WHERE UserID = '${person.id}' AND LeftTime > 1`, (err, rows) => {
				if(err) throw err;
				if(rows.length > 0) {
					let total = 0;
					rows.forEach(row => {
						total = total + (row.LeftTime - row.JoinTime);
					});
					total = new Date(total * 1000).toISOString().substr(11, 8);

					return message.channel.send(total);
				} else {
					return message.channel.send(`00:00:00`);
				}
			});
		break;

		case 'Messages': case 'messages': case 'msgs': case 'Msgs': // Aliasses
			let per;
			if(!args[1]) {
				per = message.author;
			} else {
				per = message.guild.member(message.mentions.users.first());
			}
			conn.query(`SELECT Msgs FROM Msgs WHERE UserID = '${per.id}'`, (err, rows) => {
				if(err) throw err;
				if(rows.length > 0) {
					return message.channel.send(`\`${rows[0].Msgs}\` Messages.`);
				} else {
					return message.channel.send('`0` Messages.')
				}
			});
		break;
	}
});


// User Commands
client.on('message', message => {
	if(message.author.bot) return;
	if(CountCMDS == false) if (message.content.startsWith(PREFIX)) return;

	// Check if the user exist, if no insert new row
	conn.query(`SELECT * FROM Msgs WHERE UserID = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		if(rows.length > 0) {
			// exists
			conn.query(`UPDATE Msgs SET Msgs = Msgs + 1 WHERE UserID = ${message.author.id}`, (err, rows) => {
				if(err) throw err;
			});
		} else {
			// not exist
			conn.query(`INSERT INTO Msgs (UserID) VALUES ('${message.author.id}');`, (err) => {
				if(err) throw err;
			});
		}
	});

});


client.on('voiceStateUpdate', async (oldMember, newMember) => {

	const newUserChannel = newMember.channelID;
	const oldUserChannel = oldMember.channelID;
  
	let User = await client.users.fetch(newMember.id, { cache: true });
	let user = await newMember.guild.members.fetch(newMember.id, { cache: true });

	if(newUserChannel === oldUserChannel) return;

	if (oldUserChannel != newUserChannel) {
		if (oldUserChannel == null) {
			conn.query(`INSERT INTO Activity (UserID, ChannelID, JoinTime) VALUES ('${newMember.id}', ${newUserChannel}, '${Time()}');`, (err, rows) => {
				if(err) throw err;
			});
		} else if (newUserChannel == null) {
			conn.query(`SELECT ID FROM Activity WHERE UserID = '${oldMember.id}' AND ChannelID = ${oldUserChannel} ORDER BY ID DESC`, (err, rows) => {
				if(err) throw err;
				if(rows.length > 0) {
					conn.query(`UPDATE Activity SET LeftTime = ${Time()} WHERE ID = ${rows[0].ID}`, (err, rows) => {
						if(err) throw err;
					});
				}
			});
		} else {
			conn.query(`INSERT INTO Activity (UserID, ChannelID, JoinTime) VALUES ('${newMember.id}', ${newUserChannel}, '${Time()}');`, (err, rows) => {
				if(err) throw err;
			});
			conn.query(`SELECT ID FROM Activity WHERE UserID = '${oldMember.id}' AND ChannelID = ${oldUserChannel} ORDER BY ID DESC`, (err, rows) => {
				if(err) throw err;
				if(rows.length > 0) {
					conn.query(`UPDATE Activity SET LeftTime = ${Time()} WHERE ID = ${rows[0].ID}`, (err, rows) => {
						if(err) throw err;
					});
				}
			});
		}
	  }
});