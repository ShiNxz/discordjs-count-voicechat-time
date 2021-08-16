
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
    <h3 align="center">Count your server members time in your server!</h3>

  <p align="center">
    A discord.js bot that counts your server members time in voice chats, and their messages in the text channels.
  Please note that the information stored in a mysql server, you will have to get one in order to use the bot.
    <br />
    <br />
    <a href="https://github.com/shinxz/discordjs-count-voicechat-time/issues">Report Bug</a>
    ·
    <a href="https://github.com/shinxz/discordjs-count-voicechat-time/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A discord bot that stores your server members time in a mysql server, used to track your members activity in your server.

### Built With

* Discord.js
* Valve API
* Mysql

<!-- GETTING STARTED -->
## Getting Started

* Create a bot at the discord developer portal (https://discord.com/developers/applications) and save the bot token.
* Get a mysql server

### Installation

1. unzip all the files and execute this command to install all the dependencies.
  ```sh
  npm i
  ```
2. Edit the .env-sample and add your token under bot_token and the mysql rows.
3. Edit the file name of `.env-sample` to `.env`
4. Run the bot (look at the bottom section) 

<!-- USAGE EXAMPLES -->
## Usage

To start the bot with pm2 please use the following command:
```sh
pm2 start index.js --name"discordjs-count-voicechat-time"
```
and if you dont have pm2 installed please use the command:
```sh
node index.js
```

if you want to start the bot with nodemon you can use the command:
```sh
npm run dev
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/shinxz/discordjs-count-voicechat-time/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Discord: ShiNxz#0001


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/shinxz/discordjs-count-voicechat-time?style=for-the-badge
[contributors-url]: https://github.com/shinxz/discordjs-count-voicechat-time/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shinxz/discordjs-count-voicechat-time.svg?style=for-the-badge
[forks-url]: https://github.com/shinxz/discordjs-count-voicechat-time/network/members
[stars-shield]: https://img.shields.io/github/stars/shinxz/discordjs-count-voicechat-time.svg?style=for-the-badge
[stars-url]: https://github.com/shinxz/discordjs-count-voicechat-time/stargazers
[issues-shield]: https://img.shields.io/github/issues/shinxz/discordjs-count-voicechat-time.svg?style=for-the-badge
[issues-url]: https://github.com/shinxz/discordjs-count-voicechat-time/issues
[license-shield]: https://img.shields.io/github/license/shinxz/discordjs-count-voicechat-time?style=for-the-badge
[license-url]: https://github.com/shinxz/discordjs-count-voicechat-time/blob/master/LICENSE.txt
