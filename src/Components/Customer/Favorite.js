import React,{Component } from 'react';
import * as firebase from 'firebase';
import {View,AsyncStorage,FlatList,TouchableOpacity,Text, Dimensions} from 'react-native';
import {Feather} from "@expo/vector-icons";
import LocalStorage from 'react-native-storage-simply';


class Favorite extends Component{
    componentDidMount(){
        this.getIntArr();


    }
    state={Data:[]}

  async removeData(item){
      if(this.state.Data!==null && this.state.Data!==[]){
        const newData=this.state.Data.filter((itemeach)=>item.key!==itemeach.key)

        await AsyncStorage.setItem('fav',JSON.stringify(newData)).then(()=>this.componentDidMount())

    
        firebase.database().ref(`users/key/${item.key}/`).once('value').then(snap=>{
            let eachKey=[];
            snap.forEach((itemeach)=>{
                //console.log(item.key)
                eachKey.push({
                    key:itemeach.key
                }) 
                console.log(eachKey);})
              
             for(var i=0;i<eachKey.length;i++){   
                firebase.database().ref(`users/key/${item.key}/${eachKey[i].key}`).on('value',snap=>{
                    try{
                        if(firebase.auth().currentUser.uid==snap.val().interest){
                            firebase.database().ref(`users/key/${item.key}/${eachKey[i].key}`).remove();

                        }}
                    catch{
                        
                            console.log('hiihi')
                        }
                    })
            }

            
           
        }).then(()=>{
            console.log("hiii")
        }).catch(()=>{
            console.log('hiii')
        })
            
         
       }}
    


    getIntArr=async()=>{
        const item=this.props.navigation.getParam('item');


        try{
            const fav=await AsyncStorage.getItem('fav');
            
            const favArray=JSON.parse(fav)
            this.setState({Data:favArray});
            //console.log(this.state.Data)   
        }
        catch(e){
            console.log(e)
        } 

}

renderList(){
    if(this.state.Data==''){

        console.log(this.state.Data)
        return( 
        <Text style={{color:'gray',fontSize:25,alignSelf:'center',marginVertical:Dimensions.get('window').height/3}}>No Favorites found</Text>
        )
    }
else {         
    //console.log(this.state.Data)


    return(
        <View>
        <FlatList 
            data={this.state.Data}
            keyExtractor={(data)=>data.key}
         renderItem={({item})=>{
     return(
       
       <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShowOrg',{item:item,button:true})}>  
                       

       <View style={{flexDirection:"row",justifyContent:"space-between"
       ,paddingVertical:15,paddingHorizontal:12
       ,borderColor:"gray",borderTopWidth:2}}>
       
       <Text style={{fontSize:18}}> {item.Title.substring(0,20)}  </Text>
      <View style={{flexDirection:'row'}}> 
       <Text style={{fontSize:18,opacity:0.5}}> {JSON.parse(item.Date).split("T",1)} </Text>

       <TouchableOpacity onPress={()=>this.removeData(item)}>

       <Feather name="trash" style={{fontSize:28,marginRight:2}}></Feather></TouchableOpacity>
       </View>
       </View>
        </TouchableOpacity>
        
     )
 } 

 }   
 />
   </View>

    )
}
}

    

    state={Data:[]}

    render(){

        return(
            <View>
                {this.renderList()}
            </View>
        )
    }
}
   


Favorite.navigationOptions=(props)=>{
    return{
      
       //gestureEnabled:()=>false

     title:"Favorites"
 
    }
}
export default Favorite;
