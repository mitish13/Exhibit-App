import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card=(props)=>{
    return <View style={styles.cardStyle}>{props.children}</View>
}

const styles=StyleSheet.create({
    cardStyle:{
        borderWidth:1,
        borderRadius:2,
        borderColor:'#ddd',
        borderBottomWidth:0,
        shadowColor:'#000',
        shadowOffset:{height:2,width:0},
        shadowOpacity:0.1,
        shadowRadius:2,
        elevation:1,
        marginHorizontal:5,
        marginTop:10
    }
});

export default Card;