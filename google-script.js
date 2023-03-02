const DISCORD_WEBHOOK = "Your-Webhook-URL";

function onSubmit(e) {
	const response	= e.response.getItemResponses();
	let items		= [];

	var content	= "";
	var title	= "Google Form : " + e.source.getTitle();
	var footer	= "Some footer here";
	var color	= 33023; // Optional, look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html

	for (const responseAnswer of response) {
		const question = responseAnswer.getItem().getTitle();
		const answer = responseAnswer.getResponse();
		let parts = []

		try {
			parts = answer.match(/[\s\S]{1,1024}/g) || [];
		} catch (e) {
			parts = answer;
		}

		if (!answer) {
			continue;
		}

		for (const [index, part] of Object.entries(parts)) {
			if (index == 0) {
				items.push({
					"name": question,
					"value": part,
					"inline": false
				});
			} else {
				items.push({
					"name": question.concat(" (cont.)"),
					"value": part,
					"inline": false
				});
			}
		}
	}

	const options = {
		"method": "post",
		"headers": {
			"Content-Type": "application/json",
		},
		"payload": JSON.stringify({
			"content": content,
			"embeds": [{
				"title": title,
				"color": color,
				"fields": items,
				"footer": {
					"text": footer
				},
				"timestamp": new Date().toISOString()
			}]
		})
	};

	UrlFetchApp.fetch(DISCORD_WEBHOOK, options);
};
