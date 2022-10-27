import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { useEffect } from "react";
import carSportOutline from "../assets/car-sport.svg";

const Tab1: React.FC = () => {
  const locationUrl = window.location.href;

  const initMap = (lat: number, lon: number) => {
    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(lat, lon),
      zoom: 14,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lon),
      map: map,
      icon: carSportOutline,
    });
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionCallBack);
      console.log("Success: 현재 위치는 가져왔습니다");
    } else {
      console.error("Error: 현재 위치를 가져올 수 없습니다");
      console.log("Log: 현재 위치를 가져올 수 없습니다");
    }
  };

  const positionCallBack = async (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    const lat = position.coords.latitude; // 위도
    const lon = position.coords.longitude; // 경도
    initMap(lat, lon);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {locationUrl}
        {/* <IonIcon src={carSportOutline}></IonIcon> */}
        <div id="map" style={{ width: "100%", height: "100%" }} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
