let soilHue = 0
let humidHue = 0
let tempHue = 0
let zipLED = kitronik_smart_greenhouse.createGreenhouseZIPDisplay(8)
let statusLEDs = zipLED.statusLedsRange()
basic.forever(function () {
    tempHue = Math.map(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C), 0, 40, 210, 0)
    humidHue = Math.map(kitronik_smart_greenhouse.humidity(), 0, 100, 35, 150)
    soilHue = Math.map(kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1), 0, 1023, 35, 150)
    statusLEDs.setZipLedColor(0, kitronik_smart_greenhouse.hueToRGB(tempHue))
    statusLEDs.setZipLedColor(1, kitronik_smart_greenhouse.hueToRGB(humidHue))
    statusLEDs.setZipLedColor(2, kitronik_smart_greenhouse.hueToRGB(soilHue))
    statusLEDs.show()
    if (kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1) <= 400) {
        for (let index = 0; index < 3; index++) {
            kitronik_smart_greenhouse.controlHighPowerPin(kitronik_smart_greenhouse.HighPowerPins.pin13, kitronik_smart_greenhouse.onOff(true))
            basic.pause(1000)
            kitronik_smart_greenhouse.controlHighPowerPin(kitronik_smart_greenhouse.HighPowerPins.pin13, kitronik_smart_greenhouse.onOff(false))
            basic.pause(1000)
        }
    } else {
        basic.showIcon(IconNames.Happy)
    }
    basic.pause(10000)
})
basic.forever(function () {
    basic.showNumber(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C))
    basic.showNumber(kitronik_smart_greenhouse.humidity())
    basic.showNumber(kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1))
})
input.onButtonPressed(Button.A, function () {
    if (colourSetting == 5) {
        colourSetting = 0
    } else {
        colourSetting += 1
    }
})
let colourSetting = 0
let zipLEDs = kitronik_smart_greenhouse.createGreenhouseZIPDisplay(8)
let zipStick = zipLEDs.zipStickRange()
colourSetting = 0
let brightness = 128
zipLEDs.setBrightness(brightness)
basic.forever(function () {
    zipStick.setBrightness(brightness)
    zipStick.show()
    if (colourSetting == 0) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.White))
    } else if (colourSetting == 1) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Red))
    } else if (colourSetting == 2) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Green))
    } else if (colourSetting == 3) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Blue))
    } else if (colourSetting == 4) {
        zipStick.showColor(kitronik_smart_greenhouse.rgb(220, 75, 200))
    } else if (colourSetting == 5) {
        zipStick.clear()
        zipStick.show()
    }
})
basic.forever(function () {
    if (brightness <= 0) {
        brightness = 0
    } else {
        brightness += -16
    }
    if (brightness >= 255) {
        brightness = 255
    } else {
        brightness += 16
    }
})
