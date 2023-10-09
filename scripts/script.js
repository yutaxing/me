new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Quang Linh & Giang Ơi",
          artist: "Suutam",
          cover: "img/31.jpg",
          source: "mp3/quanglinh.mp3",
          url: "https://www.youtube.com/@QuangLinhVlogs.Official",
          favorited: true
        },
        {
          name: "Shitsui",
          artist: "Despair",
          cover: "img/10.jpg",
          source: "mp3/shitsui.mp3",
          url: "https://www.youtube.com/watch?v=71_VnZsHpWM",
          favorited: true
        },
        {
          name: "Sadness and Sorrow",
          artist: "Taylor Davis",
          cover: "img/2.jpg",
          source:"mp3/Naruto.mp3",
          url: "https://www.youtube.com/watch?v=mF3DCa4TbD0",
          favorited: true
        },
        {
          name: "Call Of Silence x Clear Sky",
          artist: "Gemie",
          cover: "img/1.jpg",
          source: "mp3/callofsilence.mp3",
          url: "https://www.youtube.com/watch?v=5GNitfh8N0g",
          favorited: true
        },
        {
          name: "Sakura",
          artist: "Ikimono-gakari",
          cover: "img/22.jpg",
          source: "mp3/sakura.mp3",
          url: "https://www.youtube.com/watch?v=6tmhg_QFPcg",
          favorited: true
        },
        {
          name: "Nhắm Mắt Thấy Mùa Hè",
          artist: "Nguyên Hà",
          cover: "img/3.jpg",
          source: "mp3/nhammatthaymuahe.mp3",
          url: "https://www.youtube.com/watch?v=fgpwTxIv76Q",
          favorited: true
        },
        {
          name: "Ending Aot",
          artist: "進撃の巨人",
          cover: "img/7.jpg",
          source: "mp3/endingaot.mp3",
          url: "https://www.youtube.com/watch?v=WPl10ZrhCtk",
          favorited: false
        },
        {
          name: "Chuyện Đôi Ta",
          artist: "Emcee L ft Muộii",
          cover: "img/9.jpg",
          source: "mp3/chuyendoita.mp3",
          url: "https://www.youtube.com/watch?v=mTZL5OoG_0Q",
          favorited: false
        },
        {
          name: "Infinity",
          artist: "Jaymes Young",
          cover: "img/4.jpg",
          source: "mp3/infinity.mp3",
          url: "https://www.youtube.com/watch?v=TDCDhlq-Los",
          favorited: false
        },
        {
          name: "Chưa Từng Thương Ai Đến Vậy",
          artist: "Bảo Ngọc",
          cover: "img/5.jpg",
          source: "mp3/chuatungthuongaidenv.mp3",
          url: "https://www.youtube.com/watch?v=C4wbMmAD9Ag",
          favorited: true
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
      updateBar(x) {
        let progress = this.$refs.progress;
        let maxduration = this.audio.duration;
        let position = x - progress.getBoundingClientRect().left; // Sửa offsetLeft thành getBoundingClientRect().left
        let percentage = (100 * position) / progress.offsetWidth;
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        this.barWidth = percentage + "%";
        this.circleLeft = percentage + "%";
        this.audio.currentTime = (maxduration * percentage) / 100;
        this.audio.play();
      },
      clickProgress(e) {
        this.isTimerPlaying = true;
        this.audio.pause();
        this.updateBar(e.pageX);
      },

    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
