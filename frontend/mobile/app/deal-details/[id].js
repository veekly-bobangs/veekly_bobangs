import React from 'react';
import { View, Text, Button, Image, ImageBackground, FlatList, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONT, SIZES } from "../../constants";


const height = Dimensions.get('window').height;
const colors = {
    gray: '#D1D3D2',
    darkGray: '#676767',
    orange: '#F35D38',
    black: '#0C0D0E',
    white: '#FBFCFE',
  };

const DealDetails = ({ route, navigation }) => {
    const { deal } = route.params;
    

      
    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: deal.image}} style={styles.backgroundImage} imageStyle={{opacity:0.4}}>
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={() => navigation.goBack()}>
                    <View style={styles.backWrapper}>
                        <Entypo name="chevron-left" size={32} color={colors.black} />
                        <Text style={styles.locationText}>back</Text>
                    </View>              
                </TouchableOpacity>
                <View style={styles.heartWrapper}>
                    <Entypo name="heart" size={24} color={colors.orange} />
                </View>
                <View style={styles.titlesWrapper}>
                <Text style={styles.itemTitle}>{deal.title}</Text>
                <View style={styles.locationWrapper}>
                    <Entypo name="location-pin" size={30} color={colors.white} />
                    <Text style={styles.locationText}>{deal.address}</Text>
                </View>
                </View>
            </ImageBackground>
            <View style={styles.descriptionWrapper}>
                <View style = {styles.descriptionContainer}>
                    <View style={styles.descriptionTextWrapper}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text style={styles.descriptionText}>{deal.info}</Text>
                    </View>
                    <Image 
                        source={require('../../assets/chopeIcon.png')} 
                        style={styles.brandImage} />
                </View>
                <View style = {styles.voucherBox}>
                        <Text style={styles.voucherTitle}>Vouchers</Text>
                        <FlatList
                            // persistentScrollbar = {true}
                            showsVerticalScrollIndicator = {true} // tryna get scroll bar to show
                            data={deal.vouchers}
                            renderItem={({ item }) => (
                                <View style={styles.voucherContainer}>
                                    <View> 
                                        <Text style={{        
                                            fontFamily: 'DMRegular',
                                            fontSize: 16,
                                            color: colors.black,
                                            paddingBottom: 5}}>
                                            {item.date}, {item.time}</Text>
                                        <Text                                        style={{
                                            fontFamily: 'DMRegular',
                                            fontSize: 14,}}>
                                            Original: {item.price_original}</Text>
                                        <Text
                                        style={{
                                            fontFamily: 'DMBold',
                                            fontSize: 14,}}>
                                            Discounted: {item.price_discounted}</Text>
                                        
                                    </View>
                                    <View style = {styles.savingsWrapper}>
                                        {/* <Text style={{fontFamily: 'DMRegular'}}>Savings:</Text> */}
                                        <Text style={{fontFamily: 'DMBold', fontSize: 22,}}>{item.product_savings}</Text>

                                    </View>
                                    
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                </View>
                <View style={{ flexDirection:"row", justifyContent:'space-around', marginHorizontal:30 }} >
                  <TouchableOpacity style = {styles.buttonWrapper}>
                    <Text style = {styles.buttonText} >View Map</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { Linking.openURL(deal.link); }} style = {styles.buttonWrapper}>
                    <Text style = {styles.buttonText} >Visit Site</Text>
                  </TouchableOpacity>
                </View>             

            </View>





            {/* <Image source={{ uri: deal.image }} style={styles.image} />
            <Text style={styles.title}>{deal.title}</Text>
            <Text style={styles.info}>{deal.info}</Text>
            <Text style={styles.address}>{deal.address}</Text>
            <Text style={styles.hours}>{deal.opening_hours}</Text>

            <FlatList
                data={deal.vouchers}
                renderItem={({ item }) => (
                    <View style={styles.voucherContainer}>
                        <Text>{item.date}</Text>
                        <Text>{item.time}</Text>
                        <Text>Discounted: {item.price_discounted}</Text>
                        <Text>Original: {item.price_original}</Text>
                        <Text>Savings: {item.product_savings}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={styles.tagsContainer}>
                {deal.tags.map((tag, index) => (
                    <Text key={index} style={styles.tag}>{tag}</Text>
                ))}
            </View>

            <TouchableOpacity onPress={() => { Linking.openURL(deal.link); }}>
              <Text style={styles.link}>Visit Offer</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: '#f4f4f4'
    },
    backgroundImage: {
        height: height * 0.3,
        justifyContent: 'space-between',
        // opacity:0.5,
      },
    address: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 5
    },
    backWrapper: {
      flexDirection: 'row',
      alignItems: 'left',
      alignItems: 'center',
      marginTop: 10,
    },
    titlesWrapper: {
      marginHorizontal: 20,
      marginBottom: 40,
    },
    itemTitle: {
      fontFamily: 'DMBold',
      fontSize: 35,
      color: Colors.black,
    },
    descriptionWrapper: {
      flex: 1,
      backgroundColor: colors.white,
      marginTop: -20,
      borderRadius: 25,
    },
    locationWrapper: {
      flexDirection: 'row',
      gap:10,
      alignItems: 'center',
      marginTop: 5,
      marginLeft: -6,
      marginRight: 30,
    },
    locationText: {
      fontFamily: 'DMMedium',
      fontSize: 16,
      color: colors.black,
    },
    heartWrapper: {
      position: 'absolute',
      right: 20,
      top: 10,
      width: 40,
      height: 40,
      backgroundColor: colors.white,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    descriptionContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal:8,
      marginHorizontal:30,
      // paddingRight: 20,
      paddingTop: 25,
    },
    descriptionTextWrapper: {
      // marginTop: 25,
      marginRight: 70,
  
    },
    descriptionTitle: {
      fontFamily: 'DMMedium',
      fontSize: 24,
      color: colors.black,
    },
    descriptionText: {
      marginTop: 10,
      fontFamily: 'DMRegular',
      fontSize: 16,
      color: colors.darkGray,
      height: 85,
    },
    brandImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 10,
      marginBottom: 10,
      alignContent:'center'
    },
    voucherBox:{
        paddingHorizontal: 20,
        paddingBottom:5,
        height: 250,
    },
    voucherTitle:{
        fontFamily: 'DMMedium',
        fontSize: 24,
        color: colors.black,
        paddingBottom:5,
        marginTop: -20,
        // marginBottom: 10,
    },
    voucherContainer: {
        backgroundColor: colors.white,
        marginHorizontal:20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    savingsWrapper: {
      width: 70,
      height: 70,
      backgroundColor: "#dae9ec",
      borderRadius: 64,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      flexDirection: 'column'
    },
    buttonWrapper: {
      marginHorizontal: 40,
      marginTop: 5,
      backgroundColor: COLORS.tertiary,
      alignItems: 'center',
      paddingVertical: 15,
      borderRadius: 10,
      paddingHorizontal: 30
    },
    buttonText: {
      fontFamily: 'DMBold',
      fontSize: 18,
      color: colors.white,
    },
    link: {
        color: 'blue',
        textAlign: 'center',
        marginBottom: 10,
        verticalAlign:'middle'
    },
});

export default DealDetails;
