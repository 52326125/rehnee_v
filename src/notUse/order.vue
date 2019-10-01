<template>
    <div>
        {{page}}
        <template v-if="orderPage[0]">
            <orderSearch/>
        </template>
        <template v-if="orderPage[1]" transition="scale-transition">
            <orderNew/>
        </template>
        <template v-if="orderPage[2]">
            <orderOrder/>
        </template>
    </div>
</template>
<script>
import orderNew from '../components/order/new'
import orderSearch from '../components/order/search'
import orderOrder from '../components/order/order'

export default {
  components: {
    orderNew,
    orderSearch,
    orderOrder
  },
  computed: {
    page () {
      this.$store.getters.getOrderPage
      this.changePage(this.$store.getters.getOrderPage)
    }
  },
  data () {
    return {
      orderPage: [true, false, false],
      index: 0
    }
  },
  methods: {
    changePage: function (index) {
      console.log('1')
      // var index=this.$store.getters.getOrderPage
      var i
      for (i = 0; i < 3; i++) {
        this.orderPage[i] = false
      }
      this.orderPage[index] = true
      this.$forceUpdate()
    }
  }
}
</script>
