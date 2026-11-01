
const video = document.getElementById("wildlifeVideo");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const time = document.getElementById("time");
const error = document.getElementById("videoError");

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return minutes + ":" + String(secs).padStart(2, "0");
}

playButton.addEventListener("click", function () {
    if (video.paused) {
        video.play().catch(function () {
            error.textContent = "Không thể phát video.";
        });
    } else {
        video.pause();
    }
});

video.addEventListener("play", function () {
    playButton.textContent = "Tạm dừng";
});

video.addEventListener("pause", function () {
    playButton.textContent = "Phát";
});

video.addEventListener("timeupdate", function () {
    if (video.duration) {
        progress.value = video.currentTime / video.duration * 100;

        time.textContent =
            formatTime(video.currentTime) + " / " +
            formatTime(video.duration);
    }
});

progress.addEventListener("input", function () {
    if (video.duration) {
        video.currentTime = progress.value / 100 * video.duration;
    }
});

video.addEventListener("error", function () {
    error.textContent = "Không thể tải video. Hãy kiểm tra tệp media.";
});
