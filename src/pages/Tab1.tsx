import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { Geolocation } from "@capacitor/geolocation";
import { useEffect, useState } from "react";
import * as Constants from "../constants/mapConstants";

type Map = {
  setCenter: (latlng: object) => void;
};

const Tab1: React.FC = () => {
  const [mapObj, setMapObj] = useState<Map>();
  const locationUrl = window.location.href;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayMarker = (locPosition: any) => {
    // 마커를 생성합니다
    if (mapObj) {
      const marker = new window.kakao.maps.Marker({
        position: locPosition,
        clickable: true,
      });

      marker.setMap(mapObj);
      mapObj.setCenter(locPosition);
    }
  };

  const positionCallBack = async (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    const lat = position.coords.latitude; // 위도
    const lon = position.coords.longitude; // 경도
    const locPosition = await new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

    // 마커와 인포윈도우를 표시합니다
    displayMarker(locPosition);
  };

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionCallBack);
    }
  };

  useEffect(() => {
    if (mapObj) {
      // const position = printCurrentPosition();
      // const locPosition = new window.kakao.maps.LatLng(
      //   position.coords.latitude,
      //   position.coords.longitude
      // );
      // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      setCurrentLocation();
    }
  }, [mapObj]);

  const initMap = async () => {
    const mapOptions = {
      center: new window.kakao.maps.LatLng(
        Constants.POSITION_LAT_CDNT,
        Constants.POSITION_LNG_CDNT
      ),
      level: 3,
    };
    const container = document.getElementById("map");
    const initMapObj = new window.kakao.maps.Map(container, mapOptions);
    setMapObj(initMapObj);
  };

  useEffect(() => {
    /* 카카오맵 */
    const script = document.createElement("script");
    script.onload = () => window.kakao.maps.load(initMap);
    script.src =
      Constants.KAKAO_MAP_API_URL +
      "15f119a17c6e71ebc2b6ee80b750cf0e" +
      Constants.KAKAO_MAP_API_SERVICES;
    document.head.appendChild(script);
  }, []);

  const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log("Current position:", coordinates);
    return coordinates;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div id="map" style={{ width: "50vh", height: "50vh" }}></div>
        {/* {locationUrl} */}
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
