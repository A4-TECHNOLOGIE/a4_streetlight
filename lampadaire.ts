//% color="#f2a900" icon="\uf0eb" block="A4 Streetlight"
namespace a4_streetlight {
    let strip: neopixel.Strip = null
    let power = 50

    export enum StreetlightColor {
        /**
         * Warm amber lighting, suitable for natural areas.
         */
        //% block="Nature area 1800 K"
        Nature,

        /**
         * Very warm white lighting, suitable for parks and quiet outdoor areas.
         */
        //% block="Park 2200 K"
        Park,

        /**
         * Warm white lighting, suitable for residential areas.
         */
        //% block="Residential area 2700 K"
        Residence,

        /**
         * Neutral warm white lighting, suitable for urban areas.
         */
        //% block="Urban area 3000 K"
        Urban,

        /**
         * Cool white lighting, suitable for pedestrian crossings.
         */
        //% block="Pedestrian crossing 6500 K"
        Pedestrian
    }

    function initStrip(): void {
        if (strip == null) {
            strip = neopixel.create(DigitalPin.P0, 10, NeoPixelMode.RGB)
            strip.setBrightness(power)
            strip.clear()
            strip.show()
        }
    }

    /**
     * Returns true when a pedestrian is detected by the PIR motion sensor connected to P1.
     */
    //% block="pedestrian detected"
    //% group="Sensors"
    export function pedestrianDetected(): boolean {
        return pins.digitalReadPin(DigitalPin.P1) == 1
    }

    /**
     * Returns true when the micro:bit light level is very low.
     */
    //% block="low brightness"
    //% group="Sensors"
    export function lowBrightness(): boolean {
        return input.lightLevel() < 1
    }

    /**
     * Sets the brightness power of the streetlight LEDs from 0 to 100 percent.
     * @param value brightness power in percent, eg: 50
     */
    //% block="streetlight power %value \\%"
    //% value.min=0 value.max=100
    //% value.defl=50
    //% group="Streetlight"
    export function streetlightPower(value: number): void {
        initStrip()
        value = Math.constrain(value, 0, 100)
        power = Math.map(value, 0, 100, 0, 255)
        strip.setBrightness(power)
        strip.show()
    }

    /**
     * Turns on the streetlight with a custom RGB color.
     * @param red red value from 0 to 255, eg: 255
     * @param green green value from 0 to 255, eg: 125
     * @param blue blue value from 0 to 255, eg: 0
     */
    //% block="turn on streetlight R %red G %green B %blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% red.defl=255
    //% green.defl=125
    //% blue.defl=0
    //% group="Streetlight"
    export function turnOnRGB(red: number, green: number, blue: number): void {
        initStrip()
        strip.showColor(neopixel.rgb(
            Math.constrain(red, 0, 255),
            Math.constrain(green, 0, 255),
            Math.constrain(blue, 0, 255)
        ))
    }

    /**
     * Turns on the streetlight using a predefined lighting mode.
     * @param color predefined lighting mode
     */
    //% block="turn on streetlight %color"
    //% group="Streetlight"
    export function turnOnStreetlight(color: StreetlightColor): void {
        initStrip()

        if (color == StreetlightColor.Nature) {
            strip.showColor(neopixel.rgb(255, 125, 0))
        } else if (color == StreetlightColor.Park) {
            strip.showColor(neopixel.rgb(255, 147, 41))
        } else if (color == StreetlightColor.Residence) {
            strip.showColor(neopixel.rgb(255, 169, 87))
        } else if (color == StreetlightColor.Urban) {
            strip.showColor(neopixel.rgb(255, 180, 107))
        } else if (color == StreetlightColor.Pedestrian) {
            strip.showColor(neopixel.rgb(230, 235, 255))
        }
    }

    /**
     * Turns off all streetlight LEDs.
     */
    //% block="turn off streetlight"
    //% group="Streetlight"
    export function turnOffStreetlight(): void {
        initStrip()
        strip.clear()
        strip.show()
    }
}
