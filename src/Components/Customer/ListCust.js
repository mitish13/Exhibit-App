import * as firebase from 'firebase';
import {Feather} from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

import React,{Component} from 'react';
import {View,Text,FlatList,TouchableOpacity, Dimensions,Button,BackHandler,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Prompt from 'react-native-input-prompt'
import Card from '../common/Card'
class ListCust extends Component{
    componentDidMount(){
        this.setState({isData:true})
        firebase.database().ref(`users/`).once('value').then(snap=>{
            let eachKey=[];
            snap.forEach((item)=>{
                //console.log(item.key)
                eachKey.push({
                    key:item.key
                })
                
                let eachData=[];

                for(var i=0;i<eachKey.length;i++){
                    firebase.database().ref(`users/${eachKey[i].key}`).on('value',(snap)=>{
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
                
            })
            
        })

        
        
        
    }
    
    constructor(){
        super();
        global.dataToshow=[]
       // global.isVisible=false
        


    }
   

    state={Data:[],isVisible:false,isData:true,noOfInterested:0}

    logout(){
        BackHandler.exitApp();
    }

    
  

    
      test(){
        const City=this.props.navigation.getParam('City')
        console.log(City);
        const Category=this.props.navigation.getParam('Category')
        console.log(Category);
        
        return(
          
            <FlatList 
             data={this.state.Data}
             style={{backgroundColor:'black'}}   
             keyExtractor={(data)=>data.key}
             renderItem={({item})=>{
                  // const citysmall=item.City.toLowerCase();
                  // const categorysmall=item.Category.toLowerCase();

                 if(item.City==City && item.Category==Category && this.state.isData==true){
                    console.log("found")
                    global.dataToshow.push(item)
                return(

                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShowOrg',{item:item})}>  

 
                 <View style={{flexDirection:"row",justifyContent:"space-between"
                 ,paddingVertical:15,paddingHorizontal:12
                 ,borderColor:"white",borderWidth:1}}>
 
                 <Text style={{fontSize:18,color:'white'}}> {item.Title}  </Text>
                                    
                                    

                 <Text style={{fontSize:18,opacity:0.6,color:'white'}}> {JSON.parse(item.Date).split("T",1)} </Text>
                    
                 
                 </View>
                 </TouchableOpacity>
             
               ) }

                
                    
           }
        
        }
           
             
           />
           ) 
      }
   
search(value){
        const City=this.props.navigation.getParam('City')
        const searchData=[]
        const Category=this.props.navigation.getParam('Category')

        this.state.Data.forEach((item)=>{
            if(item.City==City && item.Category==Category && item.Title.includes(value)){
                searchData.push(item);
                this.setState({isData:true,Data:searchData})
                //console.log(searchData)
           }else{
                //console.log(searchData)
                
            }
        })

      }





   
    sorry(){
       // console.log(global.dataToshow)
       // console.log(global.dataToshow.length)
        if(global.dataToshow.length==0){
            return(
                <View style={{marginTop:50,margin:10,marginBottom:70}}>
                   
                <Text style={{fontSize:20,opacity:0.5,color:'grey'}}>If you do not find any result then go back and select other city/category</Text>
                </View>
            )

          
        }
    }

       
   

    render(){
        
        
        return(
           <View style={{flex:1}}> 
               <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomColor:'black'}}>    
           
           <TouchableOpacity   style={{alignSelf:'flex-start'}} onPress={()=>this.setState({isVisible:true,isData:false})}>
           <Feather name="search" size={30} style={{marginLeft:10,alignSelf:'flex-start',marginTop:5,marginBottom:0}}></Feather></TouchableOpacity>   
          
          <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

           <Text style={{marginTop:10,opacity:0.5,fontSize:15}}>Cancel filter </Text>
           <TouchableOpacity  onPress={()=>this.componentDidMount()} style={{alignSelf:'flex-end'}}>
           <MaterialIcons name="cancel" size={30} color="black"  style={{marginRight:10,alignSelf:'flex-end',marginTop:5,marginBottom:0}}></MaterialIcons></TouchableOpacity>
           </View>
           
           <Prompt visible={this.state.isVisible}
                   title='Search by Title'
                   placeholder="Search by title"
                   onCancel={()=>this.setState({isVisible:false,isData:true})}
                   onSubmit={(value)=>{this.setState({isVisible:false,isData:false}),this.search(value)}}>

           </Prompt>    
           </View>
               
            <ScrollView >
            
            <View style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>
            

            
                <Card>
                {this.test()}
                </Card>
               
               
                {this.sorry()}

                
                
               

                
            </View>
            <TouchableOpacity style={{alignSelf:'stretch',marginBottom:5}} onPress={()=>{firebase.auth().signOut(),
                        this.props.navigation.navigate("Home"),this.logout()}}>
                                             
                            <Text style={styles.logout}>
                                    Log Out
                                    </Text>
                                </TouchableOpacity>


            </ScrollView></View>
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
        backgroundColor:"rgb(220,220,220)",
        borderRadius:5
       
    }

})

ListCust.navigationOptions=({navigation})=>{

    return{
        
        
headerRight:()=><View>
      
     
  
    </View>
        
    }}

export default ListCust;