const FL = ['FL', 'FL 2', 'FL 3']

const rulest = [
	{ from: 0, to: 20, unit: 4 },
	{ from: 19, to: 40, unit: 8 },
	{ from: 39, to: 60, unit: 12 },
	{ from: 59, to: 80, unit: 16 },
	{ from: 79, to: 100, unit: 20 },
	{ from: 99, to: 150, unit: 35 },
	{ from: 149, to: 250, unit: 50 },
	{ from: 249, to: 350, unit: 100 },
	{ from: 349, to: 450, unit: 150 },
	{ from: 449, to: 1000, unit: 200 },
	{ from: 999, to: 1500, unit: 300 },
]

const WebDriver = require('./web-driver')
let webDriver = new WebDriver()

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sleep = () => {
	require('deasync').sleep(getRandomInt(452, 965));
}

let state = false;

(async () => {

	await webDriver.goTo('https://cz4.kingdoms.com/#/page:village/villId:536133654/location:32/window:building/cp:1/tab:FarmList')
	for (let i = 0; i < FL.length; i++) {

		let actualFl = FL[i]

		await webDriver.waitForElement("//div[@class='modal  building ']")
		sleep()
		await webDriver.waitForElement("//div[@class='listName truncated' and text()='" + actualFl + "']//ancestor::td")
		sleep()
		await webDriver.clickOnElement("//div[@class='listName truncated' and text()='" + actualFl + "']//ancestor::td")
		sleep()

		for (let i = 0; i < rulest.length; i++) {
			let tmp = rulest[i]
			console.log('Looking for elements in range ' + tmp.from + " : " + tmp.to)
			let elements = await webDriver.getElements("//div[@class='clickInputWrapper']//ancestor::tr//td[@class='error']//ancestor::tr//td[@class='population']//span[text() > " + tmp.from + " and text() < " + tmp.to + "]//ancestor::tr//input")

			let needRestart = false
			if (elements.length !== 0) {
				needRestart = true
				sleep()
				for (let j = 0; j < elements.length; j++) {
					await webDriver.clickOnWebElement(elements[j])
					sleep()
				}
				//selected :-)
				await webDriver.clickOnElement("//div[@class='content']//span[text()='Upravit jednotky']//ancestor::div[1]")
				let webElementPalkari = await webDriver.getElement("//td[@class='unit1']//input")
				await webDriver.sendKeysToElement(webElementPalkari, tmp.unit)
				sleep()
				await webDriver.clickOnElement("//div[@class='buttonFooter']//span[text()='Uložit']//ancestor::div[1]")
			}

			if (needRestart) {
				sleep()
				await webDriver.clickOnElement("//thead//tr[1]//th[1]//input")
				sleep()
				await webDriver.clickOnElement("//thead//tr[1]//th[1]//input")
				sleep()
			}
		}
		await webDriver.clickOnElement("//div[contains(@class, 'back clickable')]/span/span")
		sleep()
	}
	//"//div[@class='clickInputWrapper']//ancestor::tr//td[@class='error']//ancestor::tr//td[@class='population']//span[text() > 90 and text() < 100]//ancestor::tr//input"
	await webDriver.closeDriver()
	state = true
})()

require('deasync').loopWhile(() => { return !state })
console.log('done')

/*



var xpath = function(xpathToExecute){
  var result = [];
  var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
    result.push( nodesSnapshot.snapshotItem(i) );
  }
  return result;
}
xpath("//td/i[contains(@class, 'movement_attack_small_flat_gray')]//ancestor::tr//input").forEach(e=> {
e.click()
})

*/