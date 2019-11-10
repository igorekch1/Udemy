<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-offset-2">
          <h1>Animations</h1>
          <hr />
          <button class="btn btn-primary mb-3" @click="show=!show">Show alert</button>
          <br />
          <select v-model="alertAnimation">
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
          </select>
          <transition :name="alertAnimation">
            <div class="alert alert-info" v-if="show">This is some info</div>
          </transition>
          <transition name="slide" type="animation">
            <div class="alert alert-info" v-if="show">This is some info</div>
          </transition>
          <transition name="fade" appear>
            <div class="alert alert-info" v-if="show">This is some info</div>
          </transition>
          <transition
            appear
            enter-active-class="animated bounce"
            leave-active-class="animated shake"
          >
            <div class="alert alert-info" v-if="show">This is some info</div>
          </transition>
          <hr />
          <transition :name="alertAnimation">
            <div class="alert alert-info" v-if="show" key="info">This is some info</div>
            <div class="alert alert-info" v-else key="warning">This is some info</div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      show: true,
      alertAnimation: ""
    };
  }
};
</script>

<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave {
}
.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}

.slide-enter {
  opacity: 0;
}
.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}
.slide-leave {
}
.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 3s;
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}
</style>
