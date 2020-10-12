document.addEventListener(
	'DOMContentLoaded',
	function() {
		let CARRIER = null;
		document.querySelectorAll('input').forEach(ele => {
			ele.addEventListener(
				'click',
				function(event) {
					CARRIER = event.target.value;
					document
						.querySelector('.postal-selector-input')
						.setAttribute(
							'style',
							'height: 100px; overflow: inherit; margin-top: 10px; margin-bottom: 10px'
						);
					document.querySelector('footer').style.display = 'block';
					document
						.getElementById('inputTxt')
						.setAttribute('placeholder', `*** Enter ${CARRIER.toUpperCase()} Tracking Number ***`);
				},
				false
			);
		});

		document.getElementById('submit').addEventListener(
			'click',
			function() {
				try {
					if (document.getElementById('inputTxt').value) {
						chrome.tabs.create({ url: getCarrierUrl(CARRIER, document.getElementById('inputTxt').value) });
					} else {
						// error handler
						document.getElementById('errorMsg').style.display = 'block';
						setTimeout(function() {
							document.getElementById('errorMsg').style.display = 'none';
						}, 6500);
					}
				} catch (err) {}
			},
			false
		);
	},
	false
);

const getCarrierUrl = (carrier, trackingId) => {
	let url = null;
	switch (carrier) {
		case 'ups':
			url = `https://www.ups.com/track?tracknum=${trackingId}`;
			break;
		case 'fedex':
			url = `https://www.fedex.com/apps/fedextrack/?tracknumbers=${trackingId}`;
			break;
		case 'usps':
			url = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingId}`;
			break;
		case 'dhl':
			url = `https://www.dhl.com/en/express/tracking.html?AWB=${trackingId}`;
			break;
		default:
			url = 'https://www.google.com';
			break;
	}
	return url;
};
