import Notification from './notification.vue'
import notify from './instance'

export default (Vue) => {
    Vue.component(Notification.name, Notification)
    Vue.prototype.notify = notify
}


// this.notify({
//     title: 'this is a notification',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
//     bg: '#ff5353',
//     autoClose: 4000
// })
