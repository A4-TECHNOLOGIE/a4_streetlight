basic.forever(function () {
    if (a4_streetlight.lowBrightness()) {
        basic.showString("N")
        a4_streetlight.streetlightPower(100)
        a4_streetlight.turnOnStreetlight(a4_streetlight.StreetlightColor.Nature)
    } else {
        basic.showString("J")
        a4_streetlight.streetlightPower(20)
        a4_streetlight.turnOnStreetlight(a4_streetlight.StreetlightColor.Nature)
    }
})
