import React,{ Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

class ImageGallery extends Component{

  
    
    render(){
        const image=this.props.navigation.getParam('image');
        return(
            <View style={{backgroundColor:'black'}}>
                <Text>hii</Text>
                {console.log(image)}
                <Image source={{uri:image}}  style={{ resizeMode: 'contain', width: '100%', height: '100%',alignSelf:'center'}}></Image>
            </View>
        )
    }
}

export default ImageGallery;