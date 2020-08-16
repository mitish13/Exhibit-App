import React from 'react';
import {View,Text,StyleSheet} from 'react-native';


const CardSection=(props)=>{
    return(
        <View style={styles.styles}>
            {props.children}
        </View>
    )
};

const styles=StyleSheet.create({
    styles:{
        padding:5,
        backgroundColor:"#fff",
        justifyContent:"flex-start",
        flexDirection:"row",
        borderColor:"#ddd",
        position:"relative",
        borderBottomWidth:1
    }

});

export default CardSection;