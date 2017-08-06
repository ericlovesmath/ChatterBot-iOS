import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SettingsList from 'react-native-settings-list';

class InformationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Editor"
  })
  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false};
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            hasSwitch={true}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            hasNavArrow={false}
            title='Allow Danger Options'
            titleStyle={{color:'red'}}
          />
          <SettingsList.Item
            title='Add Private Instance'
            onPress={() => navigate('PrivateInstance')}
          />
          <SettingsList.Item
            title='Add Public Instance'
            onPress={() => navigate('Information')}
          />
        </SettingsList>
      </View>
    )
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }

}


export default InformationScreen;