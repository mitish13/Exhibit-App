import * as firebase from 'firebase';
import React, { Component } from 'react';
import {Text,Button,View,TouchableOpacity,BackHandler,FlatList, Dimensions,StyleSheet} from 'react-native';
import {Feather} from "@expo/vector-icons";
import { YellowBox } from 'react-native';
import _ from 'lodash';
import Spinner from '../common/Spinner';
import { ScrollView } from 'react-native-gesture-handler';


class MainScreen extends Component{
    componentDidMount(){


      YellowBox.ignoreWarnings(['Setting a timer']);
      const _console = _.clone(console);
      console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
          _console.warn(message);
      }
      };
       
      





      const uid=firebase.auth().currentUser.uid;
      firebase.database().ref(`users/${uid}/`)
      .on('value',(snap)=>{
        let eachData=[];
        snap.forEach((child)=>{
          eachData.push({
            Title:child.val().Title,
            key:child.key,
            Date:child.val().Date,
            Time:child.val().Time,
            Location:child.val().Location,
            Category:child.val().Category,
            City:child.val().City,
            Poster:child.val().poster,
            Details:child.val().Details,
            Mobile_Num:child.val().Mobile_Num,
            image:child.val().image
          });
          
        });
        this.setState({Data:eachData});
        
      })
    }

    state={Data:[]}
   
    
    logout(){
      BackHandler.exitApp();
    } 
    
    removeData(item){
      const uid=firebase.auth().currentUser.uid;
      const key=item.key;
      const ref=firebase.database().ref(`users/${uid}/${key}`);
      ref.remove();
    }
  
    renderList(){
      if(this.state.Data==''){

        return <View>
           
        <Text style={{color:'gray',fontSize:45,alignSelf:'center',marginVertical:Dimensions.get('window').height/11}}>Welcome</Text>
        <Text style={{color:'gray',fontSize:25,alignSelf:'flex-start',margin:8}}>Tap  "+"  on top right corner to add exhibition</Text>
        
        </View>
      }


      else{
       return(
           <FlatList 
            data={this.state.Data}
            keyExtractor={(data)=>data.key}
            style={{backgroundColor:'rgb(220,220,220)'}}
            renderItem={({item})=>{
              return( 
                
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShowOrg',{item:item,button:false})}>  
                                

                <View style={{flexDirection:"row",justifyContent:"space-between"
                ,paddingVertical:15,paddingHorizontal:12
                ,borderColor:"gray",borderTopWidth:2}}>
                
                <Text style={{fontSize:18,color:"black"}}> {item.Title.substring(0,20)}  </Text>
               <View style={{flexDirection:'row'}}> 
                <Text style={{fontSize:18,opacity:0.5}}> {JSON.parse(item.Date).split("T",1)} </Text>

                <TouchableOpacity onPress={()=>this.removeData(item)}>

                <Feather name="trash" style={{fontSize:28,marginRight:2}} ></Feather></TouchableOpacity>
                </View>
                </View>
                 </TouchableOpacity>
                 
              )
          } 

          }   
          />)
        }
    }
      


    render(){
             return(
             <ScrollView>  
            <View style={{height:Dimensions.get('window').height}}>
            
            {this.renderList()}
            </View>
            <TouchableOpacity style={{alignSelf:'stretch',marginBottom:5}} onPress={()=>{firebase.auth().signOut(),
                        this.props.navigation.navigate("Home"),this.logout()}}>
                                             
                            <Text style={styles.logout}>
                                    Log Out
                                    </Text>
                                </TouchableOpacity>
            
            </ScrollView>
        );
    }
  }

  const styles=StyleSheet.create({
    logout:{
            
        width:Dimensions.get('screen').width-5,
        fontWeight:'700',
        alignSelf:'center',
        textAlign:'center',
        fontSize:16,
        color:"black",
        fontFamily:(Platform.OS=='android')?'monospace':null,
        borderWidth:1,
        borderColor:'black',
        paddingVertical:10,
        backgroundColor:"rgb(240,240,240)",
        borderRadius:5
       
    }

})



 MainScreen.navigationOptions=(props)=>{
     return{
       headerRight:()=><TouchableOpacity onPress={()=>props.navigation.navigate("CreateExhibition")}>
      <Feather name="plus" size={40} style={{marginRight:5}}></Feather></TouchableOpacity>,

        headerLeft:()=>false,
        headerBackTitleVisible:()=>false,
        //gestureEnabled:()=>false

      title:"Organizer"
  
     }
}

export default MainScreen;