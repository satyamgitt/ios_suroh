import * as React from 'react';
import { Animated, Image, FlatList, View, StatusBar, Dimensions, StyleSheet, Text, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .55;

const images = [
    'https://media.designcafe.com/wp-content/uploads/2020/02/21005335/interior-design-ideas-for-hall.jpg',
    'https://media.designcafe.com/wp-content/uploads/2021/09/15180410/pop-ceiling-designs-for-hall.jpg',
    'https://i.pinimg.com/564x/f2/98/55/f29855d98e23fc0281185fb8c9b8e1ef.jpg',
    'https://5.imimg.com/data5/AV/FT/MY-22814266/living-hall-wall-design-500x500.jpg',
    'https://5.imimg.com/data5/SELLER/Default/2021/3/ZX/UG/FH/37018428/modular-hall-interior-jfif-500x500.jpg',
];

const product = {
    title: 'I-SWITCH SMART HOME',
    description: [
        'Turn On Your Devices'
    ],
    price: '29.99£'
}

const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const Scroll = () => {
    const scrolly = React.useRef(new Animated.Value(0)).current;

    return (<View>
        <StatusBar hidden />
        <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
            <Animated.FlatList
                data={images}
                keyExtractor={(_, index) => index.toString()}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrolly } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item }) => {
                    return <View>
                        <Image source={{ uri: item }} style={styles.image} />
                    </View>
                }}
            />
            <View style={styles.pagination}>
                {images.map((_, index) => {
                    return <View
                        key={index}
                        style={[styles.dot]}
                    />
                })}
                <Animated.View
                    style={[styles.dotIndicator, {
                        transform: [{
                            translateY: Animated.divide(scrolly, ITEM_HEIGHT).interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, DOT_INDICATOR_SIZE]
                            })
                        }]
                    }]}>

                </Animated.View>
            </View>
        </View>
        <View style={styles.MainContainer}>


            <View style={{
                backgroundColor: '#00C853',
                width: '100%',
                height: 50,
                position: 'absolute',
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Text style={styles.text}>bottomtab</Text>


            </View>

        </View>
    </View>
    )
}

export default Scroll;

const styles = StyleSheet.create({
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover'
    },
    pagination: {
        position: 'absolute',
        top: ITEM_HEIGHT / 2,
        left: 20
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: '#333',
        marginBottom: DOT_SPACING,
    },
    dotIndicator: {
        width: DOT_INDICATOR_SIZE,
        height: DOT_INDICATOR_SIZE,
        borderRadius: DOT_INDICATOR_SIZE,
        borderWidth: 1,
        borderColor: '#333',
        position: 'absolute',
        top: -DOT_SIZE / 2,
        left: -DOT_SIZE / 2,
    },
    MainContainer: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },

    text: {
        fontSize: 22,
        color: 'white'
    },
})