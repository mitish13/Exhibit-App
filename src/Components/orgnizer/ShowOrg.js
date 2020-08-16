import React,{Component} from 'react';
import * as firebase from 'firebase';
import {View,Text,StyleSheet, Platform,Dimensions,TouchableOpacity, AsyncStorage,Image} from 'react-native';
import Card from '../common/Card';
import { ScrollView } from 'react-native-gesture-handler';
import Communications from 'react-native-communications';
import LocalStorage from 'react-native-storage-simply';


class ShowOrg extends Component{
    componentDidMount(){
      // const interest= AsyncStorage.getItem('interest')
       // this.setState({interest:interest});
       
            //console.log(snap.val().interest)
        //AsyncStorage.removeItem('fav')
        this.getIntArr();
        const item=this.props.navigation.getParam('item');
        firebase.database().ref(`users/key/${item.key}`).once('value').then(snap=>{
            console.log(snap.numChildren())
            this.setState({noOfint:snap.numChildren()})
            


        })
       
      }
      
   
      getIntArr=async()=>{
        const item=this.props.navigation.getParam('item');


        try{
            const fav=await AsyncStorage.getItem('fav');

            const favArray=JSON.parse(fav)


            favArray.forEach((itemeach)=>{
                if(item.key==itemeach.key){
                    this.setState({interest:'yes'})
                }else return;
            })


        }catch(e){
            console.log(e)
        } 

      }

    
    state={interest:'no',noOfint:0}

      fav(item){
        LocalStorage.push('fav',item,false).then(()=>{
            console.log('solved');
            firebase.database().ref(`users/key/${item.key}/`).push({interest:firebase.auth().currentUser.uid})

            })
        }
      

 
   
    buttonInterest(){
        const item=this.props.navigation.getParam('item');

        if(this.state.interest=='no')
        return(
            <TouchableOpacity 
            onPress={()=>{this.fav(item),this.setState({interest:'yes'})}}>
            
            <Text style={styles.contact}>
                  Interested?
            </Text></TouchableOpacity>
        )
        else if(this.state.interest=='yes'){
            return(
                
            <Text style={styles.interest} disabled={true}>
                  Interested
                  </Text>
             ) }
    }
    
    buttonConditional(){
        const button=this.props.navigation.getParam('button');
        const item=this.props.navigation.getParam('item');


        if(button!==false){
        return(
            <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>                
            <TouchableOpacity 
              
                          onPress={() => Communications.phonecall(item.Mobile_Num, true)}>
                              <Text style={styles.contact}>
                              Contact Us
                              </Text>
                          </TouchableOpacity>
               
              {this.buttonInterest()}  
        </View>
        )
    }}
   
render(){
    const item=this.props.navigation.getParam('item');
    const Date=JSON.parse(item.Date).split("T",1);
    const Time=JSON.parse(item.Time).split('T',1)
    return(
        <ScrollView>
            <View style={{height:Dimensions.get('window').height}}> 
                
          <Card>
                <View style={styles.titleContainer}>
{/* Title */}

                <Text style={styles.titleText} >{item.Title}</Text>
{/* category */}
                <View style={{flexDirection:'row'}}>
                   
                   <Text style={styles.dateText}>Category :</Text>
                   <Text style={styles.Date}>{item.Category}</Text>
               
               </View> 
{/* Date */}
               <View style={{flexDirection:'row'}}>
                   
                    <Text style={styles.dateText}>Date :</Text>
                    <Text style={styles.Date}>{Date}</Text>
                
                </View> 
                <View style={{flexDirection:'row'}}>
{/* Time  */}
                     <Text style={styles.dateText}>Time :</Text>
                     <Text style={styles.Date}>{Time}</Text>
                </View>
{/* City  */}
                <View style={{flexDirection:'row'}}>
                   
                   <Text style={styles.dateText}>City :</Text>
                   <Text style={styles.Date}>{item.City}</Text>
               
               </View> 

{/*Location  */}
                <View style={{flexDirection:"row"}}>
                     <Text style={styles.dateText}>Venue :</Text>

                     <Text style={styles.Date}>{item.Location}</Text>
                    
                </View>    
{/* Details */}
                    
                   <Card>

                    <Text style={styles.dateText}>Other Details:</Text>
                    
                    <Text style={styles.detail} >{item.Details}</Text>

                    </Card>    
                                  
                    
                {this.buttonConditional()}
 {/* no of interesting people */}
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('ImageGallery',{image:item.image.i})} style={{height:200,width:200}}>
                 <Image source={{uri:item.image.i}}  style={{alignSelf: 'stretch',
                                                            marginTop:10,
                                                            marginLeft:5,
                                                            height: 200,
                                                            width: 200,
                                                            borderWidth: 1,
                                                            
                                                            borderRadius: 10}}></Image></TouchableOpacity>


                <Text style={styles.noOfinterested}>
                 <Text style={{color:'black',fontWeight:'700'}}>{this.state.noOfint}</Text> people around you are interested in this exhibition

                 </Text>
                 
                </View>

            </Card>


</View>

        </ScrollView>

    )
}
}

const styles=StyleSheet.create({
    titleContainer:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        
    },
    titleText:{
        fontSize:30,
        alignSelf:'stretch',
        justifyContent:'center',
        marginLeft:10,
        marginTop:2,
        marginRight:10,
        letterSpacing:2.5,
        fontWeight:"700",
        fontFamily:(Platform.OS=='android')?'serif':null,
        
        borderColor:'black',
        
        padding:5
        },
    dateText:{
        margin:10,
        marginTop:15,
        fontWeight:'700',
        marginRight:10,
        fontSize:17,
        fontFamily:(Platform.OS=='android')?'monospace':null},
    Date:{
        margin:10,
        marginTop:15,  
        fontWeight:'600',
        fontSize:17,
        
    },
    detail:{
        margin:10,
        marginTop:2,  
        fontWeight:'600',
        fontSize:17,
        
        
    },
    contact:{
        margin:10,
        marginTop:15,
        fontWeight:'700',
        marginRight:10,
        fontSize:17,
        color:"black",
        fontFamily:(Platform.OS=='android')?'monospace':null,
        borderWidth:1,
        borderColor:'black',
        padding:10,
        borderRadius:10,
        
    },interest:{
        margin:10,
        marginTop:15,
        fontWeight:'700',
        marginRight:10,
        fontSize:17,
        color:"gray",
        fontFamily:(Platform.OS=='android')?'monospace':null,
        borderWidth:1,
        borderColor:'gray',
        padding:10,
        opacity:0.7,
        borderRadius:10,
        
    },
    noOfinterested:{
        fontSize:20,
        alignSelf:'auto',
        color:'gray',
        margin:4,
        marginTop:8
        
    }

})


export default ShowOrg;