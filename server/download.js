import ytdl from "ytdl-core"
import fs from 'fs'

export const download = (videoId) => new Promise ((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando o download do video:" + videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
        .on(
            "ïnfo",
            (info) => {
                const seconds = info.formats[0].approxDurationMs / 1000
                console.log(seconds)
                console.log(info)
            })
            .on("end",() => {
                console.log("Download do vídeo finalizado.")
                resolve()
            })
            .on ( "error", (error) => {
                console.log(
                    "Não foi possível fazer o download do video. Detalhes do erro:", error
                )
                reject(error)
            })
            .pipe(fs.createWriteStream("./tmp/audio.mp4"))

})
