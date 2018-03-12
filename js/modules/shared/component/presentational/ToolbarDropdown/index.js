// @flow
import React, { Component } from 'react';
import { View, NativeModules, findNodeHandle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const { UIManager } = NativeModules;

type Item = {
    label: string,
    onPress: () => mixed,
}
type Props = {
    +items: $ReadOnlyArray<Item>,
};

// TODO: Refactor in order to make the interface more idiomatic. For example, accept child item components which describe the item's label and onPress
class ToolbarDropdown extends Component<Props> {
    menu: ?View;

    onMenuPressed = () => {
        const { items } = this.props;
        UIManager.showPopupMenu(
            findNodeHandle(this.menu),
            items.map(item => item.label),
            () => {},
            (result, index) => {
                if (index < items.length && items[index].onPress) {
                    items[index].onPress(result);
                }
            },
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View ref={c => this.menu = c} style={styles.menuPlaceholder}/>
                    <MaterialIcons
                        name="more-vert"
                        onPress={() => this.onMenuPressed()}
                        style={styles.icon}
                        size={30}
                    />
                </View>
            </View>
        );
    }
}

export default ToolbarDropdown;
