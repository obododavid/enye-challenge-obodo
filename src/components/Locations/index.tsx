import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import AddressCard from '../AddressCard';

import { useLocationsStyles } from './style';
import { LocationProps } from './type';
import { storeSearchRequest } from '../../redux/actions/searchesActions';

const Locations: React.FC<LocationProps> = (props) => {
	const { latitude, longitude, radius, facility, onReturn, requestDetails, onFinishLoading } = props;
	const classes = useLocationsStyles();
	const mapRef = useRef();
	const defaultZoom = 12;
	const [ hospitalsDescription, setHospitalsDescription ] = useState([] as []);
	const place = new google.maps.LatLng(latitude, longitude);
	const dispatch = useDispatch();

	//redirect to page that rendered this component
	const handleGoToSearchPage = () => {
		setHospitalsDescription([]);
		onReturn();
	};

	//getting nearbysearch results logic
	useEffect(() => {
		//fire action to store details of this search on the database
		dispatch(storeSearchRequest(requestDetails));

		const map = new window.google.maps.Map(mapRef.current, {
			center: place,
			zoom: defaultZoom
		});

		let type: string[];
		let keyword: string;

		//Check for the kind of facility user requested for in order to structure details of request(line 56) to send to google maps
		if (facility === 'Hospitals') {
			type = [ 'hospital' ];
		} else if (facility === 'Pharmacy') {
			type = [ 'pharmacy' ];
		} else if (facility === 'Clinics') {
			type = [ 'hospital' ];
			keyword = 'clinic';
		} else if (facility === 'Medical Offices') {
			type = [ 'hospital' ];
			keyword = 'medical';
		}

		const request: any = {
			location: place,
			radius: radius,
			type: type,
			keyword: keyword
		};

		const service = new google.maps.places.PlacesService(map);
		const infowindow = new google.maps.InfoWindow();

		const createMarker = (place: any): void => {
			const marker = new window.google.maps.Marker({
				position: place.geometry.location,
				map: map
			});

			//show details of a marker on the map when the marker is clicked
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.vicinity + '</div>');
				infowindow.open(map, this);
			});
		};

		const callback = (results: [], status: string): void => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				if (results.length > 1) {
					setHospitalsDescription(results);
				}
				for (var i = 0; i < results.length; i++) {
					createMarker(results[i]);
					setTimeout(() => {
						onFinishLoading();
					}, 2000);
				}
			}
		};

		//main request to get nearyby search results
		service.nearbySearch(request, callback);
	}, []);

	return (
		<div className={classes.container}>
			<Grid container spacing={0} className={classes.body}>
				<Grid item xs={12} sm={12} md={5} className={classes.leftColumn}>
					<div className={classes.leftColumnHeader}>
						<Link onClick={handleGoToSearchPage} className={classes.backLink}>
							<ArrowBackIcon />
							Back
						</Link>
						<Typography variant="h3" component="h3" className={classes.leftColumnFacility}>
							{facility}
						</Typography>
						<Typography className={classes.leftColumnText}>
							<span>Within:</span> {parseInt(radius) / 1000} kilometers
						</Typography>
						<Typography className={classes.leftColumnText}>
							<span>Of:</span> {requestDetails.searchPlace}
						</Typography>
					</div>
					<div className={classes.leftColumnBody}>
						{hospitalsDescription.map((hospital, i) => {
							return <AddressCard key={i} description={hospital} />;
						})}
					</div>
				</Grid>
				<Grid item md={7} className={classes.rightColumn}>
					<Fragment>
						<Typography className={classes.map} component="div" ref={mapRef} />
					</Fragment>
				</Grid>
			</Grid>
		</div>
	);
};

export default Locations;
