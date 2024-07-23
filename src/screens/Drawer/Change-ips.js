import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const Changeip = () => {
    return (
        <Text style={{ alignContent: 'flex-end', marginLeft: 10, color: 'white' }}>Hello Welcome to this page</Text>
    )
}
export default Changeip;



// import React from "react";
// import { View, Image, Text, StyleSheet } from "react-native";

// const DisplayAnImageWithStyle = () => {
//     return (
//         <View style={styles.container}>
//             <View>
//                 <Image
//                     style={{
//                         resizeMode: "cover",
//                         height: 100,
//                         width: 200
//                     }}
//                     source={require("@expo/snack-static/react-native-logo.png")}
//                 />
//                 <Text>resizeMode : cover</Text>
//             </View>
//             <View>
//                 <Image
//                     style={{
//                         resizeMode: "contain",
//                         height: 100,
//                         width: 200
//                     }}
//                     source={require("@expo/snack-static/react-native-logo.png")}
//                 />
//                 <Text>resizeMode : contain</Text>
//             </View>
//             <View>
//                 <Image
//                     style={{
//                         resizeMode: "stretch",
//                         height: 100,
//                         width: 200
//                     }}
//                     source={require("@expo/snack-static/react-native-logo.png")}
//                 />
//                 <Text>resizeMode : stretch</Text>
//             </View>
//             <View>
//                 <Image
//                     style={{
//                         resizeMode: "repeat",
//                         height: 100,
//                         width: 200
//                     }}
//                     source={require("@expo/snack-static/react-native-logo.png")}
//                 />
//                 <Text>resizeMode : repeat</Text>
//             </View>
//             <View>
//                 <Image
//                     style={{
//                         resizeMode: "center",
//                         height: 100,
//                         width: 200
//                     }}
//                     source={require("@expo/snack-static/react-native-logo.png")}
//                 />
//                 <Text>resizeMode : center</Text>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         display: "flex",
//         flexDirection: "vertical",
//         justifyContent: "space-around",
//         alignItems: "center",
//         height: "100%",
//         textAlign: "center"
//     }
// });

// export default DisplayAnImageWithStyle;

// import React, { useState } from "react";
// import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

// const { width, height } = Dimensions.get('screen');
// const diognal = height / width;
// const size = diognal * 6.65;

// const Changeip = () => {

    // class dynamicImageColor extends Component{
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     myDynamicColor: '#ffffff'
    //   }
    // }
    // const [myDynamicColor, setDynamicColor] = useState('');

    // changeColor = (bool) => {
    //     setDynamicColor({ myDynamicColor: bool ? '#932727' : '#ffffff' })
    // }


    // return (
    //     <Image source={require('../../assets/productivity.jpg')} style={styles.PNGImageStyle} />
    // )

    //   }



    // return (

    //     <TouchableOpacity style={{ width: '50%', marginBottom: 25, height: 50, borderRadius: 15 }}>

    //         <View style={{ height: '20%', width: '30%' }}>
    //             <Image source={require('../../assets/productivity.jpg')} resizeMode='cover' />
    //         </View>

    //         <View style={{ height: '10%', width: '20%', justifyContent: 'center', alignItems: 'center' }}>
    //             <Text>Productivity</Text>
    //         </View>

    //     </TouchableOpacity>
    // )
// }

// export default Changeip;

// var styles = StyleSheet.create({
//     PNGImageStyle: {
//         tintColor: this.state.myDynamicColor,
//         width: 25,
//         height: 25
//     }
// })
