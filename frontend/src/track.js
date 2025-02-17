import md5 from 'md5'

let session = null
let game = null

export default async (type, data) => {
    if (!session) {
        session = md5(Math.random())
    }

    if (type === 'GAME') {
        game = md5(Math.random())
    }

    const event = {
        data: data ?? {},
        type,
        game,
        session,
        user: md5(fingerprint()),
    }

    try {
        const response = await fetch('/events/add.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
        if (response.ok) {
            console.log(await response.text())
            console.log('added', event)
        } else {
            console.error('failed to add', event, await response.error())
        }
    } catch(e) {
        console.error('failed to send events', e)
    }

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