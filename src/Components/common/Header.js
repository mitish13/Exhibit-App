import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const Header=(props)=>{
    return (
        <View style={styles.view}>
            <Text style={styles.text}>{props.headerName}</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    text:{
        fontSize:22,
        paddingBottom:20,
        fontWeight:"700",
        color:"#dd0031",
        fontFamily:(Platform.OS=='android')?'serif':null,

        

    },
    view:{
        backgroundColor:'lightgrey',
        justifyContent:"center",
        alignItems:"center",
        height:70,
        paddingTop:25,
        borderWidth:1,
        borderColor:"#dd0031",
        elevation:2,
        position:"relative"

    }

})
export default Header