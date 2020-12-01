module.exports = {
  name: 'start',
  description: 'Start a new game of battleship.',
  execute(message, args) {
    message.channel.send("Game started.");
  }
}