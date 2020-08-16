
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from './src/Components/Home';
import LoginScreen from "./src/Components/orgnizer/LoginScreen";
import MainScreen from './src/Components/orgnizer/MainScreen';
import LoginScreenCust from './src/Components/Customer/LoginScreenCust';
import MainScreenCust from './src/Components/Customer/MainScreenCust';
import CreateExh from './src/Components/orgnizer/CreateExh';
import ShowOrg from './src/Components/orgnizer/ShowOrg';
import ListCust from './src/Components/Customer/ListCust';
import Favorite from './src/Components/Customer/Favorite';
import ImageGallery from './src/Components/common/ImageGallery'
const navigator=createStackNavigator({

  Home:Home,
  LoginOrg:LoginScreen,
  MainOrg:MainScreen,
  LoginCust:LoginScreenCust,
  MainCust:MainScreenCust,
  CreateExhibition:CreateExh,
  ShowOrg:ShowOrg,
  ListCustomer:ListCust,
  Fav:Favorite,
  ImageGallery:ImageGallery,


},{
  initialRouteName:"Home",
  defaultNavigationOptions:{
    title:"Exhibition",headerTitleAlign:'center',headerTintColor:'black'
  }
});


const App=createAppContainer(navigator)
console.disableYellowBox = true;

export default App;
