// Re-set playback speed if the setting changes
browser.storage.onChanged.addListener((settings) => {
    console.info("Extension settings changed.")
    console.info("Changed values")
    for (key in settings) {
        console.info(`\t${key}: ${settings[key]["newValue"]}`)
    }

    if ("playback_speed" in settings) {
        setPlaybackSpeed()
    }
})

// Set the playback speed
function setPlaybackSpeed() {
    function onGot(val) {
        let videoElementList = document.getElementsByTagName("video")
        if (videoElementList.length > 0)
        {
            console.info(`Set playback speed.  It is ${val["playback_speed"]}.`)
            for(var i = 0; i < videoElementList.length; i++)
            {
                videoElementList[i].playbackRate=val["playback_speed"] || 1
            }
        }
    }

    function onError(err) {
        console.error(`Error: ${err}`)
    }

    let getValue = browser.storage.sync.get("playback_speed")
    getValue.then(onGot, onError)
}

setPlaybackSpeed()

