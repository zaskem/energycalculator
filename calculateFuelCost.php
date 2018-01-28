<?php
	$cost = 1;
	if (isset($_GET['fuelCost'])) {
		if (is_numeric($_GET['fuelCost'])) {
			$cost = $_GET['fuelCost'];
		}
	}
	$btu = 1;
	if (isset($_GET['fuelBTU'])) {
		if (is_numeric($_GET['fuelBTU'])) {
			$btu = $_GET['fuelBTU'];
		}
	}
	$efficiency = 1;
	if (isset($_GET['fuelEfficiency'])) {
		if (is_numeric($_GET['fuelEfficiency'])) {
			$efficiency = $_GET['fuelEfficiency'];
		}
	}
	$costInCents = false;
	if (isset($_GET['costInCents'])) {
		$costInCents = true;
	}
	$costInTherms = false;
	if (isset($_GET['costInTherms'])) {
		$costInTherms = true;
	}

	if($costInCents) {
		$cost = $cost * 0.01;
	}
	if($costInTherms) {
		$cost = $cost * 10;
	}

	print '$' . number_format(round($cost / ($btu * $efficiency) * 1000000, 2), 2);
?>