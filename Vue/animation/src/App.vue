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
      <hr />
      <button class="btn btn-primary" @click="load = !load">Load / Remove Element</button>
      <br />
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @enter-cancelled="enterCancelled"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        @leave-cancelled="leaveCancelled"
        :css="false"
      >
        <div style="height: 100px; width: 300px; background: red" v-show="load"></div>
      </transition>
      <hr />
      <button
        class="btn btn-primary"
        @click="selectedComponent = selectedComponent === 'app-success-alert' ? 'app-danger-alert' : 'app-success-alert'"
      >Toggle component</button>
      <p></p>
      <transition name="fade" mode="out-in">
        <component :is="selectedComponent"></component>
      </transition>
      <p></p>
      <button class="btn btn-primary" @click="addItem">Add item</button>
      <p></p>
      <ul class="list-group">
        <transition-group name="slide">
          <li
            class="list-group-item"
            v-for="(num, ind) in numbers"
            :key="num"
            @click="removeItem(ind)"
            style="cursor: pointer"
          >{{num}}</li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
import SuccessAlert from "./SuccessAlert";
import DangerAlert from "./DangerAlert";

export default {
  name: "app",
  components: {
    "app-danger-alert": DangerAlert,
    "app-success-alert": SuccessAlert
  },
  data() {
    return {
      show: true,
      load: false,
      alertAnimation: "",
      elementWidth: 100,
      selectedComponent: "app-success-alert",
      numbers: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    addItem() {
      const pos = Math.floor(Math.random() * this.numbers.length);

      this.numbers.splice(pos, 0, this.numbers.length + 1);
    },
    removeItem(ind) {
      this.numbers.splice(ind, 1);
    },
    beforeEnter(el) {
      console.log("beforeenter");
      this.elementWidth = 100;
      el.style.width = this.elementWidth + "px";
    },
    enter(el, done) {
      console.log("enter");
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = this.elementWidth + round * 10 + "px";
        round++;

        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter(el) {
      console.log("afterEnter");
    },
    enterCancelled(el) {
      console.log("enterCancelled");
    },
    beforeLeave(el) {
      console.log("beforeLeave");
      this.elementWidth = 300;
      el.style.width = "300px";
    },
    leave(el, done) {
      console.log("leave");
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = this.elementWidth - round * 10 + "px";
        round++;

        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave(el) {
      console.log("afterLeave");
    },
    leaveCancelled(el) {
      console.log("leaveCancelled");
    }
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
  transition: opacity 1s;
  opacity: 0;
  position: absolute;
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
