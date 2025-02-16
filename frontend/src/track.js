import md5 from 'md5'

const data = []
let session = null
let game = null

export default (event, parameters) => {
    if (!session) {
        session = md5(Math.random())
    }

    if (event === 'GAME') {
        game = md5(Math.random())
    }

    data.push({
        ...parameters,
        event,
        game,
        session,
        user: md5(fingerprint()),
    })

    console.log(data[data.length-1])
}

const fingerprint = () => {
    return JSON.stringify({
        userAgent: navigator.userAgent, // Browser & OS info
        language: navigator.language, // User's language
        platform: navigator.platform, // OS platform
        screen: `${screen.width}x${screen.height} (${screen.colorDepth} bit)`, // Screen details
        deviceMemory: navigator.deviceMemory || "Unknown", // Approx RAM (not supported on all browsers)
        cores: navigator.hardwareConcurrency || "Unknown", // Number of CPU cores
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User's timezone
        cookiesEnabled: navigator.cookieEnabled, // Checks if cookies are enabled
        touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0, // Detects touchscreen
        doNotTrack: navigator.doNotTrack, // Privacy setting
    });
}