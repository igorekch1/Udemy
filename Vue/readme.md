# VUE.js

30.10.2019

## Interaction with the DOM

### Directives

**Directive - instruction where you place your code**

##### Binding to Attributes

- v-bind
  without it - it will insert just a text

```
 <p>{{ someProperty }} - <a v-bind:href="title"></a></p>

 new Vue({
  data: {
    title: "Title"
  }
})
```

##### HTML output

- v-html -if you need to insert in some attribute of the tag

```
 <p v-html="link"></p>

 new Vue({
  data: {
    link: "Link"
  }
})
```

##### Disable rerendering

- v-once - stick initial value
  <hr/>

### Events

- v-on:event

```
<input type="text" <b>v-on:input</b>="changeTitle">

new Vue({
  ...
  methods: {
    changeTitle: function(e) {
      ...
    }
  }
})
```

<hr/>

#### Accessing any property of Vue instance

You can access any instance property(methods, data, etc.) with <b>this</b> cause Vue proxies this for us.

```
new Vue({
  el: "#root",
  data: {
    title: "Title"
  }
  methods: {
    foo: function() {
      return this.title;
    }
  }
})
```

<hr/>

01.11.2019

#### Passing own arguments

\$event - reserved word

```
<button v-on:click="increase(2, $event)">Click</button>

new Vue({
  el: "#root",
  data: {}
  methods: {
    increase: function(step, event) {}
  }
})
```

<hr/>

### Modifiers

##### Event modifiers

You can modyfy event by adding **modifier**
Modifiers list:

- .stop - stopPrpagation
- .prevent - preventDefault
- .capture - track event in capture mode
- .self - invoke handler when it gets this element
- .once - works only once
- .passive - passive as 3rd param in addEventListener

_Also, you can combine modifiers
Exmaple:_

```
<a v-on:click.stop.prevent="doThat"></a>
```

##### Key modifiers

Modifiers list:

- .enter
- .tab
- .delete (ловит как «Delete», так и «Backspace»)
- .esc
- .space
- .up
- .down
- .left
- .right

_Exmaple:_
Invoke _alertMe_ on enter / space key press

```
<input v-on:keyup.enter.space="alertMe"/>

new Vue({
  el: "#root",
  data: {}
  methods: {
    alertMe: function () {
      alert("Alert!")
    }
  }
})
```

_Also, you can pass a keyCode_

```
<input v-on:keyup.13="submit">
```

---

##### JS in templates

_You can access data fields in templates_

```
<button v-on:click="counter++">Click</button>
<p>{{ counter * 2 > 10 ? "more than 10" : "less than 10" }}</p>

new Vue({
  el: "#root",
  data: {
    counter: 0
  }
})
```

---

#### Two-way binding

_By dirrective:_ **v-model**

```
<input type="text" v-model="name" />
<p>{{ name }}</p>

new Vue({
  el: "#root",
  data: {
    name: ""
  }
})
```

For text input v-model uses: input event and input value
For checkboxes: change event and checked
For select: change event and select value

---

#### Computed properties (dependent properties)

Everything stored in computed can be used as a data object

Ordinary function is called every time we set something in data
Computed function analyze the code, it's aware about then changes and if it's not interested in them - it won't be invoked

_It shouldn't be invoked - it's used as a property_

```
<p>{{ output }}</p>

new Vue({
  el: "#root",
  data: {
    counter: 0
  },
  computed: {
    output: function() {
      return ...
    }
  }
})
```

---

#### Watch properties

Allows to watch the data property changes

```
<p>{{ output }}</p>

new Vue({
  el: "#root",
  data: {
    counter: 0
  },
  watch: {
    counter: function(value) {
      var vm = this;
      // reset counter
      setTiemout(function() {
        vm.counter = 0;
      }, 2000);
    }
  }
})
```

---

#### Shortands

```
v-on:click = @click
v-bind:href = :href
```

<hr/>
#### Dynamic styling
Vue will merge all class properties on element together in one list of css classes

- v-bind:class

```
//css
.demo{}
.red {}

<div
  class="demo"
  @click="attachRed = !attachRed" // toggle
  :class="{red: attachRed}" //red class if attachRed is true
>
</div>

new Vue({
  el: "#root",
  data: {
    attachRed: false
  }
})
```

**The same with objects**

```
//css
.demo{}
.red {}
.blue {}

<div
  class="demo"
  @click="attachRed = !attachRed" // toggle
  :class="divClasses" //red class if attachRed is true
>
</div>
// you can pass array of classes and even use two way binding
<div class="demo" :class="[color, {red: attachRed}]"></div>

<input  v-model="name"/>

new Vue({
  el: "#root",
  data: {
    attachRed: false,
    color: green
  },
  computed: {
    divClasses: function() {
      return {
        red: this.attachRed,
        blue: !this.attachRed
      }
    }
  }
})
```

**Inline styles**

```
.demo{}

<div class="demo" :style="{backgroundClor: color}"></div>
<div class="demo" :style="{myStyle}"></div>

<input  v-model="color"/>

new Vue({
  el: "#root",
  data: {
    color: 'gray'
    width: 100
  },
  computed: {
    myStyle: function() {
      return {
        backgroundColor: this.color,
        width: this.width + px
      }
    }
  }
})
```

---

## Using conditions and rendering lists

### Conditions

- v-if="**condition**"
- v-else

```
<div id="app">
    <p v-if="show">if show</p>
    <p v-else>Else</p>
    <p>Do you also see me?</p>
    <button @click="show != show">Click</button>
</div>

new Vue({
	el: "#app",
  data: {
  	show: true
  }
})
```

\*In Vue version 2.1+ you can ,also, use **v-esle-if\***
_Example:_

```
<div id="app">
    <p v-if="type === 'A'">A</p>
    <p v-else-if="type === 'B'">B</p>
    <p v-else>Not A / B</p>
</div>
```

**Wrapping condition elements in template**
The as _<></> / React.Fragment_ in React

```
<template v-if="show">
  <h1>Headling</h1>
  <div>Insinde template</div>
</template>
```

You can use **v-show** to hide elements: it will be attached with _display: none_ propety.
It will be in DOM, but not displayed

_Example:_

```
<template v-show="show">
  <h1>Headling</h1>
  <div>Insinde template</div>
</template>
```

#### Rendering lists with v-for

Structure:

```
<tag v-for="element in list">{{element}}</tag>
```

_Example:_

```
<div id="app">
  <ul>
    <li v-for="number in numbers">{{ number }}</li>
  </ul>
  <ul>
    <li v-for="person in people">name: {{ person.name }}, age: {{ person.age }}</li>
  </ul>
</div>

new Vue({
	el: "#app",
  data: {
  	numbers: [1,2,3,4,5],
    people: [
    	{name: "James", age: 'unknown'},
      {name: "Peter", age: 21}
    ]
  }
})
```

**Getting index of the element in an array**
Structure:

```
<tag v-for="(element, i) in list">{{i}} - {{element}}</tag>
```

```
<div id="app">
  <ul>
    <li v-for="(person, i) in people">{{i}} - name: {{ person.name }}, age: {{ person.age }}</li>
  </ul>
</div>

new Vue({
	el: "#app",
  data: {
    people: [
    	{name: "James", age: 'unknown'},
      {name: "Peter", age: 21}
    ]
  }
})
```

**For using properties seperately use template v-for**
_Example:_

```
<div id="app">
  <template v-for="(person, i ) in people">
      <h1>{{person.name}}</h1>
      <h2>{{person.age}}</h2>
  </template>
</div>

new Vue({
	el: "#app",
  data: {
    people: [
    	{name: "James", age: 'unknown'},
      {name: "Peter", age: 21}
    ]
  }
})
```

**Looping in objects**
Get the key, value and index of each object
_Example:_

```
<div id="app">
  <ul>
    <li v-for="person in people">
      <div v-for="(value, key, index) in person">{{key}} : {{value}} ({{index}})</div>
    </li>
  </ul>
</div>

new Vue({
	el: "#app",
  data: {
  	numbers: [1,2,3,4,5],
    people: [
    	{name: "James", age: 'unknown'},
      {name: "Peter", age: 21}
    ]
  }
})
```

**Do not forget to pass key for qunie value in order to Vue could recognize which element was changed**

- v-bind:key

_Example:_

```
<div id="app">
  <ul>
    <li v-for="person in people" :key="person.id">{{person.name}}</li>
  </ul>
</div>
```

---

02.11.2019

## Vue.js Instance

You can create multiple Vue instances.

If two instances links to the same el("#root") it will take the first one. So, you have to connect instances with different elements.
**But, you can use one instance in another one**

_Example:_

```
<div id="app">
  <h1>{{title}}</h1>
</div>

<div id="app2">
  <button @click="onChange">Change title</button>
</div>

const vm1 = new Vue({
	el: "#app",
  data: {
    title: "Intance 1"
  }
})

const vm2 = new Vue({
	el: "#app2",
  data: {},
  methods: {
  	onChange: function() {
    	vm1.title = "Changed from Instance 2"
    }
  }
})
```

_Also, you can access instance properties from simple js code. You are not able to set new ones, cause Vue.js is not watches them, as it does with object passed to contructor of Vue function!_

You can use proxied properties of Vue:

```
vm1.$data.title
```

You can pass to Vue properties whatever you want

```
const data = { title: '' }

new Vue({
  el: "#app",
  data: data // it takes from outside as normal js
             // it doesn't make its own world
})
```

### Using refs

You can put ref on any html element and access it from _this.\$refs_ object.

_Example:_

```
<div id="app1">
  <h1 ref="heading">Text</h1>
  <button @click="onClick" ref="myButton">Change title</button>
</div>

const vm1 = new Vue({
	el: "#app2",
  data: {},
  methods: {
  	onClick: function() {
    	console.log(this.$refs) // output - { myButton: button }
      this.$refs.myButton.innerText = 'Test';
    }
  }
})

vm1.$refs.heading.innerText = "Something"
```

### Mounting

You can mount mount the template w/ vue native method - \$mount

_Example:_

```
<div id="app"></div>

const vm = new Vue({
	// no el
  data: {},
  methods: {}
})

vm.$mount("#app") //pass the element which will be controlled by Vue
```

_Also, you can use template in the vue Instance and append it
_
_Example:_

```
<div id="app"></div>

const vm3 = new Vue({
	template: '<h1>Hello!</h1>'
});

vm3.$mount();
document.getElementById('app3').appendChild(vm3.$el);
```

### Using Components

You can register the reusable component with _Vue.component()_
1st param - name of component
2nd param - object that passed to Vue constructor

_Example:_

```
<div id="app"></div>
<hello></hello>
<hello></hello>

Vue.component('hello', {
  template: '<h1>Hello!</h1>'
})
```

### Vue DOM

On each propeprty Vue has a watcher. Vue has an extra layer - Virtual DOM(copy of the dom). Vue watches the chages and compare them with Virtual DOM and recreates the Virtual DOM based on these cahnges. Then, updates the changes in DOM.

03.11.2019

### Vue CLI

Init project - **vue init [template][project-name]**

List of templates:

- webpack - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.

- webpack-simple - A simple Webpack + vue-loader setup for quick prototyping.

- browserify - A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.

- browserify-simple - A simple Browserify + vueify setup for quick prototyping.

- pwa - PWA template for vue-cli based on the webpack template

- simple - The simplest possible Vue setup in a single HTML file

### Vue instance lifecycle

new Vue()

1. beforeCreate() - initialize data & events
2. created() - compile template or el's tempalte
3. beforeMount() - replace el with compiled template
4. Mounted to DOM

If data changed - dom is re-rendered

Lifecycle methods:

1. beforeCreate()
2. created()
3. beforeMount()
4. mounted()
5. beforeUpdate()
6. updated()
7. beforeDestroy()
8. Destroyed()

_Example:_

```
<div id="app">
  <h1>{{ title }}</h1>
  <button @click="title = 'Changed'">Update title</button>
  <button @click="destroy">Destroy</button>
</div>

new Vue({
	el: "#app",
  data: {
    title: "Intance 1"
  },
  beforeCreate: function() {
  	console.log("beforeCraete()")
  },
  created: function() {
  	console.log("created()")
  },
  beforeMount: function() {
  	console.log("beforeMount()")
  },
  mounted: function() {
  	console.log("mounted()")
  },
  beforeUpdate: function() {
  	console.log("beforeUpdate()")
  },
  updated: function() {
  	console.log("updated()")
  },
  beforeDestroy: function() {
  	console.log("beforeUpdate()")
  },
  destroyed: function() {
  	console.log("destroyed")
  },
  methods: {
  	destroy: function() {
    	this.$destroy(); // remove all js logic
    }
  }
});
```

## Components

You can register the reusable component with _Vue.component()_
1st param - selector

_Example:_

```
<div id="app">
  <my-cmp></my-cmp>
  <my-cmp></my-cmp>
</div>

Vue.component('my-cmp', {
  data() { // data should a function
    return {
      title: "Intance 1"
    }
  },
  template: '<p>{{title}}</p>'
});

new Vue({
	el: "#app" // el should be in the instance
});
```

_Do not use shared data object cause it stores in one place in memory and changing data in one component will change it in another one._

### Use component locally / globally

If you want use component **locally** - you need to register it in the instance.

```
<div id="app">
  <my-cmp></my-cmp>
  <my-cmp></my-cmp>
</div>

<div id="app2">
  <my-cmp></my-cmp> // won't work -->
                    //it's not registered in the instance
</div>

const cmp = {
  data() {
    return {
      title: "Intance 1"
    }
  },
  template: '<p>{{title}}</p>'
};

new Vue({
	el: "#app",
  components: {
    'my-cmp': cmp
  }
});

new Vue({
	el: "#app2"
});
```

**Global components** are registered by _Vue.component()_

_By default all styles will be globall styles, so you have to add **scoped** in style tag in each component if you want use it locally and they will be listed in head tag_

_Example:_

```
<style scoped></style>
```

Also, each styled element is added data-v-######## attribute to be styled by this selector --> div[data-v-########] {}

### Using props

You can acces props in Child component by adding property _props_ and provide them as an array of strings (names should be the same as they were passed from parent component!).

Passing props from parent component: add v-bind:[prop-name]=[prop-value] on child component.

_Example:_

_Parent Component_

```
  <child-component :name="name"></child-component>
```

_Child Component_

```
<template>
    <p>User Name: {{ name }}</p>
  </div>
</template>

<script>
export default {
  props: ["name"]
};
</script>
```

_Also, you can access prop with this at any place_
_Example:_

```
<template>
    <p>User Name: {{ switchName() }}</p>
  </div>
</template>

<script>
export default {
  props: ["name"],
  methods: {
    switchName() {
      return this.name.split("").reverse().join("");
    }
  }
};
</script>
```

### Props validation

You can validate prop by giving it a type in props object(!), not by defining it in an array.

Validtion of input params:

- single type validation
- multiple type validation
- required prop
- default value --> primitive / object
- validator function

```
Vue.component('my-component', {
  props: {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    propF: {
      validator: function (value) {
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

In
m Parent Component from Child Component with **Custom Events**
In child component add **this.\$emit("[event-name]", [field-name])**
And listen to it in parent component with **@[event-name]="[field-name]=\$event"**

_Example:_
Perent

```
<app-user-detail :name="name" @nameWasReset="name = $event"></app-user-detail>
```

Child

```
export default {
  props: {
    name: String
  },
  data() {
    return {
      userName: name // You have to assign to another field name in order not to mutate it

    };
  },
  methods: {
    resetName() {
      this.userName = "Ihor";
      this.$emit("nameWasReset", this.userName);
    }
  }
};
</script>
```

You can pass function as props as well.

### Using Event Bus

You can communicate between siblings using **Event Bus**.

Create EventBus as an usual Vue instance.

```
export const eventBus = new Vue();
```

Emit the event from one child:

```
import { eventBus } from '../../main';

export default {
  methods: {
    editAge() {
      this.myName = 'Boss'
      eventBus.$emit('nameWasReset', this.myName)
    }
  }
};
```

And subscribe to it in another child component in created() lifecycle hook:

```
import { eventBus } from '../../main';
export default {
  data() {
    return {
      name: ''
    };
  },
  craeted() {
    eventBus.$on('nameWasReset', (newName) => this.name = newName);
  }
};
```

_Also, you can add methods to Event Bus instance_

```
export const eventBus = new Vue({
  methods: {
    changeName(name) {
      this.$emit('nameWasReset', name)
    }
  }
});
```

### Passing content to child component

You can pass html code w/ **slots** (the same as props.children in React).

_Example:_

```
<app-quote>
  <h2>A wonderful quote!</h2>
</app-quote>
<style scoped>
  h2 {
    color: blue;
  }
</style>

// app-quote component
<template>
  <div>
    <slot></slot> // equal children; slot is reserved word
  </div>
</template>
<style scoped>
  h2 {
    color: red; // has bigger priority than parent's styling
  }
</style>
```

_Also, it applies styles as from child and parent component, but child styling has bigger priority_

#### Using name slots

You can specify each element in slot by adding it native vue attribute _slot_ and giving it a value. Then you should specify slot by the same name it was given in child component.

_Example:_

```
<app-quote>
  <h2 slot="title">A wonderful quote!</h2>
  <h2 slot="content">Another quote</h2>
</app-quote>


<div class="title">
  <slot name="title"></slot>
</div>
<div>
  <slot name="content"></slot>
</div>
```

#### Default slots

Unnamed slots are default slots.

If you slot wasn't passed from parent you can specify default value of it wtitting in inside slot tag
_Example:_

```
<app-quote>
  <h2 slot="title">A wonderful quote!</h2>
  <h2>Another quote</h2>
</app-quote>


<span style="color: red">
  <slot name="subtitile">The Subtitile</slot>
</span>
```

You can efficiently use slots by making slides.

### Dynamic components

You can choose conditionaly which component to render with **is** property on **component** reserved tag.

Component is destroyed and re-created on switch _by default_, not hidden.

_Example:_

```
<button @click="selected='app-quote'">Quote</button>
<button @click="selected='app-author'">Author</button>
<button @click="selected='app-new'">New</button>

<component :is="selected"></component>

export default {
  data() {
    return {
      selected: 'app-quote'
    }
  },
  components: {
    'app-quote': Quote,
    'app-author': Author,
    'app-new': New
  }
}
```

In order not to destroy component, you can wrap it in **keep-alive**
_Example:_

```
<keep-alive>
  <component :is="selected">
    <p>Slot</p>
  </component>
</keep-alive>
```

You can use dynamic component lyfecycle hooks with dyname component, such as: **activated, deactivated**
_Example:_

```
export default {
  data() {
    return {
      selected: 'app-quote'
    }
  },
  deactivated() {
    // keep track of "destroying" component in keep-alive mode
  },
  activated(){
    // the same
  }
```

## Handling Input Forms

v-model is the same as value and input(change if lazy) handler on input!

```
<!-- Two-way binding syntax sugar using v-model -->
<custom-input v-model="data"></custom-input>
<!-- Two-way binding under the hood -->
<custom-input
  v-bind:value="data"
  v-on:input="data = $event"></custom-input>
```

**Textarea**: to keep line break use: style="shite-space: pre-line"

**Checkbox:**
_Example:_

```
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

_You can also save multiple checkboxes values in an array_

```
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>

new Vue({
  el: '#example-3',
  data: {
    checkedNames: []
  }
})
```

**Select**

- Single select

```
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<span>Selected: {{ selected }}</span>

new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

- Set default value by binding selected attribute

```
<select v-model="selected">
  <option
    v-for="priority in priorities"
    selected="priority='medium'"></option>
</select>

new Vue({
  el: '...',
  data: {
    priorities: ["high", "medium", "low"]
  }
})
```

- Multiple select:

```
<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<br>
<span>Selected: {{ selected }}</span>
```

- Dynamic options rendered with v-for:

```
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>

new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

**Modifiers:**

- lazy - synchronized by change event, but not input (when the field loses the focus)

```
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" >
```

- number - If you want user input to be automatically typecast as a number, you can add the number modifier to your v-model managed inputs:

```
<input v-model.number="age" type="number">
```

_This is often useful, because even with type="number", the value of HTML input elements always returns a string. If the value cannot be parsed with parseFloat(), then the original value is returned._

- trim - If you want whitespace from user input to be trimmed automatically, you can add the trim modifier to your v-model-managed inputs:

```
<input v-model.trim="msg">
```

**Creating own custom control**

```
<app-switch v-model="dataSwitch"><app-switch>
<p>{{dataSwitch}}</p>

<div
  id="on"
  @click="switched(true)"
  :class={active: value}
>On</div>

<div
  id="off"
  @click="switched(false)"
  :class={active: false}
>Off</div>
>
export default {
  props: ['value'],
  methods: {
    switched(value) {
      this.$emit('input', value)
    }
  }
}
```

**Submitting a form**

```
<button @click.prevent="submitted">Submit</button>

methods: {
  submitted() {

  }
}
```

## Directives

- text-directive

```
    <p v-text="'Some Text'"></p>
```

- html directive

```
    <p v-html="'<strong>Some strong text</strong>'"></p>
```

**Creating own directive**
You can create a directive by declaring it globally:

1st param - selector
2nd - configuring object

```
  Vue.directive('highlight', {

});
```

**Hooks**:
_lifecycle methods of directives:_

- bind(el, binding, vnode) - Once directive is attached
- inserted(el, binding, vnode) - Inserted in Parent Node
- update(el, binding, vnode, oldVnode) - once component is updated(w/o children)
- componentUpdated(el, vinding, vnode, oldVnode) - Once Component is Updated(w/ children)

**Params:**

- el: The element the directive is bound to. This can be used to directly manipulate the DOM.
- binding: An object containing the following properties.
  - name: The name of the directive, without the v- prefix.
  - value: The value passed to the directive. For example in v-my-directive="1 + 1", the value would be 2.
  - oldValue: The previous value, only available in update and componentUpdated. It is available whether or not the value has changed.
  - expression: The expression of the binding as a string. For example in v-my-directive="1 + 1", the expression would be "1 + 1".
  - arg: The argument passed to the directive, if any. For example in v-my-directive:foo, the arg would be "foo".
  - modifiers: An object containing modifiers, if any. For example in v-my-directive.foo.bar, the modifiers object would be { foo: true, bar: true }.
  - vnode: The virtual node produced by Vue’s compiler.
  - oldVnode: The previous virtual node, only available in the update and componentUpdated hooks.

```
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.backgroundColor = binding.value;
  }
});

<p v-highlight="'red'">Color this</p>
```

_Passing an argument to directive:_
v-directive:modifier="'value'"

```
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    if (binding.arg === 'background') {
      el.style.backgroundColor = binding.value;
    } else [
      el.style.color = bidning.value
    ]
  }
});

<p v-highlight:background="'red'">Color this</p>
```

**Adding own modifiers**
You can access modifiers in binding.modifiers

```
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    let delay = 0;

    if (binding.modifiers["delayed"]){
      delay = 3000;
    }

    setTimeout(() => {
      if (binding.arg === 'background') {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.color = binding.value
      }
    }, delay);
  }
});

<p v-highlight:background.delayed="'red'">Color this</p>
```

_You can add multiple modifiers by chaining them_

```
<p v-local-highlight:background.delayed.blink="'red'">Color this</p>
```

**Registering a local directives**

```
<div>
  <p v-local-highlight="'red'">Color this</p>
</div>

export default {
  directives: {
    'local-highlight': {
      bind(el, binding,vnode) {
        el.style.backgroundColor = binding.value;
      }
    }
  }
}
```

_You can pass an object as a value_

```
<div v-demo="{ color: 'white', text: 'hello!' }"></div>

Vue.directive('demo', function (el, binding) {
  console.logqwinding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```

**Dynamic directive arguments:**
You can pass a dynamic argument to directive -->
directive:[argument]

```
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>

Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = (binding.arg == 'left' ? 'left' : 'top')
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left'
    }
  }
})
```

## Filters

Is used to transform the output in template

_Usage:_ data value | filter <--- | - pipe

You can create filter globally w/ _Vue.filter()_:

```
<div>
  <h1>Filters and Mixins</h1>
  <p>{{text | toLowerCase}}</p>
</div>

Vue.filter('toLowerCase', function (value) {
  return value.toLowerCase();
});
```

Or locally with _filters_ property:

```
<template>
  <div>
    <h1>Filters and Mixins</h1>
    <p>{{text | toUpperCase}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "hellow there"
    };
  },
  filters: {
    toUpperCase(value) {
      return value.toUpperCase();
    }
  }
};
</script>
```

**Chaining multiple filters**

```
<p>{{text | toLowerCase | sliceFour}}</p>

export default {
  data() {
    return {
      text: "heLLow tHere"
    };
  }
};

Vue.filter('toLowerCase', function (value) {
  return value.toLowerCase();
});

Vue.filter('sliceFour', function (value) {
  return value.slice(0, 4);
});
```

_output:_ hell

**To improve performance it's better to use computed properies instead of filter**
For example, if you want to filter in array, it's better to rerenderthe component only if the filtered array changed, but only every time

_Example:_

```
<input type="text" v-model="filterText" />
<ul>
  <li v-for="fruit in filteredFruits" :key="fruit">{{fruit}}</li>
</ul>

export default {
  data() {
    return {
      filterText: "",
      fruits: ["apple", "lemon", "banana", "mango", "mangustin", "melon"]
    };
  },
  computed: {
    filteredFruits() {
      return this.fruits.filter(fruit => fruit.startsWith(this.filterText));
    }
  }
};
```

## Mixins

Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options. When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.

You can pass all mixins in array in _mixin_ property.

_Mixin:_

```
export const fruitMixin = {
  data() {
    return {
      filterText: "",
      fruits: ["apple", "lemon", "banana", "mango", "mangustin", "melon"]
    };
  },
  computed: {
    filteredFruits() {
      return this.fruits.filter(fruit => fruit.startsWith(this.filterText));
    }
  }
}
```

Usage:

```
<template>
  <div>
    <input type="text" v-model="filterText" />
    <ul>
      <li v-for="fruit in filteredFruits" :key="fruit">{{fruit}}</li>
    </ul>
  </div>
</template>

<script>
import { fruitMixin } from "../FruitMixin";

export default {
  mixins: [fruitMixin]
};
</script>

<style scoped>
</style>
```

Mixin is scoped. Each instance get copy of the mixin

If you add a new item to the array used in mixin - you mutate on array used in this component.
_Example:_

```
  <button @click:"fruits.push("berries")"></button>
```

**Global mixin**
Global mixin is used on all vue instances(components)

```
Vue.mixin({
  created() {}
});
```

**Hook creation**
First - globall mixin is created
Then - mixin which is passed as array to component
And after taht - component is created
Mixin is created first, then goes component creation

## Animations

You can animate with **transition** component.
Vue provides a transition wrapper component, allowing you to add entering/leaving transitions for any element or component:

- Conditional rendering (using v-if)
- Conditional display (using v-show)
- Dynamic components
- Component root nodes

You can animate only one element with transition, not a list.

Default name of transition - **v-enter**.

_Example:_

```
 <transition name="fade">
  <div class="alert alert-info" v-if="show">This is some info</div>
</transition>

export default {
  name: "app",
  data() {
    return {
      show: false
    };
  }
};

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
</style>
```

CSS animations are applied in the same way as CSS transitions, the difference being that v-enter is not removed immediately after the element is inserted, but on an animationend event.

```
<transition name="bounce">
    <p v-if="show">Lorem.</p>
</transition>

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

You can add **appear** to set initial loading, but no by triggering it.

_You can dynamicly choose an animation with binding the value_

```
<select v-model="alertAnimation">
  <option value="fade">Fade</option>
  <option value="slide">Slide</option>
</select>
<transition :name="alertAnimation">
  <div class="alert alert-info" v-if="show">This is some info</div>
</transition>

data() {
  return {
    alertAnimation: ""
  };
}
```

If you want to use some animated elements with the same animation - you have to add **key** property:

```

<transition :name="alertAnimation">
  <div class="alert alert-info" v-if="show" key="info">This is some info</div>
  <div class="alert alert-info" v-else key="warning">This is some info</div>
</transition>
```

_To tell vue that we use js animation instead css you should add_ _\*\*:css="false"_

_Example:_

```
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
  <div style="height: 100px; width: 100px; background: red" v-show="load"></div>
</transition>
```

### Multiple animations:

Can be done with **transition-group**

The main differenec with transition:

- transition - is not rendered to the DOM!
- transition-group - doen render a new HTML tag! By default - span, also u can override it by setting

```
<transition-group tag="TAG">
```

## Routing

To use Vue Router:

- include it in main file
- and add it as a plugin w/ Vue.use
- create a file with routes w/ array data structure:
  _[{path: '/', component: Component}]_
- create an instance of router
- and pass it in vue instance
- and include the component in App file

_routes.js_

```
import User from "./components/user/User";
import Home from "./components/Home";

export const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/user',
    component: User
  }
];

```

_main.js_

```
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

```

_App.vue_

```
<router-view></router-view>
```

**By default vue router uses hash mode**
So if you want to use another mode you should pass it in VueRouter instance:

```
const router = new VueRouter({
  routes,
  mode: 'history'
});
```

### Using Links

You can use links w/ router component - <router-link> whick accepts _to_ params where you should pass th pathh
_Example:_

```
<router-link to="/">
  Home
</router-link>
```

In html it's displayed as a normal anchor tag with href and path in it.

You can put you link in any tag you want providing it with _tag_ attribute:

```
<router-link to="/" tag="li">
  <a class="nav-link active">
    Home
  </a>
</router-link>
```

You can access router with this to push an object/path history

```
navigateToHome() {
  this.$router.push("/");
  //   this.$router.push({path: '/'});
}
```

To pass a dynamic params you should add :data to your route

```
export const routes = [
  {
    path: '/user/:id',
    component: User
  }
];
```

And access the param you are passing in component :

```
data() {
  return {
    id: this.$route.params.id
  };
},
```

But if you add same routes with different ids paramd.id won't change cause VUe saves it and doesn't reacreated is, so you need to watch it:

```
watch: {
  $route(to, from) {
    console.log(to, from);
    this.id = to.params.id;
  }
},
```

We are watch route property and navigating to route which is passed in "to" param.

**In vue-router 2.2 you canbind the route params to props of the component**

_component.js_

```
export default {
  props: ['name']
}
```

_link_

```
<router-link to="hello/you">To component</router-link>
```

_route_

```
{path: '/hello/:name', component: Component, props: true}
```

### Nested routes

To create a nested routes you have to pass children to main route component:

```
{
    path: '/user',
    component: User,
    children: [{
      path: '',
      component: UserStart // if you put / - it will attach to your domain
    }, {
      path: ':id',
      component: UserDetail
    }, {
      path: ':id/edit',
      component: UserEdit
    }],
    props: true
  }
```

And then include <router-view></router-view> in this component!

### Named routes

To pass an id to navigate for example to "user/3/edit" you can acces it from \$router object:

```
<router-link
  tag="button"
  :to="'user' + $route.params.id + '/edit'"
  class="btn btn-primary"
  >Edit the User</router-link
>
```

_Also, you can pass an object there if you define a name of component in your route:_

```
{
  path: ':id/edit',
  component: UserEdit,
  name: 'userEdit'
}

<router-link
  tag="button"
  :to="{name: 'userEdit',params:{id: $route.params.id}}"
  class="btn btn-primary"
>Edit the User</router-link>
```

### Query params

To pass query params just add query object with key=value params:

```
<router-link
  tag="button"
  :to="{ name: 'userEdit', params: { id: $route.params.id },
  query: { locale: 'en', q: 100 }}"
  class="btn btn-primary"
>Edit the User</router-link>
```

Or in history object:

```
this.$router.push({
  name: "home",
  query: { locale: 'en', q: 100 }
});
```

You can extrat them via \$route.query:

```
<p>Locale: {{ $route.query.locale }}</p>
<p>Analytics: {{ $route.query.q }}</p>
```

## Named router views

You can name the router view and then include it into components object in your routes.

```
<router-view name="header-top"></router-view>
<router-view></router-view>
<router-view name="header-bottom"></router-view>

routes = [{
    path: '/',
    name: "home",
    components: {
      default: Home,
      'header-top': Header
    }
  },
  {
    path: '/user',
    components: {
      default: User,
      'header-top': Header
    }
  }]
```

## Redirect

Simply add redirect prop in the route:

```
{ path: 'redirect-me', redirect: '/user' }
{ path: 'redirect-me', redirect: { name: 'home' } }
```

## Catch all routes that are not suitable:

Implementes with \* wildcard character.

```
{ path: '*', redirect: '/' }
```

_You can add animation by wrapping router-view in transition component_

## Control the scroll behavior

- add hash to router-link
- add scrollBehavior method to router instance
- and create al element with a selector you are pssing to hash

```
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savePosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }

    return {
      x: 0,
      y: 700
    };
  }
});

:to="{ name: 'userEdit', params: { id: $route.params.id },
query: { locale: 'en', q: 100 }, hash: '#data'}"


<p id="data">Some xtra data</p>
```

## Routing guard

- You can setup the permission on vue router instance in _beforeEach method_

Params:
function w/ to, fro and next params. next - continue journey. You can pass false to abot, object or pass in next func.

```
router.beforeEach((to, from, next) => {
  // some logic here
  next();
});

```

- Also, you can do the same in the route setup w/ function _beforeEnter:_

```
{
  path: ':id',
  component: UserDetail,
  beforeEnter: (to, from, next) => {
  // some logic here
  next();
}
```

- Moreover, you can check the access in routing lifecycle hook called _beforeRouteEnter:_

```
beforeRouteEnter(to, from, next) {
  // some logic here
  // if you need to acces the vm data -
  // pass a callback to next function
  // next(vm => vm.link);
  if (true) {
    next();
  } else {
    next(false);
  }
}
```

You can not access the vm instance cause it's not craeted yet.

### BeforeLeave guard

You can use beforeRouteLeave lifecycle hook to setup some logic before you leave from this route. Here you can access the data cause the component has already been created.

```
beforeRouteLeave(to, from, next) {
    if (this.confirmed) {
      next();
    }
  }
```

## Lazy loading

As webpack loades files immediately, you can setup a lazy loading which is executed asynchronously w/ webpack:

```
const User = resolve => {
  require.ensure(['./components/user/User'], () => {
    resolve(require('./components/user/User'));
  });
};
```

It will be loaded whenever you need it. That means that the bundle of the file will be loaded when you reach the route for example and it won't be included in main bundle.

## Vuex

install vuex: npm i vuex

**Configure a store file**
W/ Vuex.store(_store_)

```
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    counter: 0
  }
});
```

Register it in main Vue instance:

```
import { store } from "./store/store";

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
```

To access store use _this.\$store.state_

```
this.$store.state.counter--;
```

_The main problem in such approach is that we duplicate our code if we need such logic in multiple components!_

The solution is not directly access the store, but use **getters and setters**.

### Using getter

Getters is a property in store config:

```
export const store = new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2;
    }
  }
});
```

You can access it w/ _this.$state.getters$_:

```
this.$store.getters.doubleCounter;
```

_Note: to not created a lot computed properties you can use _ **mapGetters** _ from vuex which will do it automatically._

```
import { mapGetters } from "vuex";

computed: mapGetters(["doubleCounter", "stringCounter"])
```

_Also, you can pass an object in mapGetters to map getter to different names:_

```
mapGetters({
propertyName: 'doubleCounter'
})
```

The downside is that you cannot create your own computed property. So, the solution is to use spread operator for mapGetters in computed prop:

```
computed: {
  myComputedProperty() {},
  ...mapGetters(["doubleCounter", "stringCounter"])
}
```

### Using Nampespace to avoid naming problems

- Create a type.js file where u will store all getters/mutations/actions as constants:
  _Structure:_ [module_name]/[func_name]

```
export const DOUBLE_COUNTER = "counter/DOUBLE_COUNTER";
export const CLICK_COUNTER = "counter/CLICK_COUNTER";
```

Using as getters methods:

```
import * as types from "../types";

const getters = {
  [types.DOUBLE_COUNTER]: state => {
    return state.counter * 2;
  },
  [types.CLICK_COUNTER]: state => {
    return state.counter + " Click";
  }
};
```

Get access to getters:

```
import * as types from "../store/types";

export default {
  computed: {
    ...mapGetters({
      doubleCounter: types.DOUBLE_COUNTER,
      stringCounter: types.CLICK_COUNTER
    })
  }
};
```

## Mutations

Mutations allow you to mutate some properties in state

```
export const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment: state => {
      state.counter++;
    },
    decrement: state => {
      state.counter++;
    }
  }
});
```

To use it in a component you have to invoke it with commit function:

```
export default {
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    decrement() {
      this.$store.commit("decrement");
    }
  }
};
```

\*Also, to decrease amount of code you can use **mapMutations:**

```
methods: {
  ...mapMutations(["increment", "decrement"])
}
```

It will automatically change the to functions which deispatches an action.

The issue of mutations is that they have to be **SYNCHRONOUS**.

## Actions

Actions - function where you can run async code in order to direct commit a mutation, but dispatch an action.

Actions function accept a context as a param.

```
export const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment: state => {
      state.counter++;
    },
    decrement: state => {
      state.counter++;
    }
  },
  actions: {
    asyncIncrement: ({
      commit
    }) => {
      setTimeout(() => {
        commit("increment")
      }, 1000);
    },
    asyncDecrement: ({
      commit
    }) => {
      setTimeout(() => {
        commit("decrement")
      }, 1000);
    }
  }
});

```

_MapActions to methods:_

```
methods: {
  ...mapMutations(["increment", "decrement"]),
  increment() {
    this.$store.dispatch("increment", 2);
  },
  decrement() {
    this.$store.dispatch("decrement", 2);
  }
}
```

_actions_:

```
actions: {
increment: ({
  commit
}, payload) => {
  commit("increment", payload);
},
decrement: ({
  commit
}, payload) => {
  commit("decrement", payload);
},
```

_mutations:_

```
mutations: {
  increment: (state, payload) => {
    state.counter += payload;
  },
  decrement: (state, payload) => {
    state.counter -= payload;
  }
},
```

_Note:_
_You can not use v-model w/ vuex cause regular computed property are getters, but not setter!_

Instead you can use :value w/ computed property that return the value from store and @input w/ method that mutate the store.

Also, u can set a getter and setter in computed property:

```
computed: {
  value: {
    get() {
      return this.$store.getters.value;
    },
    set(val) {
         this.$store.dispatch('updateValue', value);
    }
  }
}
```

### Using modules

To separate files you can create a module with number of actions, getters, state and include in main store file:

store.js

```
import counter from "./modules/counter";

export const store = new Vuex.Store({
  modules: {
    counter
  }
});
```

modules/counter.js

```
const state = {};

const getters = {}

const mutations = {}

const actions = {}

export default {
  state,
  mutations,
  actions,
  getters
}
```

_Also, you can separate files for actions, mutations, state, getters to separate files, but not modules_
