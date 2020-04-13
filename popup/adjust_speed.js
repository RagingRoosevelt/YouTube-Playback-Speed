console.info("Extension JS loaded")

function saveOptions(e) {
    console.debug(e)

    let elemInput = document.getElementById("speed_input")
    let newValue = elemInput.value
    

    e.preventDefault()
    browser.storage.sync.set({
        "playback_speed": newValue
    })

    console.info(`Set saved playback speed to ${newValue}.`)
    window.close()
}

function restoreOptions() {
    let elemInput = document.getElementById("speed_input")

    function onGot(val) {
        console.debug(val)
        console.info(`Retrieved saved playback speed.  It is ${val["playback_speed"]}.`)
        elemInput.value = val["playback_speed"] || 1
    }

    function onError(err) {
        console.error(`Error: ${err}`)
    }

    let getValue = browser.storage.sync.get("playback_speed")
    getValue.then(onGot, onError)
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);