import md5 from 'md5'

const data = []
let session = null
let game = null

export default (type, data) => {
    if (!session) {
        session = md5(Math.random())
    }

    if (type === 'GAME') {
        game = md5(Math.random())
    }

    const event = {
        data: JSON.stringify(data),
        type,
        game,
        session,
        user: md5(fingerprint()),
    }

    data.push(event)
    console.log(event)
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