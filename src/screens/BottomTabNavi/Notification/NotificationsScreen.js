// import React,{useState,useEffect} from "react";
// import {wifi} from '../Home/HomeScreen';
// import { View, StatusBar, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';



// var wifires = wifi;

// const NotificationsScreen =()=>{
//     console.log("eifi",wifires);
//     return(
//         <View>
//             <Text>{wifires}</Text>
//         </View>
//     )
// }

// export default NotificationsScreen;


import React from 'react'
import { ScrollView, StatusBar, Dimensions, Text, View } from 'react-native'
// import ScrollableTabView from 'react-native-scrollable-tab-view'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import { data, contributionData, pieChartData, progressChartData } from './data'
// import 'babel-polyfill'

// in Expo - swipe left to see the following styling, or create your own
const chartConfigs = [
    {
        backgroundColor: '#000000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    {
        backgroundColor: '#022173',
        backgroundGradientFrom: '#022173',
        backgroundGradientTo: '#1b3fa0',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
    },
    {
        backgroundColor: '#26872a',
        backgroundGradientFrom: '#43a047',
        backgroundGradientTo: '#66bb6a',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    {
        backgroundColor: '#000000',
        backgroundGradientFrom: '#000000',
        backgroundGradientTo: '#000000',
        color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
    }, {
        backgroundColor: '#0091EA',
        backgroundGradientFrom: '#0091EA',
        backgroundGradientTo: '#0091EA',
        color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
    },
    {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    {
        backgroundColor: '#b90602',
        backgroundGradientFrom: '#e53935',
        backgroundGradientTo: '#ef5350',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    {
        backgroundColor: '#ff3e03',
        backgroundGradientFrom: '#ff3e03',
        backgroundGradientTo: '#ff3e03',
        color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`
    }
]

const NotificationsScreen = () => {

    const width = Dimensions.get('window').width
    const height = 220
    return (
        // <ScrollableTabView>
        <View>
            {
                chartConfigs.map(chartConfig => {
                    const labelStyle = {
                        color: chartConfig.color(),
                        marginVertical: 10,
                        textAlign: 'center',
                        fontSize: 16
                    }
                    const graphStyle = {
                        marginVertical: 8,
                        ...chartConfig.style
                    }
                    return (
                        <ScrollView
                            key={Math.random()}
                            style={{
                                backgroundColor: chartConfig.backgroundColor
                            }}
                        >
                            <Text style={labelStyle}>Bezier Line Chart</Text>
                            <LineChart
                                data={data}
                                width={width}
                                height={height}
                                chartConfig={chartConfig}
                                bezier
                                style={graphStyle}
                            />
                            <Text style={labelStyle}>Progress Chart</Text>
                            <ProgressChart
                                data={progressChartData}
                                width={width}
                                height={height}
                                chartConfig={chartConfig}
                                style={graphStyle}
                            />
                            <Text style={labelStyle}>Bar Graph</Text>
                            <BarChart
                                width={width}
                                height={height}
                                data={data}
                                chartConfig={chartConfig}
                                style={graphStyle}
                            />
                            <Text style={labelStyle}>Pie Chart</Text>
                            <PieChart
                                data={pieChartData}
                                height={height}
                                width={width}
                                chartConfig={chartConfig}
                                accessor="population"
                                style={graphStyle}
                            />
                            <Text style={labelStyle}>Line Chart</Text>
                            <LineChart
                                data={data}
                                width={width}
                                height={height}
                                chartConfig={chartConfig}
                                style={graphStyle}
                            />
                            <Text style={labelStyle}>Contribution Graph</Text>
                            <ContributionGraph
                                values={contributionData}
                                width={width}
                                height={height}
                                endDate={new Date('2016-05-01')}
                                numDays={105}
                                chartConfig={chartConfig}
                                style={graphStyle}
                            />
                        </ScrollView>
                    )
                })
            }
        </View>
        // </ScrollableTabView>
    )
}

export default NotificationsScreen;