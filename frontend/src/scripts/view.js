/**
 * Hello Sift Sift. Frontend view entry point.
 */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'


import * as VueGoogleMaps from 'vue2-google-maps';
import Map from './map.vue'
import Register from './register.vue'
import Devices from './devices.vue'
import qrcode from 'qrcode-generator'

Vue.use(VueRouter);
Vue.use(Vuex);

var app;




Vue.config.devtools = true

// console.log("FOOOO")

// export  {[
//   app]
// };

// const Register = { template: '<div>foo</div>' }
// const Devices = { template: '<div>bar {{owntracksUri}}</div>', props: ['owntracksUri']}

// let Foo = Vue.component('rs-foo', {
//   props: ['foople'],
//   template: '<p>props {{foople}} here<p>',
//   data: function(){
//     return {
//       foople: this.$store.state.owntracksUri
//     }
//   }
// })


const routes = [
  { path: '/map', component: Map },
  { path: '/devices', component: Devices },
  { path: '/register', component: Register},
  // { path: '/foo', component:  Foo, props: {foople: "dddddd"}}
]

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
});

const store = new Vuex.Store({
  state: {
    owntracksUri: "nouriyet",
    passiveeyeUri: "nopeyet",
    devices: []
  },
  mutations: {
    setOwntracksUri(state, uri){
      console.log("SOTURI", uri);
      state.owntracksUri = uri;
    },
    setPassiveEyeUri(state, uri){
      console.log("SPEURI", uri);
      state.passiveeyeUri = uri;
    },
    setDevices(state, devices){
      console.log("SPEDEV", devices);
      state.devices = devices;
    }
  }
});

export default class MyView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
	this.controller.subscribe('devices', this.onDevices.bind(this));

	Vue.use(VueGoogleMaps, {
	    load: {
	      key: 'AIzaSyAi1bH8DwOUOZ6FHPs2v8tebBCq4aEmRdg',
	      libraries: 'places', //// If you need to use place input
	    }
	  });
app = new Vue({
	  router,
    store,
	  el: '#app',
	    data: function() {
        return{
        //   message: 'Hello Mike Vue!',
        // hook_uri: 'adsadf',
        // owntracksUri: "none",
        // foople: "averynice tings"
        }
	    }
	}).$mount('#app')
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftview
  presentView(value) {
    console.log('hello-sift: presentView: ', value);
	// app.message = value.data.name;
	// app.hook_uri = value.data.hook_uri;
  store.commit('setOwntracksUri', value.data.owntracksUri);
  store.commit('setPassiveEyeUri', value.data.passiveeyeUri);
  store.commit('setDevices', value.data.devices);
  // this.owntracksUri = value.data.owntracksUri;
	// app.owntracksUri = value.data.owntracksUri;
//   var typeNumber = 4;
// var errorCorrectionLevel = 'L';
// var qr = qrcode(typeNumber, errorCorrectionLevel);
// qr.addData(app.owntracksUri);
// qr.make();
// document.getElementById('placeHolder').innerHTML = qr.createImgTag();
	// document.getElementById("name").textContent =  value.data.name;
	// document.getElementById("hook-uri").textContent =  value.data.hook_uri;
  };

  willPresentView(value) {
    console.log('hello-sift: willPresentView: ', value);
  };

  onDevices(data) {
    console.log('DEVICE DATA: ', data);
    store.commit('setDevices', data);
    // Object.keys(data).forEach((k) => {
    //   document.getElementById(k).textContent = data[k];
    // });
	// app.message = data['devices']
  }

}

registerSiftView(new MyView(window));
