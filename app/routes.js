import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//auth
import AuthHome from './components/auth';
import Loading from './components/auth/loading';
import AuthForm from './components/auth/authForm';
import FindEmail from './components/auth/findAccount';
//main
import MainHome from './components/main';
import MainForm from './components/main/mainForm';
import EditVehicle from './components/main/editVehicle';
import BrandSelect from './components/main/AddVehicle';
import ModelSelect from './components/main/AddVehicle/modelSelect';
import BabilLink from './components/main/AddVehicle/babilLink';
import BabilScan from './components/main/AddVehicle/babilScan';
import BikeNickName from './components/main/AddVehicle/bikeNickName';
import RegistrationResult from './components/main/AddVehicle/registrationResult';
//settings
import InfoHome from './components/settings/userInfo';
import AppSettings from './components/settings/appSettings';
import FAQ from './components/settings/qeustions';
import ServiceCenter from './components/settings/serviceCenter';
import ServiceTerms from './components/settings/policies/serviceTerms';
import PersonalInfoTerms from './components/settings/policies/personalInfoTerms';
import Agreement from './components/settings/policies/agreement';
import MyInfo from './components/settings/userInfo/myInfo';
import MyVehicle from './components/settings/userInfo/myVehicle';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const FindAccountTabs = createMaterialTopTabNavigator();
const MainStack = createStackNavigator();
const CompStack = createStackNavigator();
const InfoStack = createStackNavigator();
const PoliciesStack = createMaterialTopTabNavigator();
const AddVehicleStack = createStackNavigator();
const MainHomeDrawer = createDrawerNavigator();

const FindAccount = () => {
    const headerConfig = {
        common: {
            tabBarLabelStyle: {
                fontSize: 15,
                fontWeight: 'bold'
            }
        },
    }
    return (
        <FindAccountTabs.Navigator screenOptions={ headerConfig.common }>
            <FindAccountTabs.Screen name="FindEmail" component={FindEmail} options={{ title:'이메일 찾기' }} />
            <FindAccountTabs.Screen name="FindPassword" component={FindEmail} options={{ title:'비밀번호 찾기' }} />
        </FindAccountTabs.Navigator>
    )
}

const AuthComponent = () => {
    const headerConfig = {
        common: ({ route }) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            title: route.params?.type ?? null
        }),
        authForm: ({route}) => ({
            title: route.params.type == 'login' ?
            null
            :
            '계정 정보 입력하기'
        }),
        policies: {
            title: '계정 찾기'
        }
    }
    return (
        <AuthStack.Navigator initialRouteName='AuthHome' screenOptions={ headerConfig.common }>
            <AuthStack.Screen name="AuthHome" component={AuthHome} options={{ headerShown: false }}/>
            <AuthStack.Screen name="Agreement" component={Agreement} />
            <AuthStack.Screen name="Policies" component={Policies} options={ headerConfig.policies }/>
            <AuthStack.Screen name="AuthForm" component={AuthForm} options={ headerConfig.authForm }/>
            <AuthStack.Screen name="FindAccount" component={FindAccount}/>
        </AuthStack.Navigator>
    )
}

const AddVehicle = () => {
    const headerConfig = {
        common: {
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        },
        brandSelect: {
            title: '바이크종 선택',
        },
        modelSelect: {
            title: '바이크 정보',
        },
        babilLink: {
            title: '바빌 키 확인'
        },
        babilScan: {
            title: ''
        }
    }
    return (
        <AddVehicleStack.Navigator initialRouteName='BrandSelect' screenOptions={ headerConfig.common } >
            <AddVehicleStack.Screen name="BrandSelect" component={BrandSelect} options={{ title: '바이크종 선택' }} />
            <AddVehicleStack.Screen name="ModelSelect" component={ModelSelect} options={{ title: '바이크 정보' }} />
            <AddVehicleStack.Screen name="BabilLink" component={BabilLink} options={{ title: '바빌 키 확인' }} />
            <AddVehicleStack.Screen name="BabilScan" component={BabilScan} options={{ title: '바빌 키 스캔' }} />
            <AddVehicleStack.Screen name="BikeNickName" component={BikeNickName} options={{ title: '내 바이크 등록' }} />
            <AddVehicleStack.Screen name="RegistrationResult" component={RegistrationResult} options={{ title: '내 바이크 등록' }}/>
        </AddVehicleStack.Navigator>
    )
}

const MainComponent = () => {
    const headerConfig = {
        common: {
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        },
        mainForm: ({ navigation, route })=>({
            headerRight: ()=>(
                <TouchableOpacity
                    onPress={()=>navigation.push("EditVehicle", { selectedBabilKey: route.params.selectedBabilKey, devMode: true })}
                    style={{ margin:10 }}
                >
                    <Text style={{ fontSize:15 }}>편집</Text>
                </TouchableOpacity>
            ),
            title: '바빌 키 제어',
        }),
        editVehicle: {
            title: '바빌 키 편집'
        },
    }
    return (
        <MainStack.Navigator initialRouteName='MainHome' screenOptions={ headerConfig.common }>
            <MainStack.Screen name="MainHome" component={MainHome} options={{ headerShown: false }}/>
            <MainStack.Screen name="MainForm" component={MainForm} options={ headerConfig.mainForm }/>
            <MainStack.Screen name="EditVehicle" component={EditVehicle} options={ headerConfig.editVehicle }/>
            <MainStack.Screen name="AddVehicle" component={AddVehicle} options={{ headerShown: false }}/>
        </MainStack.Navigator>
    )
}

const MainHomeScreen = () => {
    return (
        <MainHomeDrawer.Navigator
            drawerContent={ ({navigation}) => {
                return (
                    <DrawerContentScrollView>
                        <DrawerItem
                            label="개인정보관리"
                            onPress={()=>navigation.getParent().navigate("UserInfoComponent")}
                        />
                        <DrawerItem
                            label="환경설정"
                            onPress={()=>navigation.getParent().navigate("AppSettings")}
                        />
                        <DrawerItem
                            label="고객센터"
                            onPress={()=>navigation.getParent().navigate("ServiceCenter")}
                        />
                        <DrawerItem
                            label="FAQ"
                            onPress={()=>navigation.getParent().navigate("FAQ")}
                        />
                        <DrawerItem
                            label="약관 및 정책"
                            onPress={()=>navigation.getParent().navigate("Policies")}
                        />
                    </DrawerContentScrollView>
                )}
            }
            screenOptions={{ swipeEnabled: false }}
        >
            <MainHomeDrawer.Screen name="MainComponent" component={MainComponent}
                options={({route}) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'MainHome';
                    if (routeName != 'MainHome') {
                        return ({
                            headerShown: false,
                        })
                    } else {
                        return ({
                            title: null,
                        })
                    }
                }}
            />
        </MainHomeDrawer.Navigator>
    )
}

const UserInfoComponent = () => {
    const headerConfig = {
        common: {
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        },
        infoHome: {
            title: '개인정보관리',
        },
        myInfo: {
            title: '내 정보 관리',
        },
        myVehicle: {
            title: '내 바이크 관리'
        }
    }
    return (
        <InfoStack.Navigator screenOptions={ headerConfig.common }>
            <InfoStack.Screen name="InfoHome" component={InfoHome} options={ headerConfig.infoHome } />
            <InfoStack.Screen name="MyInfo" component={MyInfo} options={ headerConfig.myInfo } />
            <InfoStack.Screen name="MyVehicle" component={MyVehicle} options={ headerConfig.myVehicle } />
        </InfoStack.Navigator>
    )
}

const Policies = () => {
    const headerConfig = {
        common: {
            tabBarLabelStyle: {
                fontSize: 15,
                fontWeight: 'bold'
            }
        },
    }
    return (
        <PoliciesStack.Navigator screenOptions={ headerConfig.common }>
            <PoliciesStack.Screen name="ServiceTerms" component={ServiceTerms} options={{ title:'서비스 이용 약관' }} />
            <PoliciesStack.Screen name="PersonalInfoTerms" component={PersonalInfoTerms} options={{ title:'개인정보 제3자 제공 약관' }} />
        </PoliciesStack.Navigator>
    )
}

const CompComponent = () => {
    const headerConfig = {
        common: {
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        },
        appSettings: {
            title: '환경설정'
        },
        serviceCenter: {
            title: '고객센터'
        },
        policies: {
            title: '약관 및 정책'
        }
    }
    return (
        <CompStack.Navigator initialRouteName='MainHomeScreen' screenOptions={ headerConfig.common } >
            <CompStack.Screen name="MainHomeScreen" component={MainHomeScreen} options={{ headerShown: false }}/>
            <CompStack.Screen name="UserInfoComponent" component={UserInfoComponent} options={{ headerShown: false }} />
            <CompStack.Screen name="AppSettings" component={AppSettings} options={ headerConfig.appSettings } />
            <CompStack.Screen name="ServiceCenter" component={ServiceCenter} options={ headerConfig.serviceCenter } />
            <CompStack.Screen name="FAQ" component={FAQ}/>
            <CompStack.Screen name="Policies" component={Policies} options={ headerConfig.policies } />
        </CompStack.Navigator>
    )
}

export const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Loading" component={Loading}/>
            <RootStack.Screen name="CompComponent" component={CompComponent}/>
            <RootStack.Screen name="AuthComponent" component={AuthComponent}/>
        </RootStack.Navigator>
    )
}