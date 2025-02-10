//Ce script est uniquement utilisé par l'extension, voir le script.
chrome.runtime.onInstalled.addListener(() => {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		let showActionOnGithub = {
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { hostSuffix: "github.com" },
				}),
			],
			actions: [new chrome.declarativeContent.ShowAction()]
		};

		let rules = [showActionOnGithub];
		chrome.declarativeContent.onPageChanged.addRules(rules);
	});
});
