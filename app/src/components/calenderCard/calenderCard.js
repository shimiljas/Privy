import React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'native-base';
import Styles from './Styles';
import Images from '../../common/images';
import Color from '../../common/Color';
import KeyWords from '../../common/Localization';
import moment from 'moment';

class CalenderCard extends React.Component {
  constructor (props) {
    super (props);
  }

  test () {}

  render () {
    const {data, date} = this.props;

    return (
      <View style={Styles.cardArea}>
        <View style={[Styles.container]}>
          <View style={Styles.dataView}>
            <Image
              resizeMode="stretch"
              source={Images.dateShowImage}
              style={Styles.dataImage}
            />
            <View style={Styles.dataText}>
              <Text style={[Styles.nameStyle, {color: Color.whiteClr}]}>
                {moment (date, 'YYYY-MM-DD').date ()}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,

              flexDirection: 'row',
            }}
          >
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={{fontSize: 14, color: 'grey', fontWeight: 'bold'}}>
                  Category
                </Text>
                <Text style={{fontSize: 11, marginTop: 8, fontWeight: 'bold'}}>
                  {data && data.cname
                    ? data.cname
                    : ''}
                </Text>
              </View>
              <View style={{marginTop: 10, alignItems: 'flex-start'}}>
                <Text style={{fontSize: 14, color: 'grey', fontWeight: 'bold'}}>
                  Limit
                </Text>
                <Text style={{fontSize: 11, marginTop: 8, fontWeight: 'bold'}}>
                  {data && data.size
                    ? data.size
                    : ''}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                resizeMode="contain"
                source={Images.scienceImg}
                style={{width: 50, height: 50}}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={{fontSize: 14, color: 'grey', fontWeight: 'bold'}}>
                  Time
                </Text>
                <Text style={{fontSize: 11, marginTop: 8, fontWeight: 'bold'}}>
                  {data && data.dhours
                    ? data.dhours
                    : ''}
                  {' '}
                  Hr
                </Text>
              </View>
              <View style={{marginTop: 10, alignItems: 'flex-start'}}>
                <Text style={{fontSize: 14, color: 'grey', fontWeight: 'bold'}}>
                  Bookings
                </Text>
                <Text style={{fontSize: 11, marginTop: 8, fontWeight: 'bold'}}>
                  22
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export {CalenderCard};

/*
<View style={Styles.LeftArea}>
            <Text style={[Styles.nameStyle2]}>{KeyWords.category}</Text>
            <Text style={[Styles.nameStyle, Styles.paddingBottom5]}>English</Text>
            <Text style={[Styles.nameStyle2]}>{KeyWords.limit}</Text>
            <Text style={[Styles.nameStyle]}>30</Text>
          </View>
          <View style={Styles.middleView}>
            <Image
              resizeMode="contain"
              source={Images.scienceImg}
              style={Styles.imagestyle}
            />
          </View>
          <View style={Styles.rightView}>
            <Text style={[Styles.nameStyle2]}>{KeyWords.time}</Text>
            <Text style={[Styles.nameStyle, Styles.paddingBottom5]}>01pm - 2pm</Text>
            <Text style={[Styles.nameStyle2]}>{KeyWords.titleBooking}</Text>
            <Text style={[Styles.nameStyle]}>22</Text>
          </View>

          */
