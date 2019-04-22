import fs from 'fs'

export default class Recorder {
	constructor({ width, height, players, filename }) {
		this.width = width
		this.height = height
		this.players = players
		this.filename = filename

		this.steps = []
	}

	record(step) {
		this.steps.push(step)
	}

	export() {
		const data = JSON.stringify(this)
		fs.writeFile(this.filename, data, 'utf8', () => {
			console.log(`exported recorded game to ${this.filename}`)
		})
	}
}