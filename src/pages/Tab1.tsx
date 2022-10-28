import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import './Tab1.css';
import { useState, useEffect } from 'react';
import carSportOutline from '../assets/car-sport.svg';
import axios from 'axios';

const Tab1: React.FC = () => {
    const [mapObj, setMapObj] = useState();
    const [aaa, setaaa] = useState(0);
    const [bbb, setbbb] = useState(0);
    const [gasStationList, setGasStationList] = useState([]);
    const locationUrl = window.location.href;

    const initMap = (lat: number, lon: number) => {
        const map = new window.naver.maps.Map('map', {
            center: new window.naver.maps.LatLng(lat, lon),
            zoom: 13,
        });

        setMapObj(map);

        new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(lat, lon),
            map: map,
            icon: carSportOutline,
        });
    };

    useEffect(() => {
        setCurrentLocation();
    }, []);

    useEffect(() => {
        if (aaa && bbb) {
            getGasStationList(aaa, bbb);
        }
    }, [mapObj]);

    useEffect(() => {
        if (gasStationList.length >= 20) {
            console.log('Log: gasStationList 20!');
        }
    }, [gasStationList]);

    const setCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(positionCallBack);
            console.log('Log: geolocation success');
        } else {
            console.error('Error: geolocation failure');
        }
    };

    const positionCallBack = async (position: {
        coords: { latitude: number; longitude: number };
    }) => {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setaaa(lat);
        setbbb(lon);
        initMap(lat, lon);
    };

    const getGasStationList = (lat: number, lon: number) => {
        const naverSearchUrl = 'https://map.naver.com/v5/api/search';
        const gasStationQuery = '%EC%A3%BC%EC%9C%A0%EC%86%8C';
        console.log('Log: naverSearch start');
        axios
            .get(
                `${naverSearchUrl}?caller=pcweb&query=${gasStationQuery}&type=all&searchCoord=${lon};${lat}&page=1&displayCount=20&isPlaceRecommendationReplace=true&lang=ko`,
            )
            .then((res: any) => {
                setGasStationList(res.data.result.place.list);

                console.log('Log: naverSearch success');
                res.data.result.place.list.forEach((gas: any) => {
                    const newMarker = new window.naver.maps.Marker({
                        position: new window.naver.maps.LatLng(gas.y, gas.x),
                        map: mapObj,
                    });
                    newMarker.setMap(mapObj);
                });
            })
            .catch(() => {
                console.log('Log: naverSearch failure');
            });
    };
    console.log(mapObj);
    console.log(gasStationList.length);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>⛽ 주유소 검색</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div id="map" style={{ width: '100%', height: '100%' }} />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
