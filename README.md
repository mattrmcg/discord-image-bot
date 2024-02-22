## Discord AI Image Bot
As the title suggests, this is a simple discord bot that can generate ai images with user-provided prompts, built with the discord.js library.

The bot currently only has two core commands: **/move** and **/generate-image**. The **/echo**, **/ping**/, **/user**, and **/server** commands are all utility commands meant to ensure the bot is functioning properly.

### /move
The **/move** command moves the inputted user into the inputted voice channel. This command will only move a user if the user is assigned the "moveable" role.

### /generate-image
The **/generate-imgae** command requires a prompt. The user-provided prompt is used to generate an image with OpenAI's DAll-E 3 model, which is then returned to the channel in an embed.


## Running the bot
The bot can be initialized using `node index.js`.

*NOTE*: The **deploy-commands.js** file is an auxiliary function meant to register new slash commands with Discord. This must be called using `node deploy-commands.js` whenever new commands are added. Discord may limit how many times commands can be registered in a day.

