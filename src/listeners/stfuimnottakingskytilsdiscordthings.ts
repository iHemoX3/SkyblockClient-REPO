import axios from 'axios';
import chalk from 'chalk';
import { Listener } from 'discord-akairo';
import { BotListener } from '../extensions/BotListener';

class notStolenFromSkytilsDiscord extends BotListener {
    constructor() {
        super('notStolenFromSkytilsDiscord', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        if (message.author.bot != false) { return }
        const notStolenFromSkytilsDiscordJson = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/botautoresponse.json`, { method: "get" })

        notStolenFromSkytilsDiscordJson.data.forEach(trigger => {
            const triggers = (trigger.triggers)
            const response = (trigger.response)
            const content = message.content.toLowerCase()

            let contains = recursiveSearch(content, triggers, 0)
            if (contains) {
                message.channel.send(response)
            }

        })

    }
}

function recursiveSearch(cutContent: string, triggers: Array<Array<string>>, index: number): boolean {
    const wordlist = triggers[index];
    let indexOf = -1;

    console.log(chalk`{bgRed NEW MESSAGE}`)
    console.log("cutContent value: ")
    console.log(cutContent)

    console.log("wordlist value: ")
    console.log(wordlist)
    console.log("wordlist type: ")
    console.log(typeof (wordlist))

    console.log("triggers.length: ")
    console.log(triggers.length)

    console.log("index")
    console.log(index)

    console.log(chalk`{bgMagenta END OF MESSAGE}`)

    for (const word of wordlist) {
        indexOf = cutContent.indexOf(word);
        if (indexOf != -1) {
            indexOf += word.length
            if (triggers.length == index + 1) {
                return true;
            }
            break;
        }
    }
    if (indexOf != -1) {
        return recursiveSearch(cutContent.substr(indexOf), triggers, index + 1)
    }
    return false;

}

module.exports = notStolenFromSkytilsDiscord;