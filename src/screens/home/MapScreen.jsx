import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationIcon } from "../../assets/custom-icons";

export default function MapScreen({ route }) {
  const { location, city, country } = route.params;
  const { latitude, longitude } = location.coords;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        mapType="standart"
        minZoomLevel={1}
        maxZoomLevel={20}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="I am here"
          description="Hello"
        >
          <Image
            source={require("../../assets/icons/location-marker.png")}
            style={styles.marker}
          />
        </Marker>
      </MapView>
      <View style={styles.footer}>
        <LocationIcon />
        <View style={styles.description}>
          <Text style={styles.country}>{country}</Text>
          <Text style={styles.city}>{city}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: Dimensions.get("window").height - 171,
  },
  marker: {
    width: 32,
    height: 40,
  },
  footer: {
    flexDirection: "row",
    height: 83,
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "rgb(179,179,179)",
  },
  description: {
    marginLeft: 8,
  },
  country: {
    fontFamily: "Roboto-Regular",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "500",
    color: "#212121",
    marginBottom: 4,
  },
  city: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#BDBDBD",
  },
});
