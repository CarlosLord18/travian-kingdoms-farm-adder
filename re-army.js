const FL = ['FL', 'FL 2', 'FL 3']

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

		// for (let i = 0; i < rulest.length; i++) {
		// let tmp = rulest[i]
		// console.log('Looking for elements in range ' + tmp.from + " : " + tmp.to)
		let elements = await webDriver.getElements("//i[@class='reportIcon reportTypes_reportIcon2_flat']//ancestor::tr//input")
		for (let j = 0; j < elements.length; j++) {
			await webDriver.clickOnWebElement(elements[j])
			sleep()
			await webDriver.clickOnElement("//div[@class='content']//span[text()='Upravit jednotky']//ancestor::div[1]")
			sleep()
			let text = await webDriver.getElementValue("//td[@class='unit1']//input")
			text = parseInt(text.replace(/[^\d]/g, "")) + 4
			console.log(text)
			sleep()
			let webElementPalkari = await webDriver.getElement("//td[@class='unit1']//input")
			console.log('WRITING ' + text)
			await webDriver.sendKeysToElement(webElementPalkari, text);
			sleep()
			await webDriver.clickOnElement("//div[@class='buttonFooter']//span[text()='Uložit']//ancestor::div[1]")
			sleep()
			await webDriver.clickOnElement("//thead//tr[1]//th[1]//input")
			sleep()
			await webDriver.clickOnElement("//thead//tr[1]//th[1]//input")
			sleep()
		}
		await webDriver.clickOnElement("//div[contains(@class, 'back clickable')]/span/span")
		sleep()
	}
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