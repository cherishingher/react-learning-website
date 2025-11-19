import * as React from "react"
import * as PropTypes from "prop-types"
import * as TimerMixin from "react-timer-mixin"
import createReactClassModule from "create-react-class"
import { throttle } from "react-bits/es/modules/util/throttle"

const createReactClass =
  (createReactClassModule &&
    (createReactClassModule.default || createReactClassModule)) ||
  createReactClassModule

const ensurePositiveDelayProps = (_props) => {}

const InsetPropType = PropTypes.shape({
  top: PropTypes.number,
  left: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number
})

export const createTouchable = (Animated, StyleSheet, Platform, TouchableMixin) => {
  const styles = StyleSheet.create({
    touchable: Platform.select({
      web: {
        cursor: "pointer"
      },
      ios: {},
      android: {},
      sketch: {},
      vr: {}
    })
  })

  const propTypes = {
    accessible: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    onLayout: PropTypes.func,
    onLongPress: PropTypes.func,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    delayLongPress: PropTypes.number,
    pressRetentionOffset: InsetPropType,
    hitSlop: InsetPropType,
    activeValue: PropTypes.number,
    press: PropTypes.instanceOf(Animated.Value),
    pressDuration: PropTypes.number,
    children: PropTypes.node
  }

  return createReactClass({
    propTypes,
    displayName: "Touchable",
    mixins: [TimerMixin, TouchableMixin],
    statics: {
      Mixin: TouchableMixin
    },
    getDefaultProps() {
      return {
        activeValue: 1,
        delayPressIn: 0,
        delayPressOut: 100,
        delayLongPress: 500,
        pressDuration: 150,
        pressRetentionOffset: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 30
        },
        press: new Animated.Value(0)
      }
    },
    getInitialState() {
      return this.touchableGetInitialState()
    },
    componentDidMount() {
      ensurePositiveDelayProps(this.props)
    },
    componentWillReceiveProps(nextProps) {
      ensurePositiveDelayProps(nextProps)
    },
    setPressValue(toValue) {
      Animated.timing(this.props.press, {
        toValue,
        duration: this.props.pressDuration
      }).start()
    },
    setDelayTimeout(fn, delay) {
      return this.touchableSetDelayTimeout(fn, delay)
    },
    clearTimeout() {
      this.touchableClearTimeout()
    },
    touchableHandlePress: throttle(function touchableHandlePress(e) {
      if (this.props.onPress) {
        this.props.onPress(e)
      }
    }, 200),
    render() {
      const props = this.props
      return (
        <Animated.View
          accessibilityLabel={props.accessibilityLabel}
          accessibilityRole={props.accessibilityRole}
          accessibilityState={props.accessibilityState}
          disabled={props.disabled}
          onLayout={props.onLayout}
          onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
          onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
          onResponderGrant={this.touchableHandleResponderGrant}
          onResponderMove={this.touchableHandleResponderMove}
          onResponderRelease={this.touchableHandleResponderRelease}
          onResponderTerminate={this.touchableHandleResponderTerminate}
          style={[styles.touchable, props.style]}
        >
          {props.children}
        </Animated.View>
      )
    }
  })
}
