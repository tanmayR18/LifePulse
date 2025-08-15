import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef()

export async function navigate(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params))
    }
}
export async function resetAndNavigate(routeName: string) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: routeName }]
        }))
    }
}