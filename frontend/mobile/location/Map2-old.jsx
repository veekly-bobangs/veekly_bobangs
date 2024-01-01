import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { 
    Platform, 
    Text, 
    View, 
    StyleSheet, 
    TextInput, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions, 
    FlatList,
    Image
    } from 'react-native';

import { COLORS, icons, images, SIZES} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { Easing } from 'react-native-reanimated';
import * as Location from "expo-location";

// const { interpolate } = Animated;

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
// const CARD_HEIGHT = 220;
// const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Images = [
    { image: require("../assets/images/food-banner1.jpg") },
    { image: require("../assets/images/food-banner2.jpg") },
    { image: require("../assets/images/food-banner3.jpg") },
];


export const Map  = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [position, setPosition] = useState({
        latitude: 41.38145,
        longitude: 2.17182,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });

    const markers = [
        {
            coordinate: {
            latitude: 1.304868,
            longitude: 103.833055,
            },
            title: "Amazing Food Place",
            id: 1,
            image: Images[0].image,
        },
        {
            coordinate: {
            latitude: 1.305865,
            longitude: 103.831521,
            },
            title: "Second Amazing Food Place",
            id: 2,
            image: Images[1].image,
        },
        {
            coordinate: {
            latitude: 1.302615,
            longitude: 103.831070,
            },
            title: "Third Amazing Food Place",
            id: 3,
            image: Images[2].image,
        },
    ];


    
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);
    // const scrollX = new Animated.Value(selectedMarkerIndex * CARD_WIDTH);
    const flatListRef = useRef(null);
    const mapRef = useRef(null);
    const scrollViewRef = useRef(null);

    // const cardTranslateX = Animated.interpolateNode(scrollX, {
    //     inputRange: markers.map((_, index) => index * CARD_WIDTH),
    //     outputRange: markers.map((_, index) => index * CARD_WIDTH * -1),
    //     extrapolate: Animated.Extrapolate.CLAMP,
    //     easing: Easing.inOut(Easing.ease),
    // });

    // function componentWillMount() {
    //     this.index = 0;
    //     this.animation = new Animated.Value(0);
    // };

    let mapAnimation = new Animated.Value(0);
    // let index = 0;



    const handleMarkerPress = (index) => {
        setSelectedMarkerIndex(index);
        const xOffset = index * CARD_WIDTH;
        // scrollViewRef.current.scrollTo({ x: xOffset });
        flatListRef.current.scrollToIndex({ index });
        mapRef.current.animateToRegion({
          latitude: markers[index].coordinate.latitude,
          longitude: markers[index].coordinate.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
    };
    

    const initialMapState = {
        categories: [
            { 
                name: 'All', 
                // icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
            },
            { 
                name: 'Chope', 
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
            },
            {
                name: 'Burpple',
                icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Eatigo',
                icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
            },
        ],
    };




    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('not granted')
            setErrorMsg('Permission to access location was denied');
            return;
        } else {
            console.log('granted')
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        })
        console.log(location)
        })();
    }, []);


    const interpolations = markers.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
        const scale = mapAnimation.interpolate({
          inputRange,
          outputRange: [1, 2.5, 1],
          extrapolate: "clamp",
        });
        const opacity = mapAnimation.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp",
        });
        return { scale, opacity };
    });

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map} 
                region={position}
                ref = {mapRef} 
                >
                <Marker 
                    style={styles.marker}
                    coordinate={position}
                    image= {require('../assets/icons/map_marker.png')}
                />
                {markers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    const opacityStyle = {
                        opacity: interpolations[index].opacity,
                    };
                    return(
                        <Marker
                            key={index}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            // onPress= {()=> handleMarkerPress(index)}
                            >
                        <Animated.View style={[styles.markerWrap2, opacityStyle]}>
                            <Animated.View style={[styles.ring, scaleStyle]} />
                            <View style={styles.marker2} />  
                        </Animated.View>
                      </Marker>
                    )
                })}
            </MapView>
            <View style={styles.searchBox}>
                <TextInput 
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{flex:1,padding:0}}
                />
                <Ionicons name="ios-search" size={20} />
            </View>

            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                top:0,
                left:0,
                bottom:0,
                right:20
                }}
                contentContainerStyle={{
                paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {initialMapState.categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.chipsItem}>
                    {category.icon}
                    <Text>{category.name}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>

            <Animated.ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH}
                style={styles.scrollView}
                contentContainerStyle={styles.endPadding}
                onScroll={Animated.event([
                    {
                        nativeEvent:{
                            contentOffset: {
                                x: mapAnimation
                            }
                        }
                    }
                ], 
                {useNativeDriver: true})}
            >   
                {
                    markers.map((marker,index)=>{
                        return (
                            <View key={index} style={styles.card}>
                                <Image
                                    source={marker.image}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                                    {/* <Text numberOfLines={1} style={styles.cardDescription}>
                                    {marker.description}
                                    </Text> */}
                                </View>
                            </View>
                        )
                    })
                }

            </Animated.ScrollView>

            <FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardContainer}
                data={markers}
                keyExtractor={(item) => item.id.toString()}
                scrollEventThrottle={16}
            />

        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    searchBox: {
        position:'absolute', 
        marginTop: Platform.OS === 'ios' ? 20 : 20, 
        flexDirection:"row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position:'absolute', 
        top:Platform.OS === 'ios' ? 70 : 80, 
        paddingHorizontal:10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection:"row",
        backgroundColor:'#fff', 
        borderRadius:20,
        padding:8,
        paddingHorizontal:20, 
        marginHorizontal:5,
        height:35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    markerWrap2: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker2: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
    cardContainer: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        // flexDirection: 'row',
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    textContent: {
        flex: 1,
    },

  });