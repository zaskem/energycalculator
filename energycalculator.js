/** RDX Heat Pump Energy Calculator
 *  Written/Developed by Matt Zaske, zaskem@mzonline.com
 *	Last Modified: 1/2/2010
 */

	/**
		*	expand toggles off and on (visible) the ID of displayValOne
		*
		*	it also will force displayValTwo off.
		*/
	function expand(displayValOne, displayValTwo) {
		if (document.getElementById) {	
			var pri = document.getElementById(displayValOne).style;
			if(pri.display == "block") {
				var sec = document.getElementById(displayValTwo).style;
				pri.display = "none";
				sec.display = "none";
			} else {
				pri.display = "block";
			}
			return true;
		}	else {
			return false;
		}
	}
	
	/**
		*	show forces visibility on for the ID of displayVal
		*/
	function show(displayVal) {
		if (document.getElementById) {	
			var full = document.getElementById(displayVal).style;
			full.display = "block";
			return true;
		}	else {
			return false;
		}
	}
	
	/**
		*	hide forces visibility off for the ID of displayVal
		*/
	function hide(displayVal) {
		if (document.getElementById) {	
			var full = document.getElementById(displayVal).style;
			full.display = "none";
			return true;
		}	else {
			return false;
		}
	}
	
	/**
		*	createRequest is the reusable function to generate a new ajaxRequest object
		*
		*	@return ajaxRequest object
		*/
	function createRequest() {
		var ajaxRequest;  // The variable that makes Ajax possible!
		try {
			// Opera 8.0+, Firefox, Safari
			ajaxRequest = new XMLHttpRequest();
		} catch (e) {
			// Internet Explorer Browsers
			try {
				ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					// Something went wrong
					alert("Your browser broke!");
					return false;
				}
			}
		}
		return ajaxRequest;
	}
	
	/**
		*	clearForm forces visibility off for pertinent energy calculator form IDs
		*/
	function clearForm() {
		hide('fuelOilInput');
		hide('rdxFuelOil');
		hide('propaneInput');
		hide('rdxPropane');
		hide('natGasThermsInput');
		hide('rdxNgt');
		hide('natGasft3Input');
		hide('rdxNgf');
		hide('electricityInput');
		hide('rdxElectric');
		hide('step4');
		hide('rdxResults');
		hide('compareResults');
		return true;
	}
	
	/**
		*	calculateCosts creates appropriate ajaxRequests for each fuel type, submits, and
		*	processes their results on the page.
		*/
	function calculateCosts() {
		// Fuel Oil Cost Calculation
		if(document.fuelForm.fuelOil.checked === true) {
			var requestOil = createRequest();
			var oCost = document.getElementById('oilCost').value.replace('$', '');
			var oEfficiency = document.getElementById('oilEfficiency').value.replace('%', '') * 0.01;
			requestOil.open("GET", "calculateFuelCost.php?fuelCost="	+ oCost + "&fuelBTU=138800&fuelEfficiency=" + oEfficiency, true);
			requestOil.send(null); 
			requestOil.onreadystatechange = function(){
				if(requestOil.readyState == 4){
					document.getElementById('oilTotal').innerHTML = requestOil.responseText;
				}
			};
		}

		// Propane Cost Calculation
		if(document.fuelForm.propane.checked === true) {
			var requestPropane = createRequest();
			var pCost = document.getElementById('propaneCost').value.replace('$', '');
			var pEfficiency = document.getElementById('propaneEfficiency').value.replace('%', '') * 0.01;
			requestPropane.open("GET", "calculateFuelCost.php?fuelCost="	+ pCost + "&fuelBTU=91200&fuelEfficiency=" + pEfficiency, true);
			requestPropane.send(null); 
			requestPropane.onreadystatechange = function(){
				if(requestPropane.readyState == 4){
					document.getElementById('propaneTotal').innerHTML = requestPropane.responseText;
				}
			};
		}

		// Natural Gas (Therms) Calculation
		if(document.fuelForm.natGasTherms.checked === true) {
			var requestNgt = createRequest();
			var ntCost = document.getElementById('ngtCost').value.replace('$', '');
			var ntEfficiency = document.getElementById('ngtEfficiency').value.replace('%', '') * 0.01;
			requestNgt.open("GET", "calculateFuelCost.php?fuelCost="	+ ntCost + "&fuelBTU=1030000&fuelEfficiency=" + ntEfficiency + "&costInCents=1&costInTherms=1", true);
			requestNgt.send(null); 
			requestNgt.onreadystatechange = function(){
				if(requestNgt.readyState == 4){
					document.getElementById('ngtTotal').innerHTML = requestNgt.responseText;
				}
			};
		}

		// Natural Gas (Mcf) Calculation
		if(document.fuelForm.natGasft3.checked === true) {
			var requestNgf = createRequest();
			var nfCost = document.getElementById('ngfCost').value.replace('$', '');
			var nfEfficiency = document.getElementById('ngfEfficiency').value.replace('%', '') * 0.01;
			requestNgf.open("GET", "calculateFuelCost.php?fuelCost="	+ nfCost + "&fuelBTU=1030000&fuelEfficiency=" + nfEfficiency, true);
			requestNgf.send(null); 
			requestNgf.onreadystatechange = function(){
				if(requestNgf.readyState == 4){
					document.getElementById('ngfTotal').innerHTML = requestNgf.responseText;
				}
			};
		}

		// Electricity Calculation
		if(document.fuelForm.electricity.checked === true) {
			var requestElec = createRequest();
			var eCost = document.getElementById('electricCost').value.replace('$', '');
			var eEfficiency = document.getElementById('electricEfficiency').value.replace('%', '') * 0.01;
			requestElec.open("GET", "calculateFuelCost.php?fuelCost="	+ eCost + "&fuelBTU=3413&fuelEfficiency=" + eEfficiency + "&costInCents=1", true);
			requestElec.send(null); 
			requestElec.onreadystatechange = function(){
				if(requestElec.readyState == 4){
					document.getElementById('electricTotal').innerHTML = requestElec.responseText;
				}
			};
		}

		// RDX Calculation 
		var requestRDX = createRequest();
		var Cost = document.getElementById('electricRate').value.replace('$', '');
		requestRDX.open("GET", "calculateFuelCost.php?fuelCost="	+ Cost + "&fuelBTU=3413&fuelEfficiency=3.62&costInCents=1", true);
		requestRDX.send(null); 
		requestRDX.onreadystatechange = function(){
			if(requestRDX.readyState == 4){
				document.getElementById('rdxTotal').innerHTML = requestRDX.responseText;
			}
		};
		
		// Show the Fourth Step Option and return
		show('step4');
		return false;
	}
	
	/**
		*	compareCosts does basic mathematical comparisons based upon the results of
		*	calculateCosts(), outputting the results to the area in step 4.
		*/
	function compareCosts() {
		// Show RDX Cost Estimate, obtain value calculated, show comparisons pane.
		show('rdxResults');
		var rdxCost = document.getElementById('rdxTotal').innerHTML.replace('$', '');
		show('compareResults');

		// Fuel Oil Cost Comparison
		if(document.fuelForm.fuelOil.checked === true) {
			var oCost = document.getElementById('oilTotal').innerHTML.replace('$', '');
			document.getElementById('rdxOilDifference').innerHTML = "$" + (oCost - rdxCost).toFixed(2);
			document.getElementById('rdxOilSavings').innerHTML = ((1 - (rdxCost/oCost)) * 100).toFixed(2) + "%";
			show('rdxFuelOil');
		}

		// Propane Cost Comparison
		if(document.fuelForm.propane.checked === true) {
			var pCost = document.getElementById('propaneTotal').innerHTML.replace('$', '');
			document.getElementById('rdxPropaneDifference').innerHTML = "$" + (pCost - rdxCost).toFixed(2);
			document.getElementById('rdxPropaneSavings').innerHTML = ((1 - (rdxCost/pCost)) * 100).toFixed(2) + "%";
			show('rdxPropane');
		}

		// Natural Gas (Therms) Cost Comparison
		if(document.fuelForm.natGasTherms.checked === true) {
			var ntCost = document.getElementById('ngtTotal').innerHTML.replace('$', '');
			document.getElementById('rdxNgtDifference').innerHTML = "$" + (ntCost - rdxCost).toFixed(2);
			document.getElementById('rdxNgtSavings').innerHTML = ((1 - (rdxCost/ntCost)) * 100).toFixed(2) + "%";
			show('rdxNgt');
		}

		// Natural Gas (Mcf) Cost Comparison
		if(document.fuelForm.natGasft3.checked === true) {
			var nfCost = document.getElementById('ngfTotal').innerHTML.replace('$', '');
			document.getElementById('rdxNgfDifference').innerHTML = "$" + (nfCost - rdxCost).toFixed(2);
			document.getElementById('rdxNgfSavings').innerHTML = ((1 - (rdxCost/nfCost)) * 100).toFixed(2) + "%";
			show('rdxNgf');
		}

		// Electricity Cost Comparison
		if(document.fuelForm.electricity.checked === true) {
			var eCost = document.getElementById('electricTotal').innerHTML.replace('$', '');
			document.getElementById('rdxElectricDifference').innerHTML = "$" + (eCost - rdxCost).toFixed(2);
			document.getElementById('rdxElectricSavings').innerHTML = ((1 - (rdxCost/eCost)) * 100).toFixed(2) + "%";
			show('rdxElectric');
		}
		return false;
	}