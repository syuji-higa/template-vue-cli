import * as Bowser from 'bowser'

export const { browser, engine, os, platform } = Bowser.parse(navigator.userAgent)
