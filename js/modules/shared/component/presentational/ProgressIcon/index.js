// @flow
import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { Icon } from 'native-base';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type State = {
    +spinAmount: Animated.Value,
};

class ProgressIcon extends Component<{}, State> {
    state = {
        spinAmount: new Animated.Value(0),
    };

    componentDidMount() {
        this.spin();
    }

    spin = () => {
        this.state.spinAmount.setValue(0);
        Animated.timing(
            this.state.spinAmount,
            {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
            },
        ).start(() => this.spin());
    }

    render() {
        const spinDegrees = this.state.spinAmount.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <AnimatedIcon
                {...this.props}
                name="refresh"
                style={[{ color: '#fff', transform: [{ rotate: spinDegrees }] }]}
            />
        );
    }
}

export default ProgressIcon;
