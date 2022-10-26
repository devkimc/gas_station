import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { useEffect } from "react";

const Tab1: React.FC = () => {
  const locationUrl = window.location.href;
  const initMap = () => {
    new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {locationUrl}
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
