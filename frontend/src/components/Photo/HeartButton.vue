<template>
  <button class="toggle-favorite" @click="toggle" ref="heartButton">
    <FavoriteIcon class="toggle-favorite__icon" :class="iconClasses" @animationend.native="onIconAnimationEnds" />
    <transition name="favorite-particles-transition">
      <div v-if="animating" class="toggle-favorite__particles"></div>
    </transition>
  </button>
</template>

<script>
import FavoriteIcon from "./Favoriteicon.vue";

import PhotoService from "../../services/photo.service.js";

export default {
  name: "HeartButton",
  components: {
    FavoriteIcon
  },
  props: {
    imagePost: Object,
  },
  data() {
    return {
      favorited: false,
      animating: false,
    };
  },
  computed: {
    iconClasses() {
      return {
        "toggle-favorite__icon--favorited": this.favorited,
        "toggle-favorite__icon--animate": this.animating
      };
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    async toggle() {
      // Only animate on favoriting.
      if (!this.favorited) {
        this.animating = true;

        const frm = new FormData();
        frm.append("postId", this.imagePost?.id);
        frm.append("userId", this.currentUser.id);
        await PhotoService.favorited(frm);

      } else {
        const frm = new FormData();
        frm.append("postId", this.imagePost?.id);
        frm.append("userId", this.currentUser.id);
        await PhotoService.unFavorited(frm);
      }

      this.favorited = !this.favorited;
      this.$emit("clickHeart", 1);
      // console.log(this.imagePost)
    },
    onIconAnimationEnds() {
      this.animating = false;
    },
  },
  watch: {
    imagePost() {
      if (this.imagePost) {
        this.$emit("clickHeart", 1);
        const vm = this;
        PhotoService.ifFavorited(this.imagePost.id, this.currentUser.id).then((result) => {
          vm.favorited = result.data;
        })
      }

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$particles-animation-duration: 0.8s;
$icon-animation-duration: 0.48s;
$icon-color: hsl(1, 89%, 61%);
$icon-border-color: hsl(1, 89%, 61%);

@keyframes favorite-icon-animation {
  0% {
    opacity: 1;
    transform: scale(0.1);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }

  80% {
    opacity: 1;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes favorite-particles-animation {
  0% {
    background-position: left center;
  }

  100% {
    background-position: right center;
  }
}

// Particles animation.
.favorite-particles-transition-enter-active {
  background-image: url("/particles-sprite.png");
  background-size: 2500% auto;
  background-position: left center;
  background-repeat: no-repeat;

  animation-duration: $particles-animation-duration;
  animation-timing-function: steps(24);
  animation-name: favorite-particles-animation;
}

.toggle-favorite {
  font-size: 20px;
  position: relative;

  &__icon {
    height: 1em;
    width: 1em;

    // Transition mainly for when un-favoriting
    transition: fill-opacity 0.2s, stroke 0.2s;
    fill: $icon-color;
    fill-opacity: 0;
    stroke: $icon-border-color;

    &--favorited {
      fill-opacity: 1;
      stroke: $icon-color;
    }

    // Icon animation
    &--animate {
      opacity: 0;
      transform: scale(0);
      animation-duration: $icon-animation-duration;
      animation-delay: $particles-animation-duration - $icon-animation-duration;
      animation-name: favorite-icon-animation;
    }
  }

  &__particles {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3em;
    height: 3em;
  }
}
</style>
